import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const {  focusArea,  query,page } = req.query;
  if (req.method === "GET") {

    let currentPage = page as unknown as number;
    let skip = currentPage > 1 ? currentPage * 5 : 0;
    // Create filters based on provided query parameters
    const filters: any = {};

    // Filter by focus area if provided
    if (focusArea && focusArea !== 'All') {
      filters.focus  = { has: focusArea.toString() }; // Assuming focusArea is an array
    }

    // Filter by search query if provided
    if (query) {
      filters.OR = [
        { challengeName: { contains: query.toString(), mode: 'insensitive' } },
        { challengeDesc: { contains: query.toString(), mode: 'insensitive' } }
      ];
    }

    // Filter for running challenges
    const now = new Date();
    filters.releaseDate = {
        lte: now,
    };
    filters.endDate = {
        gte: now,
    };

    const [totalWorkoouts, dailyWorkouts] = await prisma.$transaction([
      prisma.workoutChallenges.count({where: filters,}),
      prisma.workoutChallenges.findMany({
        skip: skip,
        take: 5,
        where: filters,
        orderBy: { releaseDate: 'asc' },
      }),
    ]);


    // Extract exercise IDs from the dailyPlans
    const exerciseIds = dailyWorkouts.flatMap((challenge) => challenge.exercises);


    // Fetch all exercises in one query
    const exercises = await prisma.exercise.findMany({
      where: {
        id: {
          in: exerciseIds,
        },
      },
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
              breakSet:true,
              exSteps: true,
              exCalories: true,
              exHeartBeat: true,
              caloriesPerRep:true,
      },
    });

    // Create a map of exercises by ID for easy lookup
    const exerciseMap = exercises.reduce((acc, exercise) => {
      acc[exercise.id] = exercise;
      return acc;
    }, {} as Record<string, typeof exercises[0]>);

    // Attach exercises to their respective DailyPlans
    const workoutChallengesWithExercises = dailyWorkouts.map((plan : any) => ({
      ...plan,
      exercises: plan.exercises.map((id: string | number) => exerciseMap[id] || null).filter(Boolean),
    }));

    // Calculate pagination details
    const totalPages = Math.ceil(totalWorkoouts / 20);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    // Respond with the combined result
    res.json({
      InfoResponse: {
        count: totalWorkoouts,
        next: nextPage,
        pages: totalPages,
        prev: prevPage,
      },
      results: workoutChallengesWithExercises,
    });
    
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
