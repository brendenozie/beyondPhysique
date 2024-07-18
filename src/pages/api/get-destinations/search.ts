import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const titleHotel = req.query.name as string;
  const city = req.query.city as string;
  // const travelstyle = req.query.travelstyle as string;

  let currentPage = req.query.page as unknown as number;
  let skip = currentPage > 1 ? currentPage *20 : 0;

  let where : any= {};

  if (titleHotel) where.title = {contains:titleHotel,mode: 'insensitive'}
  if (city) where.cityId = city
  // if (travelstyle) where.travelStyleId = travelstyle
  
  if (req.method === "GET") {
    if (Object.keys(where).length > 0){
      const results = await prisma.$transaction([
        prisma.destination.count({
          where
        }),
        prisma.destination.findMany({
        skip : skip,
        take: 20,
        include: {
          img: { select: { id: true, publicId:true, url: true, status: true, } },
        },
        where,
      }),
    ]);

      res.json({InfoResponse:{count: results[0] ?? 0,
                  next: currentPage * 20 > results[0] ? currentPage : 0 ,
                  pages: results[0]/20 > 1 ? results[0]/20 : 1 ,
                  prev: currentPage-1 > 1 ? currentPage-1 : 0},
                results: results[1]
              });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

};

//Update viewscount 
// const userUpdate = await prisma.user.update({
//   where: {
//     id: 9,
//   },
//   data: {
//     coinflips: {
//       push: true,
//     },
//   },
// })