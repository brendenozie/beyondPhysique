import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  // Check if the method is GET
  if (req.method === 'GET') {
    // Validate userId
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
      // Fetch the latest transaction for the given user
      const latestTransaction = await prisma.transaction.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
          subscriptionPlan: true, // Include subscription plan details if needed
        },
      });

      if (!latestTransaction) {
        return res.status(404).json({ message: 'No transaction found for this user' });
      }

      res.status(200).json(latestTransaction);
    } catch (error) {
      console.error('Error fetching the latest transaction:', error);
      res.status(500).json({ error: 'Error fetching the latest transaction' });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ error: 'Method not allowed' });
  }
}
