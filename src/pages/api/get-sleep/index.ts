import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, userId } = req.query;
  if (req.method === "GET") {

    let currentPage = page as unknown as number;
    let skip = currentPage > 1 ? currentPage * 5 : 0;
    
    let userIdString = "";

    if(userId){
      userIdString  = Array.isArray(userId) ? userId[0] : userId; // Ensure userId is a string
      }
      
    if(!userIdString){
      return res.status(400).json({ message: 'Invalid date format provided' });
    }


    const results = await prisma.$transaction([
      prisma.sleep.count({
        where: {
          userId:userIdString
        }
      }),
      prisma.sleep.findMany(
        {
        skip: skip,
        take: 5,
        where: {
          userId:userIdString
        }
      }),
    ]);

    res.json({
      InfoResponse: {
        count: results[0] ?? 0,
        next: currentPage * 20 > results[0] ? currentPage : 0,
        pages: results[0] / 20 > 1 ? results[0] / 20 : 1,
        prev: currentPage - 1 > 1 ? currentPage - 1 : 0
      },
      results: results[1]
    });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
