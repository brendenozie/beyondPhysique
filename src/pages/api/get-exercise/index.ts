import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";
// import Redis from 'redis';

// const redisClient = Redis.createClient();
// const CACHE_TTL = 60; // Cache time-to-live in seconds

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
const { category, focusArea, level, query, page, userId } = req.query;

if (req.method === "GET") {
  let currentPage = page ? parseInt(page as string) : 1;
  let skip = currentPage > 1 ? (currentPage - 1) * 5 : 0;

  // Create filters based on provided query parameters
  const filters: any = {};

  // Filter by category if provided
  if (category && category !== "All") {
    filters.exerciseCategoryId = category.toString();
  }

  // Filter by userId if provided
  if (userId && userId !== "All") {
    filters.userId = Array.isArray(userId) ? userId[0] : userId; // Ensure userId is a string
  }

  // Filter by focus area if provided
  if (Array.isArray(focusArea) && focusArea.length > 0 && focusArea[0] !== "All") {
    filters.focusArea = { has: focusArea.toString() }; // Assuming focusArea contains values
  }

  // Filter by level if provided
  if (level && level !== "All") {
    filters.level = level.toString();
  }

  // Filter by search query if provided
  if (query) {
    filters.OR = [
      { exName: { contains: query.toString(), mode: "insensitive" } },
      { exDesc: { contains: query.toString(), mode: "insensitive" } },
    ];
  }

  try {
    // Fetch total count
    const totalCount = await prisma.exercise.count({ where: filters });

    // Fetch exercises with pagination
    const exercises = await prisma.exercise.findMany({
      skip: skip,
      take: 5,
      where: filters,
    });

    res.json({
      InfoResponse: {
        count: totalCount,
        next: currentPage * 20 > totalCount ? currentPage : 0,
        pages: Math.ceil(totalCount / 20),
        prev: currentPage - 1 > 0 ? currentPage - 1 : 0,
      },
      results: exercises,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
} else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
