import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { focusArea, query, page, userId } = req.query; // Ensure userId is passed

  if (req.method === "GET") {
    let currentPage = page ? parseInt(page as string, 10) : 1;
    let skip = currentPage > 1 ? (currentPage - 1) * 5 : 0;
    const filters: any = {};

    // Filter by focus area if provided
    if (focusArea && focusArea !== 'All') {
      filters.focus = { has: focusArea.toString() };
    }

    // Search query for challenge name and description
    if (query) {
      filters.OR = [
        { challengeName: { contains: query.toString(), mode: 'insensitive' } },
        { challengeDesc: { contains: query.toString(), mode: 'insensitive' } },
      ];
    }

    // Filter based on current date (active challenges)
    const now = new Date();
    filters.releaseDate = { lte: now };
    filters.endDate = { gte: now };

    // Fetch user progress for completed challenges
    const userIdString = Array.isArray(userId) ? userId[0] : userId; // Ensure userId is a string
    let completedChallengesIds: string[] = [];

    if (userId) {
      const completedChallenges = await prisma.challengeProgress.findMany({
        where: { userId: userIdString, status: 'COMPLETED' }, // Assuming 'COMPLETED' indicates a completed challenge
        select: { challengeId: true },
      });
      completedChallengesIds = completedChallenges.map((challenge) => challenge.challengeId);
    }

    // Add filter for only completed challenges
    filters.id = { in: completedChallengesIds };

    // Retrieve total count and paginated challenges
    const [totalWorkouts, dailyWorkouts] = await prisma.$transaction([
      prisma.workoutChallenges.count({ where: filters }),
      prisma.workoutChallenges.findMany({
        skip: skip,
        take: 5,
        where: filters,
        orderBy: { releaseDate: 'asc' },
      }),
    ]);

    // Fetch exercises for the challenges
    const exerciseIds = dailyWorkouts.flatMap((challenge) => challenge.exercises);

    const exercises = await prisma.exercise.findMany({
      where: { id: { in: exerciseIds } },
      select: {
        id: true,
        exName: true,
        exDesc: true,
        exPic: true,
        exVideo: true,
        exDuration: true,
        status: true,
        exerciseCategoryId: true,
        reps: true,
        sets: true,
        breakSet: true,
        exSteps: true,
        exCalories: true,
        exHeartBeat: true,
        caloriesPerRep: true,
      },
    });

    // Map exercises by ID for easy lookup
    const exerciseMap = exercises.reduce((acc, exercise) => {
      acc[exercise.id] = exercise;
      return acc;
    }, {} as Record<string, typeof exercises[0]>);

    // Combine challenges with their respective exercises
    const workoutChallengesWithExercises = dailyWorkouts.map((challenge: any) => {
      return {
        ...challenge,
        exercises: challenge.exercises.map((id: string | number) => exerciseMap[id] || null).filter(Boolean),
      };
    });

    // Pagination logic
    const totalPages = Math.ceil(totalWorkouts / 5);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    res.json({
      InfoResponse: {
        count: totalWorkouts,
        next: nextPage,
        pages: totalPages,
        prev: prevPage,
      },
      results: workoutChallengesWithExercises,
    });

  } else {
    res.status(405).json({ error: `The HTTP ${req.method} method is not supported at this route.` });
  }
}
