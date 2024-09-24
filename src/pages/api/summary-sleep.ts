import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

interface DailyBpmSummary {
  date: string;
  totalSleepCount: number;
  averageSleepResult: number;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }

  const { fromDate, toDate, userId } = req.query;

  let userIdString = "";

  if(userId){
    userIdString  = Array.isArray(userId) ? userId[0] : userId; // Ensure userId is a string
  }
    
  if(!userIdString){
    return res.status(400).json({ message: 'Invalid date format provided' });
  }

  if (!fromDate || !toDate) {
      return res.status(400).json({ message: 'Please provide fromDate and toDate query parameters' });
  }

  if (typeof fromDate !== 'string' || typeof toDate !== 'string') {
      return res.status(400).json({ message: 'Please provide fromDate and toDate as strings' });
  }

  if (!fromDate || !toDate) {
    return res.status(400).json({ message: 'Please provide startDate and endDate query parameters' });
  }


  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date: Date): string => date.toISOString().split('T')[0];
  
  try {
    
    const start = startOfWeek(new Date(fromDate), { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(new Date(toDate), { weekStartsOn: 1 }); // Sunday

    const activities = await prisma.sleep.findMany({
      where: {
        slSleepDateTime: {
          gte: startOfDay(start),
          lte: endOfDay(end),
        },
        userId: userIdString
      },
      select: {
        slDuration: true,
        slSleepDateTime: true
      },
    });

    // Reduce activities to group by day and summarize
  const summary: Record<string, {
    totalSleepCount: number;
    count: number;
  }> = activities.reduce((acc, activity) => {
    const date = formatDate(new Date(activity.slSleepDateTime));
    
    if (!acc[date]) {
      acc[date] = {
        totalSleepCount: 0,
        count: 0,
      };
    }

    acc[date].totalSleepCount += parseDurationToMinutes(activity.slDuration || "0h 00m"); // Handle sleep hours
    acc[date].count += 1; // Handle sleep hours
    
    return acc;
  }, {} as Record<string, { totalSleepCount: number;  count: number; }>);

  // Convert grouped summary into an array of objects
  const summaryArray: DailyBpmSummary[] = Object.entries(summary).map(([date, stats]) => ({
    date,
    totalSleepCount: stats.totalSleepCount,
    averageSleepResult: stats.totalSleepCount / stats.count, // Calculate average BPM result
  }));

  // Optionally, you can sort the array by date
  summaryArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  console.log(summaryArray);

    res.status(200).json(summaryArray);
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Helper function to parse "1h 00m" into minutes
const parseDurationToMinutes = (duration: string): number => {
  const [hoursPart, minutesPart] = duration.split(' ');
  const hours = parseInt(hoursPart.replace('h', ''), 10) || 0;
  const minutes = parseInt(minutesPart.replace('m', ''), 10) || 0;
  return hours * 60 + minutes;
}