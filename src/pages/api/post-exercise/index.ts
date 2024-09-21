import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const {
        exName,
        exDesc,
        exPic,
        exVideo,
        exDuration,
        exSteps,
        reps,
        sets,
        weightPerRepInKg,
        weightPerSetInKg,
        breakSet,
        status,
        exerciseCategoryId,
        userId,
        exCalories,
        exHeartBeat,
        focusArea,
        type,
        level,
        caloriesPerRep,
        // lastSet,
        // lastRep,
      } = req.body;

      // Validate that the required fields are present
      if (!exName || !exDesc || !exerciseCategoryId || !reps || !sets) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create the exercise in the database using Prisma
      const result = await prisma.exercise.create({
        data: {
          exName,
          exDesc,
          exPic,
          exVideo,
          exDuration,
          exSteps, // Assuming this is an array of ExSteps, properly handled by Prisma
          reps,
          sets,
          weightPerRepInKg: weightPerRepInKg || 0.0, // Default to 0 if not provided
          weightPerSetInKg: weightPerSetInKg || 0.0, // Default to 0 if not provided
          breakSet: breakSet || "5s", // Default break set to "5s"
          status,
          exerciseCategoryId,
          userId: userId || null, // If userId is not provided, set to null
          exCalories,
          exHeartBeat,
          focusArea,
          type: type || "others", // Default to "others" if not provided
          level: level || "Beginner", // Default to "Beginner" if not provided
          caloriesPerRep: caloriesPerRep || "0.0 kcal", // Default if not provided
          // lastSet,
          // lastRep,
        },
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating exercise:", error);
      return res.status(500).json({ error: "Failed to create exercise" });
    }
  } else {
    // Method not allowed
    return res.status(405).json({ error: "Method not allowed" });
  }
}
