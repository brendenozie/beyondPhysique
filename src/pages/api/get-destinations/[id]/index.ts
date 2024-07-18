
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
    await getDestinations(req, res)
    return;
  }
  if (req.method === 'DELETE') {
    deleteDestination(req, res)
  } else if (req.method === 'PUT') {
    updateDestination(req, res)
  } else {
    res.status(404).end()
  }
}

async function getDestinations(req: NextApiRequest, res: NextApiResponse) {
  const destinationId = req.query.id as string //|| req.query.page as string
  try {
    if(destinationId){
      const destination = await prisma.destination.findFirst({
        where: {
          id: destinationId,
        },
        include: {
          img: { select: { id: true, publicId:true, url: true, status: true, } },
        },
      })
      return res.status(200).json({info:{count: 1,
                                          next: "2",
                                          pages: 10,
                                          prev: "0"},
                                    results: destination});
    }else{
      const destination = await prisma.destination.findMany({
        include: {
          img: { select: { id: true, publicId:true, url: true, status: true, } },
        }
      });
      res.status(200).json({info:{count: 1,
                                  next: "2",
                                  pages: 10,
                                  prev: "0"},
                            results: destination});
    }
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

async function deleteDestination(req: NextApiRequest, res: NextApiResponse) {
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

async function updateDestination(req: NextApiRequest, res: NextApiResponse) {
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
    cityId
  } = req.body;
  try {
    
  
    const session = await getSession({ req });
    const result = await prisma.destination.update({
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
      },
    });

    return res.status(200).json(result);
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
