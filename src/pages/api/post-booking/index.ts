import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const {
    sessionId,
    description,
    img,
    location,
    userEmail,
    lat,
    long,
    price,
    star,
    title,
    total,
    cityId,
    travelStyleId,
    startDate,
    endDate,
  } = req.body;

  const session = await getSession({ req });
  const result = await prisma.booking.create({
    data: {
      sessionId,
      hotellId: req.body.hotelId  ? req.body.hotelId : req.body.hotellId,
      description,
      startDate,
      endDate,
      // img:img,
      lat: Number(lat),
      location,
      long: Number(long),
      price,
      star: Number(star),
      title,
      total: Number(total),
      userEmail : userEmail ? userEmail : session?.user!.email!,
      cityId,
      travelStyleId
    },
  });
  res.json(result);
}
