import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { query, page, userId } = req.query;

  if (req.method === "GET") {
    let currentPage = parseInt(page as string, 10) || 1;
    let skip = currentPage > 1 ? (currentPage - 1) * 5 : 0;

    // Create filters based on provided query parameters
    const filters: any = {};

    // Filter by search query if provided
    if (query) {
      filters.OR = [
        { challengeName: { contains: query.toString(), mode: 'insensitive' } },
        { challengeDesc: { contains: query.toString(), mode: 'insensitive' } }
      ];
    }

    // Filter for running challenges
    const now = new Date();
    filters.releaseDate = { lte: now };
    filters.endDate = { gte: now };

    const userIdString = Array.isArray(userId) ? userId[0] : userId; // Ensure userId is a string

    // Fetch challenges and user's progress
    const results = await prisma.$transaction([
      prisma.waterIntakeChallenges.count({
        where: {
          ...filters,
          progress: {
            some: { userId: userIdString, status: 'COMPLETED' }, // Only get completed challenges
          },
        },
      }),
      prisma.waterIntakeChallenges.findMany({
        skip: skip,
        take: 5,
        where: {
          ...filters,
          progress: {
            some: { userId: userIdString, status: 'COMPLETED' }, // Only get completed challenges
          },
        },
        orderBy: { releaseDate: 'asc' },
        include: {
          progress: {
            where: { userId: userIdString, status: 'COMPLETED' }, // Include only completed progress
            select: {
              currentIntake: true,
              totalGoal: true,
              dailyGoal: true,
              completedDays: true,
              totalDays: true,
              status: true,
            },
          },
        },
      }),
    ]);

    // Prepare response with challenges and user progress
    const challengesWithProgress = results[1].map((challenge) => {
      const progress = challenge.progress[0] || {};

      return {
        ...challenge,
        userProgress: {
          currentIntake: progress.currentIntake || 0,
          totalGoal: progress.totalGoal || 0,
          dailyGoal: progress.dailyGoal || 0,
          completedDays: progress.completedDays || 0,
          totalDays: progress.totalDays || 0,
          status: progress.status || 'NOT_STARTED',
        },
      };
    });

    res.json({
      InfoResponse: {
        count: results[0] ?? 0,
        next: currentPage * 5 < results[0] ? currentPage + 1 : 0,
        pages: Math.ceil(results[0] / 5),
        prev: currentPage > 1 ? currentPage - 1 : 0,
      },
      results: challengesWithProgress,
    });
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
