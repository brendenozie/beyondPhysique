import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userEmail } = req.query;
  if (req.method === "GET") {
    // const user = await prisma.hotel.findMany({
    //   include: {
    //     img: { select: { id: true, publicId:true, url: true, status: true, } },
    //   },
      
    // });

    const results = await prisma.hotel.groupBy({
      by : ['id' , 'views'],
      _count : {
        '_all':true,
          'views': true,
      },
      // _sum : {
      //     'views': true,
      // },
      orderBy : {
          'id': 'desc',
      },
      // having : {
      //     'views': {
      //         '_avg': {
      //             'gt': 200,
      //         },
      //     },
      // },
    }
  )
    


    res.json({InfoResponse:{count: 1,
            next: "2",
            pages: 10,
            prev: "0"},
      results: results
      });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}



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