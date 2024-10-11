import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query;
  if (req.method === "GET") {

    let currentPage = page as unknown as number;
    let skip = currentPage > 1 ? (currentPage - 1) * 5 : 0; // Adjusted to correctly skip

    // First, get the count of programsCategory
    const count = await prisma.programsCategory.count();

    // Then, find many programsCategory
    const results = await prisma.programsCategory.findMany({
      skip: skip,
      take: 5,
    });

    // Calculate pagination info
    res.json({
      InfoResponse: {
        count: count ?? 0,
        next: (currentPage * 5) < count ? currentPage + 1 : null, // Adjusted to reflect correct page
        pages: Math.ceil(count / 5), // Updated to use Math.ceil for correct total pages
        prev: currentPage > 1 ? currentPage - 1 : null, // Adjusted to reflect correct page
      },
      results: results,
    });


    // let currentPage = page as unknown as number;
    // let skip = currentPage > 1 ? currentPage * 5 : 0;

    // const results = await prisma.$transaction([
    //   prisma.programsCategory.count(),
    //   prisma.programsCategory.findMany(
    //     {
    //       skip: skip,
    //       take: 5,
    //     }),
    // ]);

    // res.json({
    //   InfoResponse: {
    //     count: results[0] ?? 0,
    //     next: currentPage * 20 > results[0] ? currentPage : 0,
    //     pages: results[0] / 20 > 1 ? results[0] / 20 : 1,
    //     prev: currentPage - 1 > 1 ? currentPage - 1 : 0
    //   },
    //   results: results[1]
    // });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
