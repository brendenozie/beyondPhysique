import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
        const { userId, subscriptionPlanId, amount, currency, startingAt, endingAt } = req.body;

        try {
            // Create new transaction
            const transaction = await prisma.transaction.create({
                data: {
                    amount,
                    currency,
                    status: 'pending', // Update status after payment confirmation
                    user: { connect: { id: userId } },
                    subscriptionPlan: { connect: { id: subscriptionPlanId } }
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