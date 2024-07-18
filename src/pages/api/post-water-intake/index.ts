import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { wi_amount,
    wi_date,
    wi_time
  } = req.body;

  console.log(req.body);
  // const session = await getSession({ req });
  const result = await prisma.waterIntake.create({
    data: {
      wi_amount,
      wi_date,
      wi_time
    },
  });
  res.json(result);
}