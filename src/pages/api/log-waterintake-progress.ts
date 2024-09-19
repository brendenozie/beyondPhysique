// /pages/api/waterIntake/log.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../server/db/prismadb"; // Assuming prisma client is initialized here

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, challengeId, dailyIntake, dailyGoal, date } = req.body;

    try {
      // Log daily water intake
      const waterIntakeProgress = await prisma.waterIntakeProgress.create({
        data: {
          userId,
          challengeId,
          dailyIntake,
          dailyGoal,
          date: new Date(date),
        },
      });

      // If part of a challenge, update the challenge progress
      if (challengeId) {
        const challengeProgress = await prisma.waterIntakeChallengeProgress.findFirst({
          where: { challengeId, userId },
        });

        if (challengeProgress) {
          // Update total water consumed and check if the daily goal is met
          const newCompletedDays = dailyIntake >= challengeProgress.dailyGoal
            ? challengeProgress.completedDays + 1
            : challengeProgress.completedDays;

          const updatedChallenge = await prisma.waterIntakeChallengeProgress.update({
            where: { id: challengeProgress.id },
            data: {
              currentIntake: {
                increment: dailyIntake,
              },
              completedDays: newCompletedDays,
              status: newCompletedDays >= challengeProgress.totalDays
                ? 'COMPLETED'
                : 'IN_PROGRESS',
              updatedAt: new Date(),
            },
          });
        } else {
          // Create challenge progress if not existing
          await prisma.waterIntakeChallengeProgress.create({
            data: {
              userId,
              challengeId,
              currentIntake: dailyIntake,
              totalGoal: dailyGoal * 7, // For example, 7-day challenge
              dailyGoal,
              totalDays: 7, // Assuming a 7-day challenge
              completedDays: dailyIntake >= dailyGoal ? 1 : 0,
              status: dailyIntake >= dailyGoal ? 'IN_PROGRESS' : 'NOT_STARTED',
            },
          });
        }
      }

      res.status(200).json({ message: 'Water intake logged successfully!', waterIntakeProgress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging water intake.', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
