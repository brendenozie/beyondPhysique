import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { userEmail, page } = req.query;

  if (req.method === "GET") {

    let currentPage = page as unknown as number;
    let skip = currentPage > 1 ? currentPage *20 : 0;
    
    const results = await prisma.$transaction([
      prisma.booking.count({
        skip : skip,
        take: 20,
        where: { userEmail: userEmail as string }
      }),
      prisma.booking.findMany({
        skip : skip,
        take: 20,
        include: {
          img: { select: { id: true, publicId:true, url: true, status: true, } },
        },
        where: { userEmail: userEmail as string }
      }),
    ]);

    res.json({InfoResponse:{count: results[0] ?? 0,
                next: currentPage * 20 > results[0] ? currentPage : 0 ,
                pages: results[0]/20 > 1 ? results[0]/20 : 1 ,
                prev: currentPage-1 > 1 ? currentPage-1 : 0},
              results: results[1]
            });

  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
