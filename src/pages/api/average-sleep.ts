import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay } from 'date-fns';

// Interface for the summary of sleep data
interface AverageSleepSummary {
  totalSleepDuration: number; // in minutes
  averageSleepDuration: number; // in minutes
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
    const summary = await getAverageSleepSummary(startOfDay(start), endOfDay(end));
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching sleep summary:', error);
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

const getAverageSleepSummary = async (start: Date, end: Date): Promise<AverageSleepSummary> => {
  const sleepFromDb = await prisma.sleep.findMany({
    where: {
      slSleepDateTime: {
        gte: start,
        lte: end,
      },
    },
    select: {
      slDuration: true,
    },
  });

  // Convert each slDuration to minutes and sum them up
  const totalSleepDuration = sleepFromDb.reduce((acc, sleep) => acc + parseDurationToMinutes(sleep.slDuration || "0h 00m"), 0);
  const count = sleepFromDb.length;
  const averageSleepDuration = count > 0 ? totalSleepDuration / count : 0;

  return {
    totalSleepDuration, // total in minutes
    averageSleepDuration, // average in minutes
  };
};
