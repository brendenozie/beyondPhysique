import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../server/db/prismadb"; // Adjust the import according to your project structure
import { startOfDay, endOfDay, differenceInDays } from 'date-fns';

// Define your types
interface AverageWaterIntakeSummary {
  totalWaterIntake: number; // in liters
  averageWaterIntake: number; // in liters
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

  if(!userIdString){
    return res.status(400).json({ message: 'Invalid date format provided' });
  }

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: 'Invalid date format provided' });
  }

  try {
    const summary = await getAverageWaterIntakeSummary(startOfDay(start), endOfDay(end), userIdString);
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching water intake summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAverageWaterIntakeSummary = async (start: Date, end: Date, userId: string): Promise<AverageWaterIntakeSummary> => {
  // Fetch total water intake over the period
  const totalWaterIntakeResult = await prisma.waterIntakeProgress.aggregate({
    _sum: {
      dailyIntake: true,
    },
    where: {
      date: {
        gte: start,
        lte: end,
      },
      userId: userId
    },
  });

  const totalWaterIntake = totalWaterIntakeResult._sum.dailyIntake || 0;

  // Calculate the number of days in the range
  const daysInRange = differenceInDays(end, start) + 1; // +1 to include the start day

  // Calculate the average water intake over the period
  const averageWaterIntake = totalWaterIntake / daysInRange;

  return {
    totalWaterIntake,
    averageWaterIntake,
  };
};
