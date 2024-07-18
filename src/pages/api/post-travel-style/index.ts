import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
          styleName,
          publicId,
          url,
          status,
        } = req.body;

  // const session = await getSession({ req });
  const result = await prisma.travelStyle.create({
    data: {
          styleName,
          publicId,
          url,
          status,
    },
  });
  res.json(result);
}