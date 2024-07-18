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
    await GetTravelStyle(req, res)
    return;
  }
  if (req.method === 'DELETE') {
    deleteTravelStyle(req, res)
  } else if (req.method === 'PUT') {
    updateTravelStyle(req, res)
  } else {
    res.status(404).end()
  }
}

async function GetTravelStyle(req: NextApiRequest, res: NextApiResponse) {
  const travelstyleId = req.query.id as string
  try {
    const travelStyle = await prisma.travelStyle.findFirst({
      where: {
        id: travelstyleId,
      },
    })
    return res.status(200).json({InfoResponse:{count: 1,
                next: "2",
                pages: 10,
                prev: "0"},
          results: travelStyle
          })
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

async function deleteTravelStyle(req: NextApiRequest, res: NextApiResponse) {
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

async function updateTravelStyle(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    styleName,
    publicId,
    url,
    status,
  } = req.body;

  try {
    const result = await prisma.travelStyle.update({
      where: {
        id: id,
      },
    data: {
          styleName,
          publicId,
          url,
          status,
    },
    });

    return res.status(200).json(result);
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
