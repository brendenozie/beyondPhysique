import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay } from 'date-fns';

// Define your types
interface BpmActivity {
  bpmResult: number;
  date: Date;
  userId: string;
}

interface AverageBpmSummary {
  totalBpm: number;
  averageBpmResult: number;
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
    const summary = await getAverageBpmSummary(startOfDay(start), endOfDay(end), userIdString);
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAverageBpmSummary = async (start: Date, end: Date, userId: string): Promise<AverageBpmSummary> => {
  const bpmFromDb = await prisma.bpm.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
      userId: userId
    },
    select: {
      bpmResult: true,
    },
  });

  const totalBpm = bpmFromDb.reduce((acc, bpm) => acc + bpm.bpmResult, 0);
  const count = bpmFromDb.length;
  const averageBpmResult = count > 0 ? totalBpm / count : 0;

  return {
    totalBpm,
    averageBpmResult,
  };
};
