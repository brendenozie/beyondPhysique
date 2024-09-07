import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay, addDays } from 'date-fns';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Only GET requests are allowed' });
    }

    try {
        // Check if there are currently running challenges
        const runningChallenges = await prisma.workoutChallenges.findMany({
            where: {
                releaseDate: {
                    lte: new Date(),  // Release date is in the past or today
                },
                endDate: {
                    gte: new Date(),  // End date is in the future or today
                }
            }
        });
        
        // If there are 5 or more running challenges, do nothing
        if (runningChallenges.length >= 5) {
            return res.status(200).json({
                message: 'There are already 5 running workout challenges. No new challenges released.',
                runningChallengesCount: runningChallenges.length
            });
        }

        // Step 1: Prioritize challenges with no release date
        let challengesToRelease = await prisma.workoutChallenges.findMany({
            where: {
                releaseDate: null,  // No release date
            },
        });

        // Step 2: If fewer than 5, add challenges that have ended
        if (challengesToRelease.length < 5) {
            const additionalChallenges = await prisma.workoutChallenges.findMany({
                where: {
                    endDate: {
                        lt: new Date(),  // End date is in the past
                    },
                },
            });

            challengesToRelease = [
                ...challengesToRelease,
                ...additionalChallenges.slice(0, 5 - challengesToRelease.length) // Fill up to 5 total
            ];
        }

        if (challengesToRelease.length === 0) {
            return res.status(200).json({
                message: 'No challenges available for release.',
                releasedChallengesCount: 0
            });
        }

        // Set the release date and end date for the selected challenges
        const newReleaseDate = startOfDay(new Date());
        const newEndDate = endOfDay(addDays(newReleaseDate, 30)); // Set the challenge to run for 30 days

        for (const challenge of challengesToRelease) {
            await prisma.workoutChallenges.update({
                where: { id: challenge.id },
                data: {
                    releaseDate: newReleaseDate,
                    endDate: newEndDate,
                },
            });
        }

        res.status(200).json({
            message: 'Challenges released successfully',
            releasedChallengesCount: challengesToRelease.length,
        });
    } catch (error) {
        console.error('Error updating workout challenges:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
