import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
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
  } = req.body;

  console.log("dpDay")
  console.log(req.body)
  console.log(dpDay)
  // const session = await getSession({ req });
  const result = await prisma.dailyPlan.create({
    data: {
      dpDay,
      dpTime,
      dpDuration,
      status,
      exerciseId,
    },
  });
  res.json("result");
}