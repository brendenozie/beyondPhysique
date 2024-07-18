import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    exName,
    exDesc,
    exPic,
    exVideo,
    exSteps,
    exDuration,
    reps,
    sets,
    status,
    exerciseCategoryId,
    dailyPlanId,
    trainingProgramId,
  } = req.body;

  // const session = await getSession({ req });
  const result = await prisma.exercise.create({
    data: {
      exName,
      exSteps,
      exDesc,
      exPic,
      exVideo,
      exDuration,
      reps,
      sets,
      status,
      exerciseCategoryId,
      // dailyPlanId,
      trainingProgramId,
    },
  });
  res.json(result);
}