import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { focusArea, query, page, userID  } = req.query; // Ensure userId is passed
    // Debugging line
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

    // Fetch user progress for each challenge
    let userProgressData: any[] = [];
    const userIdString = Array.isArray(userID) ? userID[0] : userID; // Ensure userId is a string

    if (userID) {
      userProgressData = await prisma.challengeProgress.findMany({
        where: { userId: userIdString, challengeId: { in: dailyWorkouts.map(c => c.id) } },
      });
    }

    // Fetch the last set and rep for each exercise for the user
    const exerciseActivityMap = userIdString ? await prisma.exerciseActivity.findMany({
      where: { userId: userIdString, exerciseId: { in: exerciseIds },challengeId:{ in: dailyWorkouts.map(c => c.id) } },
      orderBy: { timestamp: 'desc' },
      distinct: ['exerciseId'],
    }) : [];

    console.log(exerciseActivityMap)

    // Map exercise activities by exercise ID for easy lookup
    const exerciseActivityLookup = exerciseActivityMap.reduce((acc, activity) => {
      acc[activity.exerciseId] = activity;
      return acc;
    }, {} as Record<string, typeof exerciseActivityMap[0]>);

    // Combine challenges with their respective exercises and user progress
    const workoutChallengesWithExercises = dailyWorkouts.map((challenge: any) => {
      const userProgress = userProgressData.find(p => p.challengeId === challenge.id);

      return {
        ...challenge,
        exercises: challenge.exercises.map((id: string | number) => {
          const exercise = exerciseMap[id] || null;
          if (exercise) {
            // Include the last set and rep for this exercise
            const exerciseActivity = exerciseActivityLookup[id];
            return {
              ...exercise,
              lastSet: exerciseActivity?.acSetCount || 0,
              lastRep: exerciseActivity?.acRepCount || 0,
            };
          }
          return null;
        }).filter(Boolean),
        progress: userProgress || {
          completedExercises: 0,
          totalExercises: challenge.totalGoal || 0,
          totalCaloriesBurned: 0,
          totalDurationInMillis: 0,
          totalDistanceInMeters: 0,
          status: 'NOT_STARTED',
        },
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


// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//   const { focusArea, query, page, userId } = req.query; // Ensure userId is passed

//   if (req.method === "GET") {
//     let currentPage = page ? parseInt(page as string, 10) : 1;
//     let skip = currentPage > 1 ? (currentPage - 1) * 5 : 0;
//     const filters: any = {};

//     // Filter by focus area if provided
//     if (focusArea && focusArea !== 'All') {
//       filters.focus = { has: focusArea.toString() };
//     }

//     // Search query for challenge name and description
//     if (query) {
//       filters.OR = [
//         { challengeName: { contains: query.toString(), mode: 'insensitive' } },
//         { challengeDesc: { contains: query.toString(), mode: 'insensitive' } },
//       ];
//     }

//     // Filter based on current date (active challenges)
//     const now = new Date();
//     filters.releaseDate = { lte: now };
//     filters.endDate = { gte: now };

//     // Retrieve total count and paginated challenges
//     const [totalWorkouts, dailyWorkouts] = await prisma.$transaction([
//       prisma.workoutChallenges.count({ where: filters }),
//       prisma.workoutChallenges.findMany({
//         skip: skip,
//         take: 5,
//         where: filters,
//         orderBy: { releaseDate: 'asc' },
//       }),
//     ]);

//     // Fetch exercises for the challenges
//     const exerciseIds = dailyWorkouts.flatMap((challenge) => challenge.exercises);

//     const exercises = await prisma.exercise.findMany({
//       where: { id: { in: exerciseIds } },
//       select: {
//         id: true,
//         exName: true,
//         exDesc: true,
//         exPic: true,
//         exVideo: true,
//         exDuration: true,
//         status: true,
//         exerciseCategoryId: true,
//         reps: true,
//         sets: true,
//         breakSet: true,
//         exSteps: true,
//         exCalories: true,
//         exHeartBeat: true,
//         caloriesPerRep: true,
//       },
//     });

//     // Map exercises by ID for easy lookup
//     const exerciseMap = exercises.reduce((acc, exercise) => {
//       acc[exercise.id] = exercise;
//       return acc;
//     }, {} as Record<string, typeof exercises[0]>);

//     // Combine challenges with their respective exercises
//     const workoutChallengesWithExercises = dailyWorkouts.map((challenge: any) => ({
//       ...challenge,
//       exercises: challenge.exercises.map((id: string | number) => exerciseMap[id] || null).filter(Boolean),
//     }));

//     // Fetch user progress for each challenge
//     let userProgressData: any[] = [];
//     const userIdString = Array.isArray(userId) ? userId[0] : userId; // Ensure userId is a string

//     if (userId) {
//       userProgressData = await prisma.challengeProgress.findMany({
//         where: { userId: userIdString, challengeId: { in: workoutChallengesWithExercises.map(c => c.id) } },
//       });
//     }

//     // Combine challenges with user progress data
//     const challengesWithUserProgress = workoutChallengesWithExercises.map(challenge => {
//       const userProgress = userProgressData.find(p => p.challengeId === challenge.id);

//       return {
//         ...challenge,
//         progress: userProgress || {
//           completedExercises: 0,
//           totalExercises: challenge.totalGoal || 0, // Use dynamic totalGoal from challenge
//           totalCaloriesBurned: 0,
//           totalDurationInMillis: 0,
//           totalDistanceInMeters: 0,
//           status: 'NOT_STARTED',
//         },
//       };
//     });

//     // Pagination logic
//     const totalPages = Math.ceil(totalWorkouts / 5);
//     const nextPage = currentPage < totalPages ? currentPage + 1 : null;
//     const prevPage = currentPage > 1 ? currentPage - 1 : null;

//     res.json({
//       InfoResponse: {
//         count: totalWorkouts,
//         next: nextPage,
//         pages: totalPages,
//         prev: prevPage,
//       },
//       results: challengesWithUserProgress,
//     });

//   } else {
//     res.status(405).json({ error: `The HTTP ${req.method} method is not supported at this route.` });
//   }
// }
