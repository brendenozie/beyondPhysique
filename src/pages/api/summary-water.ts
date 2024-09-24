import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

// Define your types
interface WaterIntakeActivity {
  userId: string;
  wi_amount: string;
  wi_date: Date;
}

interface DailyWaterIntakeSummary {
  date: string;
  totalWaterAmount: number;
  averageWaterIntakeResult: number;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }

  const { fromDate, toDate, userId } = req.query;

  if (!fromDate || !toDate) {
      return res.status(400).json({ message: 'Please provide fromDate and toDate query parameters' });
  }

  if (typeof fromDate !== 'string' || typeof toDate !== 'string') {
      return res.status(400).json({ message: 'Please provide fromDate and toDate as strings' });
  }

  const start = new Date(fromDate);
  const end = new Date(toDate);
  let userIdString = "";

  if(userId){
    userIdString  = Array.isArray(userId) ? userId[0] : userId; // Ensure userId is a string
  }

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format provided' });
  }

  try {
    
    const summary = await getWaterIntakeSummary(startOfDay(start),endOfDay(end), userIdString)

    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const getWaterIntakeSummary = async (start: Date, end: Date, userId: string): Promise<DailyWaterIntakeSummary[]> => {
  // Fetch data from the database
  const waterIntakeFromDb = await prisma.waterIntakeProgress.findMany({
    where: {
      date: {
        gte: startOfDay(start),
        lte: endOfDay(end),
      },
      userId
    },
    select: {
      dailyIntake: true,
      date: true,
      userId: true,
    },
  });

  // Map database results to the expected BpmActivity type
  const activities: WaterIntakeActivity[] = waterIntakeFromDb.map(waterintake => ({
    wi_amount: waterintake.dailyIntake.toString(),
    wi_date: waterintake.date ? waterintake.date : new Date(),
    userId: waterintake.userId,
  }));

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

  // Reduce activities to group by day and summarize
  const summary: Record<string, {
    totalWaterIntake: number;
    count: number; // Count to calculate average later
  }> = activities.reduce((acc, activity) => {

    const date = formatDate(new Date(activity.wi_date));
    
    if (!acc[date]) {
      acc[date] = {
        totalWaterIntake: 0,
        count: 0,
      };
    }

    acc[date].totalWaterIntake += parseFloat(activity.wi_amount) || 0.0; // Handle beats
    acc[date].count += 1;
    
    return acc;
  }, {} as Record<string, {
    totalWaterIntake: number;
     count: number 
}>);

  // Convert grouped summary into an array of objects
  const summaryArray: DailyWaterIntakeSummary[] = Object.entries(summary).map(([date, stats]) => ({
    date,
    totalWaterAmount: stats.totalWaterIntake,
    averageWaterIntakeResult: stats.totalWaterIntake / stats.count, // Calculate average BPM result
  }));

  // Optionally, you can sort the array by date
  summaryArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return summaryArray;
};