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

     // Create filters based on provided query parameters
    const filters: any = {};
    // Filter by category if provided
    if (userIdString && userIdString !== 'All') {
      filters.userId = userIdString; // Ensure userId is a string
    }

    let siku = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekday[siku.getDay()];

    // Filter by category if provided
    if (day && day !== 'All') {
      filters.day = day; // Ensure userId is a string
    }

    const results = await prisma.$transaction([
      prisma.trainingProgram.count({where: filters,}),
      prisma.trainingProgram.findMany(
        {
          skip: skip,
          take: 5,
          where: filters,
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
