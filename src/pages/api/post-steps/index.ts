import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    stepsCount,
    duration,
    distanceCovered,
    userId
  } = req.body;

  // const session = await getSession({ req });
  const result = await prisma.stepsCount.create({
    data: {
      stepsCount,
      duration,
      distanceCovered,
      userId
    },
  });
  res.json(result);
}