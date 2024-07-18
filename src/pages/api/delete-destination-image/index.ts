import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id,} = req.body;
  if (req.method === "DELETE") {
    const destination = await prisma.destinationImage.delete({
      where: { publicId:  id },
    });
    res.json(destination);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
