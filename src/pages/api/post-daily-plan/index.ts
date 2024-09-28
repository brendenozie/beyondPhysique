import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    dpName,
    dpDay,
    dpTime,
    dpDuration,
    status,
    exerciseId,
    userId,
  } = req.body;

  try {
    const result = await prisma.dailyPlan.upsert({
      where: {
        userId_dpDay: {
          userId: userId,
          dpDay: dpDay,
        },
      },
      update: {
        dpTime,
        dpDuration,
        status,
        exerciseId,
      },
      create: {
        dpDay,
        dpTime,
        dpDuration,
        status,
        exerciseId,
        userId,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error while creating or updating daily plan" });
  }
}
