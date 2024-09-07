import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    bpmResult,
    date,
    userId,
  } = req.body;
//"beats":79,"bpmResult":79,"date":"2024-09-04T16:16:00.707+0300","id":"","userId":"66cb2206577e7774f63c97bf"}
  // const session = await getSession({ req });

  if (!bpmResult || !date|| !userId) {
    return res.status(400).json({ message: 'Please provide fromDate and toDate query parameters' });
  }

  if (typeof date !== 'string') {
    return res.status(400).json({ message: 'Please provide fromDate and toDate as strings' });
  }

  const tarehe = new Date(date);

  if (isNaN(tarehe.getTime())) {
    return res.status(400).json({ message: 'Invalid date format provided' });
  }

  const result = await prisma.bpm.create({
    data: {
      date:tarehe,
      bpmResult,
      userId
    },
  });
  res.json(result);
}