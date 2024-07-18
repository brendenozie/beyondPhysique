import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from "../../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  // if (!session.isAdmin) {
  //   return res.status(401).end()
  // }
  if (req.method === 'GET') {
    await GetHotel(req, res)
    return;
  }
  if (req.method === 'DELETE') {
    deleteHotel(req, res)
  } else if (req.method === 'PUT') {
    updateHotel(req, res)
  } else {
    res.status(404).end()
  }
}

async function GetHotel(req: NextApiRequest, res: NextApiResponse) {
  const hotelid = req.query.id as string
  try {
    const hotel = await prisma.hotel.findFirst({
      where: {
        id: hotelid,
      },
      include: {
        img: { select: { id: true, publicId:true, url: true, status: true, } },
      },
    })
    return res.status(200).json({InfoResponse:{count: 1,
              next: "2",
              pages: 10,
              prev: "0"},
        results: hotel
        });
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

async function deleteHotel(req: NextApiRequest, res: NextApiResponse) {
  const amaId = req.query.id as string
  try {
    const ama = await prisma.booking.delete({
      where: {
        id: amaId,
      },
    })
    return res.status(204).json({ id: ama.id })
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

async function updateHotel(req: NextApiRequest, res: NextApiResponse) {
  
  const {
    id,
    title,
    description,
    img,
    lat,
    location,
    long,
    price,
    offer,
    offerPrice,
    cityId,
    travelStyleId,
  } = req.body;

  try {
    
    const session = await getSession({ req });
    const result = await prisma.hotel.update({ 
      where: {
      id: id,
    },
      data: {
        title,
        description,
        lat,
        location,
        long,
        price,
        offer,
        offerPrice,
        userEmail: session?.user?.email!,
        cityId,
        travelStyleId
      },
    });

    return res.status(200).json(result);
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
