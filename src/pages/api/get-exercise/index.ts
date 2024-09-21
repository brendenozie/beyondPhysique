import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";
// import Redis from 'redis';

// const redisClient = Redis.createClient();
// const CACHE_TTL = 60; // Cache time-to-live in seconds

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { category, focusArea, level, query,page,userId } = req.query;
  if (req.method === "GET") {

    let currentPage = page as unknown as number;
    let skip = currentPage > 1 ? currentPage * 5 : 0;
    // Create filters based on provided query parameters
    const filters: any = {};

    // Filter by category if provided
    if (category && category !== 'All') {
      filters.exerciseCategoryId = category.toString();
    }

    // Filter by category if provided
    if (userId && userId !== 'All') {
      filters.userId = Array.isArray(userId) ? userId[0] : userId; // Ensure userId is a string
    }

   // Filter by focus area if provided
if (Array.isArray(focusArea) && focusArea.length > 0 && focusArea[0] !== 'All') {
    filters.focusArea = { has: focusArea.toString() }; // Assuming focusArea contains values
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
