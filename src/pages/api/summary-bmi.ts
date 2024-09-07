import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

// Define your types
interface BmiActivity {
  // height: string;
  weight: string;
  bmi: string;
  date: Date;
  userId: string;
}

interface DailyBmiSummary {
  date: string;
  totalWeight: number;
  averageBmiResult: number;
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
    
    const summary = await getBpmSummary(startOfDay(start),endOfDay(end))

    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const getBpmSummary = async (start: Date, end: Date): Promise<DailyBmiSummary[]> => {
  // Fetch data from the database
  const bmiFromDb = await prisma.bmi.findMany({
    where: {
      date: {
        gte: startOfDay(start),
        lte: endOfDay(end),
      },
    },
    select: {
      weight: true,
      bmi: true,
      date: true,
      userId: true,
    },
  });

  // Map database results to the expected BpmActivity type
  const activities: BmiActivity[] = bmiFromDb.map(bmi => ({
    weight: bmi.weight,
    bmi: bmi.bmi || "0", // Convert string to number
    date: bmi.date,
    userId: bmi.userId,
  }));

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

  // Reduce activities to group by day and summarize
  const summary: Record<string, {
    totalWeight: number;
    totalBmiResult: number;
    count: number; // Count to calculate average later
  }> = activities.reduce((acc, activity) => {

    const date = formatDate(new Date(activity.date));
    
    if (!acc[date]) {
      acc[date] = {
        totalWeight: 0,
        totalBmiResult: 0,
        count: 0,
      };
    }

    acc[date].totalWeight += parseFloat(activity.weight) || 0.0; // Handle beats
    acc[date].totalBmiResult += parseFloat(activity.bmi) || 0.0;
    acc[date].count += 1;
    
    return acc;
  }, {} as Record<string, {
    totalBmiResult: number;
    totalWeight: number; 
     count: number 
}>);

  // Convert grouped summary into an array of objects
  const summaryArray: DailyBmiSummary[] = Object.entries(summary).map(([date, stats]) => ({
    date,
    totalWeight: stats.totalWeight,
    averageBmiResult: stats.totalBmiResult / stats.count, // Calculate average BPM result
  }));

  // Optionally, you can sort the array by date
  summaryArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return summaryArray;
};