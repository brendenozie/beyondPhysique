import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    exerciseId,
    acRepCount,
    acSetCount,
    acCalories,
    type,
    timestamp,
    avgSpeedInKMH,
    distanceInMeters,
    durationInMillis,
  } = req.body;

  // const session = await getSession({ req });
  const result = await prisma.exerciseActivity.create({
    data: {
      exerciseId,
      acRepCount,
      acSetCount,
      acCalories,
      type,
      timestamp,
      avgSpeedInKMH,
      distanceInMeters,
      durationInMillis,
    },
  });
  res.json(result);
}