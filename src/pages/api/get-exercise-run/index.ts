import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query;
  if (req.method === "GET") {

    const results = await prisma.exercise.findFirst({
                      where: { exName : "run" },
                    });
    res.json(results);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
