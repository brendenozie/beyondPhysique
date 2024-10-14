import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from "../../../../server/db/prismadb";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
    
      const updatedExercise = await prisma.exercise.findFirst({
        where: { id: String(id) },
      });

      res.status(200).json(updatedExercise);
    } catch (error) {
      console.error('Error updating exercise:', error);
      res.status(500).json({ error: 'Failed to update exercise' });
    }
  } 

  if (req.method === 'PUT') {
    try {
      const { exName, exDesc, exPic, exVideo } = req.body;

      let uploadedPicUrl = exPic;
      let uploadedVideoUrl = exVideo;
      const bucketName = process.env.AWS_S3_BUCKET_NAME || 'workoutprobucket';

      if (req.body.newPic) {
        const picParams = {
          Bucket: bucketName,
          Key: `images/${uuidv4()}.jpg`,
          Body: Buffer.from(req.body.newPic, 'base64'),
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg',
        };
        const picUploadResult = await s3.upload(picParams).promise();
        uploadedPicUrl = picUploadResult.Location;
      }

      if (req.body.newVideo) {
        const videoParams = {
          Bucket: bucketName,
          Key: `videos/${uuidv4()}.mp4`,
          Body: Buffer.from(req.body.newVideo, 'base64'),
          ContentEncoding: 'base64',
          ContentType: 'video/mp4',
        };
        const videoUploadResult = await s3.upload(videoParams).promise();
        uploadedVideoUrl = videoUploadResult.Location;
      }

      const updatedExercise = await prisma.exercise.update({
        where: { id: String(id) },
        data: {
          exName,
          exDesc,
          exPic: uploadedPicUrl,
          exVideo: uploadedVideoUrl,
        },
      });

      res.status(200).json(updatedExercise);
    } catch (error) {
      console.error('Error updating exercise:', error);
      res.status(500).json({ error: 'Failed to update exercise' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }


}
