import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
        const { userId, subscriptionPlanId, amount, status, currency, startingAt, endingAt } = req.body;

        try {
            // Create new transaction
            
            if (!userId || !amount || !currency || !status || !startingAt || !endingAt) {
                return res.status(400).json({ message: 'Please provide query parameters' });
            }

            if (typeof startingAt !== 'string' || typeof endingAt !== 'string') {
                return res.status(400).json({ message: 'Please provide fromDate and toDate as strings' });
            }

            const tareheStart = new Date(startingAt);
            const tareheEnd = new Date(endingAt);

            const transaction = await prisma.transaction.create({
                data: {
                    amount,
                    currency,
                    status, // Update status after payment confirmation
                    user: { connect: { id: userId } },
                    subscriptionPlan: { connect: { id: subscriptionPlanId } },
                    startingAt: tareheStart,
                    endingAt:tareheEnd
                }
            });

            res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ error: 'Error creating transaction' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}