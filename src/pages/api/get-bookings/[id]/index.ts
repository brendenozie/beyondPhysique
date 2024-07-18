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

  if (req.method === 'DELETE') {
    getBooking(req, res)
  }else if (req.method === 'DELETE') {
    deleteBooking(req, res)
  } else if (req.method === 'PUT') {
    updateBooking(req, res)
  } else {
    res.status(404).end()
  }
}

async function getBooking(req: NextApiRequest, res: NextApiResponse) {
  // const amaId = req.query.id as string
  const { userEmail } = req.query;
  if (req.method === "GET") {
    const user = await prisma.booking.findMany({
      include: {
        img: { select: { id: true, publicId:true, url: true, status: true, } },
      }
      // where: { userEmail: userEmail as string }
    });
    res.json({InfoResponse:{count: 1,
                  next: "2",
                  pages: 10,
                  prev: "0"},
                results: user
            });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}


async function deleteBooking(req: NextApiRequest, res: NextApiResponse) {
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

async function updateBooking(req: NextApiRequest, res: NextApiResponse) {
  const amaId = req.query.id as string;
  // console.log(req.body);
  const { status } = req.body;
  try {
    const ama = await prisma.booking.update({
      where: {
        id: amaId,
      },
      data: {
        status: status,
      },
    })

    return res.status(200).json(ama)
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
