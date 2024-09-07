import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

interface Activity {
  acCalories: number;
  durationInMillis: number;
  distanceInMeters: number;
  timestamp: string; // ISO 8601 date string
}

interface DailySummary {
  date: string;
  totalCalories: number;
  totalDuration: number;
  totalDistance: number;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }

  const { fromDate, toDate } = req.query;

  if (!fromDate || !toDate) {
      return res.status(400).json({ message: 'Please provide fromDate and toDate query parameters' });
  }

  if (typeof fromDate !== 'string' || typeof toDate !== 'string') {
      return res.status(400).json({ message: 'Please provide fromDate and toDate as strings' });
  }

  const start = new Date(fromDate);
  const end = new Date(toDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format provided' });
  }

  try {

     // Fetch activities from the database
    // Fetch activities from the database
  const activitiesFromDb = await prisma.exerciseActivity.findMany({
    where: {
      timestamp: {
        gte: startOfDay(start),
        lte: endOfDay(end),
      },
    },
    select: {
      acCalories: true,
      durationInMillis: true,
      distanceInMeters: true,
      timestamp: true, // Ensure to include timestamp for grouping
    },
  });

  // Map database results to the expected Activity type
  const activities: Activity[] = activitiesFromDb.map(activity => ({
    acCalories: activity.acCalories,
    durationInMillis: activity.durationInMillis,
    distanceInMeters: activity.distanceInMeters,
    timestamp: activity.timestamp ? activity.timestamp.toISOString() : '', // Convert Date to string or handle null
  }));

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

  // Reduce activities to group by day and summarize
  const summary: Record<string, {
    totalCalories: number;
    totalDuration: number;
    totalDistance: number;
  }> = activities.reduce((acc, activity) => {
    const date = formatDate(new Date(activity.timestamp));
    
    if (!acc[date]) {
      acc[date] = {
        totalCalories: 0,
        totalDuration: 0,
        totalDistance: 0,
      };
    }

    acc[date].totalCalories += activity.acCalories || 0;
    acc[date].totalDuration += activity.durationInMillis || 0;
    acc[date].totalDistance += activity.distanceInMeters || 0;
    
    return acc;
  }, {} as Record<string, { totalCalories: number; totalDuration: number; totalDistance: number }>);

  // Convert grouped summary into an array of objects
  const summaryArray: DailySummary[] = Object.entries(summary).map(([date, stats]) => ({
    date,
    ...stats,
  }));

  // Optionally, you can sort the array by date
  summaryArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.status(200).json(summaryArray);
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
