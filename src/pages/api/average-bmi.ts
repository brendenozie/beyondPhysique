import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay } from 'date-fns';

// Define your types
interface BmiActivity {
  weight: string;
  bmi: string;
  date: Date;
  userId: string;
}

interface AverageBmiSummary {
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
    const summary = await getAverageBmiSummary(startOfDay(start), endOfDay(end),  userIdString);
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAverageBmiSummary = async (start: Date, end: Date, userIdString: string): Promise<AverageBmiSummary> => {
  const bmiFromDb = await prisma.bmi.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },      
      userId: userIdString,
    },
    select: {
      weight: true,
      bmi: true,
    },
  });

  const totalBmiResult = bmiFromDb.reduce((acc, bmi) => acc + parseFloat(bmi.bmi || "0"), 0);
  const totalWeight = bmiFromDb.reduce((acc, bmi) => acc + parseFloat(bmi.weight || "0"), 0);

  const count = bmiFromDb.length;
  const averageBmiResult = count > 0 ? totalBmiResult / count : 0;

  return {
    totalWeight,
    averageBmiResult,
  };
};
