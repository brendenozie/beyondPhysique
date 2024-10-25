import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

// Initialize the S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const {
        id,
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
      } = req.body;

      // Validate that the required fields are present
      if (!exName || !exDesc || !exerciseCategoryId || !reps || !sets) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      let uploadedPicUrl = "";
      let uploadedVideoUrl = "";
      const bucketName = process.env.AWS_S3_BUCKET_NAME || 'default-bucket-name';

      // Upload image to S3 if present
      if (exPic) {
        const picParams = {
          Bucket: bucketName,
          Key: `images/${uuidv4()}.jpg`, // unique filename for the image
          Body: Buffer.from(exPic, "base64"), // Assuming base64 encoded image
          ContentEncoding: "base64",
          ContentType: "image/jpeg",
        };
        const picUploadResult = await s3.upload(picParams).promise();
        uploadedPicUrl = picUploadResult.Location;
      }

      // Upload video to S3 if present
      if (exVideo) {
        const videoParams = {
          Bucket: bucketName,
          Key: `videos/${uuidv4()}.mp4`, // unique filename for the video
          Body: Buffer.from(exVideo, "base64"), // Assuming base64 encoded video
          ContentEncoding: "base64",
          ContentType: "video/mp4",
        };
        const videoUploadResult = await s3.upload(videoParams).promise();
        uploadedVideoUrl = videoUploadResult.Location;
      }

      // Create the exercise in the database using Prisma
      const result = id
        ? await prisma.exercise.update({
            where: { id },
            data: {
                    exName,
                    exDesc,
                    exPic: uploadedPicUrl || "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg", // Save the S3 URL or the original path
                    exVideo: uploadedVideoUrl || "https://workoutprobucket.s3.amazonaws.com/videos/dd655e52-c676-4957-9488-9f0435a3cc8c.mp4", // Save the S3 URL or the original path
                    exDuration,
                    exSteps,
                    reps,
                    sets,
                    weightPerRepInKg: weightPerRepInKg || 0.0,
                    weightPerSetInKg: weightPerSetInKg || 0.0,
                    breakSet: breakSet || "5s",
                    status,
                    exerciseCategoryId,
                    userId: userId || null,
                    exCalories,
                    exHeartBeat,
                    focusArea,
                    type: type || "others",
                    level: level || "Beginner",
                    caloriesPerRep: caloriesPerRep || "0.0 kcal",
                  },
          })
        : await prisma.exercise.create({
            data: {
                    exName,
                    exDesc,
                    exPic: uploadedPicUrl || "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg", // Save the S3 URL or the original path
                    exVideo: uploadedVideoUrl || "https://workoutprobucket.s3.amazonaws.com/videos/dd655e52-c676-4957-9488-9f0435a3cc8c.mp4", // Save the S3 URL or the original path
                    exDuration,
                    exSteps,
                    reps,
                    sets,
                    weightPerRepInKg: weightPerRepInKg || 0.0,
                    weightPerSetInKg: weightPerSetInKg || 0.0,
                    breakSet: breakSet || "5s",
                    status,
                    exerciseCategoryId,
                    userId: userId || null,
                    exCalories,
                    exHeartBeat,
                    focusArea,
                    type: type || "others",
                    level: level || "Beginner",
                    caloriesPerRep: caloriesPerRep || "0.0 kcal",
                  },
          });

      // const result = await prisma.exercise.create({
      //   data: {
      //     exName,
      //     exDesc,
      //     exPic: uploadedPicUrl || "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg", // Save the S3 URL or the original path
      //     exVideo: uploadedVideoUrl || "https://workoutprobucket.s3.amazonaws.com/videos/dd655e52-c676-4957-9488-9f0435a3cc8c.mp4", // Save the S3 URL or the original path
      //     exDuration,
      //     exSteps,
      //     reps,
      //     sets,
      //     weightPerRepInKg: weightPerRepInKg || 0.0,
      //     weightPerSetInKg: weightPerSetInKg || 0.0,
      //     breakSet: breakSet || "5s",
      //     status,
      //     exerciseCategoryId,
      //     userId: userId || null,
      //     exCalories,
      //     exHeartBeat,
      //     focusArea,
      //     type: type || "others",
      //     level: level || "Beginner",
      //     caloriesPerRep: caloriesPerRep || "0.0 kcal",
      //   },
      // });

      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating exercise:", error);
      return res.status(500).json({ error: "Failed to create exercise" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}













































































// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../server/db/prismadb";

// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       const {
//         exName,
//         exDesc,
//         exPic,
//         exVideo,
//         exDuration,
//         exSteps,
//         reps,
//         sets,
//         weightPerRepInKg,
//         weightPerSetInKg,
//         breakSet,
//         status,
//         exerciseCategoryId,
//         userId,
//         exCalories,
//         exHeartBeat,
//         focusArea,
//         type,
//         level,
//         caloriesPerRep,
//         // lastSet,
//         // lastRep,
//       } = req.body;

//       // Validate that the required fields are present
//       if (!exName || !exDesc || !exerciseCategoryId || !reps || !sets) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }

//       // Create the exercise in the database using Prisma
//       const result = await prisma.exercise.create({
//         data: {
//           exName,
//           exDesc,
//           exPic,
//           exVideo,
//           exDuration,
//           exSteps, // Assuming this is an array of ExSteps, properly handled by Prisma
//           reps,
//           sets,
//           weightPerRepInKg: weightPerRepInKg || 0.0, // Default to 0 if not provided
//           weightPerSetInKg: weightPerSetInKg || 0.0, // Default to 0 if not provided
//           breakSet: breakSet || "5s", // Default break set to "5s"
//           status,
//           exerciseCategoryId,
//           userId: userId || null, // If userId is not provided, set to null
//           exCalories,
//           exHeartBeat,
//           focusArea,
//           type: type || "others", // Default to "others" if not provided
//           level: level || "Beginner", // Default to "Beginner" if not provided
//           caloriesPerRep: caloriesPerRep || "0.0 kcal", // Default if not provided
//           // lastSet,
//           // lastRep,
//         },
//       });

//       return res.status(201).json(result);
//     } catch (error) {
//       console.error("Error creating exercise:", error);
//       return res.status(500).json({ error: "Failed to create exercise" });
//     }
//   } else {
//     // Method not allowed
//     return res.status(405).json({ error: "Method not allowed" });
//   }
// }
