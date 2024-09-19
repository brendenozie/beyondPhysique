import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
const { page } = req.query;
  if (req.method === "GET") {
    
     let currentPage = page as unknown as number;
    let skip = currentPage > 1 ? currentPage * 20 : 0;

    const notifications = await prisma.notification.findMany({
      skip: skip,
        take: 20,
        where: {
          // userId,
          // read: false,
          // Add custom filtering for relevance, e.g., not outdated
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Notifications from the last 7 days
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json(notifications);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
