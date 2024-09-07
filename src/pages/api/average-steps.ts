import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

// Define your types
interface AverageStepsSummary {
  totalSteps: number;
  averageSteps: number;
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
    const summary = await getAverageStepsSummary(startOfDay(start), endOfDay(end));
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAverageStepsSummary = async (start: Date, end: Date): Promise<AverageStepsSummary> => {
  const stepsFromDb = await prisma.exerciseActivity.findMany({
    where: {
      timestamp: {
        gte: start,
        lte: end,
      },
    },
    select: {
      distanceInMeters: true, // Assuming distance is in meters, you can convert it to steps
    },
  });

  // Assuming 1 meter = 1.312 steps
  const totalSteps = stepsFromDb.reduce((acc, activity) => acc + Math.round(activity.distanceInMeters * 1.312), 0);
  const count = stepsFromDb.length;
  const averageSteps = count > 0 ? totalSteps / count : 0;

  return {
    totalSteps,
    averageSteps,
  };
};
