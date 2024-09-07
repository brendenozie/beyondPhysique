import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/db/prismadb";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }

  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Please provide startDate and endDate query parameters' });
  }

  try {
    const start = startOfWeek(new Date(startDate), { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(new Date(endDate), { weekStartsOn: 1 }); // Sunday

    const activities = await prisma.exerciseActivity.findMany({
      where: {
        acDate: {
          gte: startOfDay(start),
          lte: endOfDay(end),
        },
      },
      select: {
        acCalories: true,
        acDuration: true,
        distanceInMeters: true,
      },
    });

    const summary = activities.reduce(
      (acc, activity) => {
        acc.totalCalories += activity.acCalories ? parseFloat(activity.acCalories) : 0;
        acc.totalDuration += activity.acDuration ? parseFloat(activity.acDuration) : 0;
        acc.totalDistance += activity.distanceInMeters || 0;
        return acc;
      },
      {
        totalCalories: 0,
        totalDuration: 0,
        totalDistance: 0,
      }
    );

    res.status(200).json(summary);
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
