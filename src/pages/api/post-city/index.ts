import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";
import { UploadApiResponse,  } from "cloudinary";
import cloudinary from "@/server/cloudinary";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
          cityName,
          publicId,
          url,
          status,
        } = req.body;

  const session = await getSession({ req });
  const result = await prisma.city.create({
    data: {
          cityName,
          publicId,
          url,
          status,
    },
  });
  res.json(result);
}