import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    beats,
    bpmResult,
    userId,
  } = req.body;

  // const session = await getSession({ req });
  const result = await prisma.bpm.create({
    data: {
      beats,
      bpmResult,
      userId
    },
  });
  res.json(result);
}