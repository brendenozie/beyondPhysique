import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../server/db/prismadb"; // Assuming prisma client is initialized here


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      userId,
      exerciseId,
      challengeId,
      programId,
      acRepCount,    // Current rep count provided by the user
      acSetCount,    // Current set count provided by the user
      acCalories,
      durationInMillis,
      distanceInMeters,
      avgSpeedInKMH,
      type,
      timestamp
    } = req.body;

    try {
     // Fetch the latest logged activity for the user and exercise
      const lastActivity = await prisma.exerciseActivity.findFirst({
        where: { userId, exerciseId },
        orderBy: { timestamp: 'desc' },
      });

      // Fetch the target number of reps for the exercise
      const exercise = await prisma.exercise.findUnique({
        where: { id: exerciseId },
        select: { reps: true, sets: true },
      });

      // Safely fetch the target reps (default to 0 if not found)
      const targetReps = parseInt(exercise?.reps ?? "100") ?? 100;

      // Initialize new activity counts as the current ones
      let newRepCount = parseInt(acRepCount);
      let newSetCount = parseInt(acSetCount);

      // Check if the last logged activity has a higher rep count than the current one
      if (lastActivity) {
        if (newRepCount < (lastActivity.acRepCount ?? -1) || newSetCount < (lastActivity.acSetCount ?? -1)) {
          // User has returned after a break, so continue from where they left off
          newRepCount = (lastActivity.acRepCount ?? 0) + newRepCount;  // Add to the last logged rep count
          newSetCount = lastActivity.acSetCount ?? newSetCount;  // Carry over last logged set count
        }
      }
      console.log("11newRepCount");
        console.log(newRepCount);
        console.log(newSetCount);
        console.log(targetReps);

      // Check if the newRepCount meets or exceeds the targetReps
      if (newRepCount > targetReps) {
        // Increase the set count
        newSetCount += Math.floor(newRepCount / targetReps);
        console.log("22newRepCount");
        console.log(newRepCount);
        console.log(newSetCount);

        // Reset reps to 1 if the newRepCount equals the targetReps (end of set)
        if (newRepCount % targetReps === 0) {
          newRepCount = 1;
        } else {
          // Otherwise, carry over the remainder reps
          newRepCount = newRepCount % targetReps;
        }
      }

      // Save the updated activity (always log the new activity)
      const exerciseProgress = await prisma.exerciseActivity.create({
        data: {
          userId,
          acRepCount: newRepCount,  // Log the updated rep count
          acSetCount: newSetCount,  // Log the updated set count
          challengeId: challengeId ? challengeId : undefined,
          programId: programId ? programId : undefined,
          acCalories,
          durationInMillis,
          distanceInMeters,
          avgSpeedInKMH,
          type,
          timestamp,
          exercise: { connect: { id: exerciseId } },
        },
      });

      // Handle challenge and program updates (as in your original code)
      // Check if the exercise belongs to a challenge and update progress
      if (challengeId) {
        let currentChallenge = await prisma.challengeProgress.findFirst({
          where: { challengeId, userId },
        });

        // If no progress exists for the challenge, create it
        if (!currentChallenge) {
          const challenge = await prisma.workoutChallenges.findUnique({
            where: { id: challengeId },
          });

          currentChallenge = await prisma.challengeProgress.create({
            data: {
              userId,
              challengeId,
              totalExercises: challenge?.totalGoal ?? 0, // Safely access totalGoal from the challenge
            },
          });
        }

        // Check if the sets and reps are completed
        const exerciseComplete = newSetCount >= (parseInt(exercise?.sets ?? "0") ?? 0) && newRepCount >= (parseInt(exercise?.reps ?? "0") ?? 0);

        // Update challenge metrics only if the exercise is complete
        if (exerciseComplete) {
          await prisma.challengeProgress.update({
            where: { id: currentChallenge.id },
            data: {
              completedExercises: { increment: 1 },
              totalCaloriesBurned: { increment: acCalories ?? 0 },
              totalDurationInMillis: { increment: durationInMillis ?? 0 },
              totalDistanceInMeters: { increment: distanceInMeters ?? 0 },
            },
          });
        }

        // Update challenge status based on progress
        await prisma.challengeProgress.update({
          where: { id: currentChallenge.id },
          data: {
            status: currentChallenge.completedExercises + 1 >= (currentChallenge?.totalExercises ?? 0)
              ? 'COMPLETED'
              : 'IN_PROGRESS',
            updatedAt: new Date(),
          },
        });
      }

      // Check if the exercise belongs to a training program and update program progress
      if (programId) {
        let currentProgram = await prisma.trainingProgress.findFirst({
          where: { programId, userId },
        });

        // If no progress exists for the program, create it
        if (!currentProgram) {
          const program = await prisma.trainingProgram.findUnique({
            where: { id: programId },
          });

          currentProgram = await prisma.trainingProgress.create({
            data: {
              userId,
              programId,
              totalExercises: program?.exercises?.length ?? 0, // Safely access program exercises
            },
          });
        }

        // Check if the sets and reps are completed
        const exerciseComplete = newSetCount >= (parseInt(exercise?.sets ?? "0") ?? 0) && newRepCount >= (parseInt(exercise?.reps ?? "0") ?? 0);

        // Update program metrics only if the exercise is complete
        if (exerciseComplete) {
          await prisma.trainingProgress.update({
            where: { id: currentProgram.id },
            data: {
              completedExercises: { increment: 1 },
              totalCaloriesBurned: { increment: acCalories ?? 0 },
              totalDurationInMillis: { increment: durationInMillis ?? 0 },
              totalDistanceInMeters: { increment: distanceInMeters ?? 0 },
            },
          });
        }
      }

      // Send response with success message and updated exercise progress
      res.status(200).json({
        message: 'Exercise progress logged successfully!',
        exerciseProgress,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging exercise progress.', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}





























// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const {
//       userId,
//       exerciseId,
//       challengeId,
//       programId,
//       acRepCount,
//       acSetCount,
//       acCalories,
//       durationInMillis,
//       distanceInMeters,
//       avgSpeedInKMH,
//       type,
//       timestamp
//     } = req.body;

//     try {
//        // Fetch the latest logged activity for the user and exercise
//         const lastActivity = await prisma.exerciseActivity.findFirst({
//           where: { userId, exerciseId },
//           orderBy: { timestamp: 'desc' },
//         });

//       // Fetch the target number of reps for the exercise
//       const exercise = await prisma.exercise.findUnique({
//         where: { id: exerciseId },
//         select: { reps: true, sets: true },
//       });

//       // If no exercise data or target reps are not available, handle it safely
//       const targetReps = parseInt(exercise?.reps ?? "0") ?? 0;

//       // Continue from the last progress if it exists
//       let newRepCount = (lastActivity?.acRepCount ?? 0) + parseInt(acRepCount);

//       // Initialize newSetCount with the last logged set count
//       let newSetCount = lastActivity?.acSetCount ?? 0;

//       // Check if the new rep count exceeds or completes the target reps
//       if (newRepCount >= targetReps) {
//         // Increment the set count when reps are completed
//         newSetCount += Math.floor(newRepCount / targetReps);
        
//         // Remainder reps to carry over to the next set (if reps exceed target)
//         newRepCount = newRepCount % targetReps;
//       }

//       // Save the updated activity
//       const exerciseProgress = await prisma.exerciseActivity.create({
//         data: {
//           userId,
//           acRepCount: newRepCount,  // Log the remainder reps
//           acSetCount: newSetCount,  // Log the updated set count
//           challengeId: challengeId ? challengeId : undefined,
//           programId: programId ? programId : undefined,
//           acCalories,
//           durationInMillis,
//           distanceInMeters,
//           avgSpeedInKMH,
//           type,
//           timestamp,
//           exercise: { connect: { id: exerciseId } },
//         },
//       });      

//       // Check if the exercise belongs to a challenge and update challenge progress
//       if (challengeId) {
//         let currentChallenge = await prisma.challengeProgress.findFirst({
//           where: { challengeId, userId },
//         });

//         // If no progress exists for the challenge, create it
//         if (!currentChallenge) {
//           const challenge = await prisma.workoutChallenges.findUnique({
//             where: { id: challengeId },
//           });

//           currentChallenge = await prisma.challengeProgress.create({
//             data: {
//               userId,
//               challengeId,
//               totalExercises: challenge?.totalGoal ?? 0, // Safely access totalGoal from the challenge
//             },
//           });
//         }

//         // Fetch the current exercise details to check set/rep completion
//         // const exercise = await prisma.exercise.findUnique({
//         //   where: { id: exerciseId },
//         //   select: { sets: true, reps: true },
//         // });

//         // Check if the sets and reps are completed
//         const exerciseComplete = acSetCount >= (exercise?.sets ?? 0) && acRepCount >= (exercise?.reps ?? 0);

//         // Update challenge metrics only if the exercise is complete
//         if (exerciseComplete) {
//           await prisma.challengeProgress.update({
//             where: { id: currentChallenge.id },
//             data: {
//               completedExercises: { increment: 1 },
//               totalCaloriesBurned: { increment: acCalories ?? 0 },
//               totalDurationInMillis: { increment: durationInMillis ?? 0 },
//               totalDistanceInMeters: { increment: distanceInMeters ?? 0 },
//             },
//           });
//         }

//         // If the user completes the total goal of the challenge, update the status
//         await prisma.challengeProgress.update({
//           where: { id: currentChallenge.id },
//           data: {
//             status: currentChallenge.completedExercises + 1 >= (currentChallenge?.totalExercises ?? 0)
//               ? 'COMPLETED'
//               : 'IN_PROGRESS',
//             updatedAt: new Date(),
//           },
//         });
//       }

//       // Check if the exercise belongs to a training program and update program progress
//       if (programId) {
//         let currentProgram = await prisma.trainingProgress.findFirst({
//           where: { programId, userId },
//         });

//         // If no progress exists for the program, create it
//         if (!currentProgram) {
//           const program = await prisma.trainingProgram.findUnique({
//             where: { id: programId },
//           });

//           currentProgram = await prisma.trainingProgress.create({
//             data: {
//               userId,
//               programId,
//               totalExercises: program?.exercises?.length ?? 0, // Safely access program exercises
//             },
//           });
//         }

//         // // Fetch the current exercise details to check set/rep completion
//         // const exercise = await prisma.exercise.findUnique({
//         //   where: { id: exerciseId },
//         //   select: { sets: true, reps: true },
//         // });

//         // Check if the sets and reps are completed
//         const exerciseComplete = acSetCount >= (exercise?.sets ?? 0) && acRepCount >= (exercise?.reps ?? 0);

//         // Update program metrics only if the exercise is complete
//         if (exerciseComplete) {
//           await prisma.trainingProgress.update({
//             where: { id: currentProgram.id },
//             data: {
//               completedExercises: { increment: 1 },
//               totalCaloriesBurned: { increment: acCalories ?? 0 },
//               totalDurationInMillis: { increment: durationInMillis ?? 0 },
//               totalDistanceInMeters: { increment: distanceInMeters ?? 0 },
//             },
//           });
//         }
//       }

//       res.status(200).json({
//         message: 'Exercise progress logged successfully!',
//         exerciseProgress,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error logging exercise progress.', error });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
