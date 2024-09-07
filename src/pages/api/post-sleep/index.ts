import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    slDuration ,
    slSleepDateTime,
    slWakeDateTime,
    userId
  } = req.body;
  
  if (!slDuration || !slSleepDateTime|| !slWakeDateTime || !userId) {
    return res.status(400).json({ message: 'Please provide fromDate and toDate query parameters' });
  }

  if (typeof slSleepDateTime !== 'string' || typeof slWakeDateTime !== 'string') {
    return res.status(400).json({ message: 'Please provide fromDate and toDate as strings' });
  }

  const tareheSleep = new Date(slSleepDateTime);
  const tareheWake = new Date(slWakeDateTime);

  if (isNaN(tareheSleep.getTime()) || isNaN(tareheWake.getTime())) {
    return res.status(400).json({ message: 'Invalid date format provided' });
  }

  const result = await prisma.sleep.create({
    data: {
      slDuration ,
      slSleepDateTime : tareheSleep,
      slWakeDateTime : tareheWake,
      userId
    },
  });
  res.json(result);
}