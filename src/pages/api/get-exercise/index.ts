import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { category, focusArea, level, query,page } = req.query;
  if (req.method === "GET") {

    let currentPage = page as unknown as number;
    let skip = currentPage > 1 ? currentPage * 5 : 0;
    // Create filters based on provided query parameters
    const filters: any = {};

    // Filter by category if provided
    if (category && category !== 'All') {
      filters.exerciseCategoryId = category.toString();
    }

    // Filter by focus area if provided
    if (focusArea && focusArea !== 'All') {
      filters.focusArea  = { has: focusArea.toString() }; // Assuming focusArea is an array
    }

    // Filter by level if provided
    if (level && level !== 'All') {
      filters.level = level.toString();
    }

    // Filter by search query if provided
    if (query) {
      filters.OR = [
        { exName: { contains: query.toString(), mode: 'insensitive' } },
        { exDesc: { contains: query.toString(), mode: 'insensitive' } }
      ];
    }

    const results = await prisma.$transaction([
      prisma.exercise.count({where: filters,}),
      prisma.exercise.findMany({
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
