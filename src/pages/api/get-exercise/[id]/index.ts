import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../server/db/prismadb';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { createRouter } from 'next-connect';
import { IncomingMessage, ServerResponse } from 'http';

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Set up multer for file uploads with a size limit (10 MB)
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

// Middleware to handle multipart form data
const multerMiddleware = upload.fields([{ name: 'newPic' }, { name: 'newVideo' }]);

function runMiddleware(req: IncomingMessage, res: ServerResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Create a router using next-connect
const router = createRouter<NextApiRequest, NextApiResponse>();

// Middleware to process file uploads using multer
router.use(async (req, res, next) => {
  try {
    // Use multer to parse the files
    await runMiddleware(req, res, multerMiddleware);
    
    next();
  } catch (err) {
    console.error('File upload error:', err);
    return res.status(500).json({ error: 'File upload error' });
  }
});

// GET handler to fetch exercise data
router.get(async (req, res) => {
  const { id } = req.query;

  try {
    const exercise = await prisma.exercise.findFirst({
      where: { id: String(id) },
    });

    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    res.status(200).json(exercise);
  } catch (error) {
    console.error('Error fetching exercise:', error);
    res.status(500).json({ error: 'Failed to fetch exercise' });
  }
});

// PUT handler to update exercise data
router.put(async (req, res) => {
  const { id } = req.query;
  const { exName, exDesc, exPic, exVideo, newPic, newVideo } = req.body;

  try {
    let uploadedPicUrl = exPic;
    let uploadedVideoUrl = exVideo;
    const bucketName = process.env.AWS_S3_BUCKET_NAME || 'workoutprobucket';

    if (newPic) {
      const picParams = {
        Bucket: bucketName,
        Key: `images/${uuidv4()}.jpg`,
        Body: Buffer.from(newPic, 'base64'),
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
      };
      const picUploadResult = await s3.upload(picParams).promise();
      uploadedPicUrl = picUploadResult.Location;
    }

    if (newVideo) {
      const videoParams = {
        Bucket: bucketName,
        Key: `videos/${uuidv4()}.mp4`,
        Body: Buffer.from(newVideo, 'base64'),
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
});

// Export the router as the API handler
export default router.handler();




















// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../server/db/prismadb';
// import AWS from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';
// import { createRouter } from 'next-connect'; // Updated import
// import multer from 'multer';

// // Configure AWS S3
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // Set up multer for file uploads with a size limit (10 MB)
// const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10 MB

// // Helper to wrap multer for Next.js compatibility
// const multerMiddleware = upload.fields([{ name: 'newPic' }, { name: 'newVideo' }]);

// // Middleware wrapper to convert multer into a promise-based function
// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) return reject(result);
//       resolve(result);
//     });
//   });
// }

// // Create nextConnect handler
// const handler = createRouter<NextApiRequest, NextApiResponse>(); // Updated to use createRouter

// // Use the multer middleware in the handler
// handler.use(async (req, res, next) => {
//   try {
//     await runMiddleware(req, res, multerMiddleware);
//     next();
//   } catch (error) {
//     console.error('Multer error:', error);
//     res.status(500).json({ error: 'File upload error' });
//   }
// });

// // GET handler to fetch exercise data
// handler.get(async (req, res) => {
//   const { id } = req.query;

//   try {
//     const exercise = await prisma.exercise.findFirst({
//       where: { id: String(id) },
//     });

//     if (!exercise) {
//       return res.status(404).json({ error: 'Exercise not found' });
//     }

//     res.status(200).json(exercise);
//   } catch (error) {
//     console.error('Error fetching exercise:', error);
//     res.status(500).json({ error: 'Failed to fetch exercise' });
//   }
// });

// // PUT handler to update exercise data
// handler.put(async (req, res) => {
//   const { id } = req.query;
//   const { exName, exDesc, exPic, exVideo, newPic, newVideo } = req.body;

//   try {
//     let uploadedPicUrl = exPic;
//     let uploadedVideoUrl = exVideo;
//     const bucketName = process.env.AWS_S3_BUCKET_NAME || 'workoutprobucket';

//     if (newPic) {
//       const picParams = {
//         Bucket: bucketName,
//         Key: `images/${uuidv4()}.jpg`,
//         Body: Buffer.from(newPic, 'base64'),
//         ContentEncoding: 'base64',
//         ContentType: 'image/jpeg',
//       };
//       const picUploadResult = await s3.upload(picParams).promise();
//       uploadedPicUrl = picUploadResult.Location;
//     }

//     if (newVideo) {
//       const videoParams = {
//         Bucket: bucketName,
//         Key: `videos/${uuidv4()}.mp4`,
//         Body: Buffer.from(newVideo, 'base64'),
//         ContentEncoding: 'base64',
//         ContentType: 'video/mp4',
//       };
//       const videoUploadResult = await s3.upload(videoParams).promise();
//       uploadedVideoUrl = videoUploadResult.Location;
//     }

//     const updatedExercise = await prisma.exercise.update({
//       where: { id: String(id) },
//       data: {
//         exName,
//         exDesc,
//         exPic: uploadedPicUrl,
//         exVideo: uploadedVideoUrl,
//       },
//     });

//     res.status(200).json(updatedExercise);
//   } catch (error) {
//     console.error('Error updating exercise:', error);
//     res.status(500).json({ error: 'Failed to update exercise' });
//   }
// });

// // Export the handler to be used as an API endpoint
// export default handler;








// // import { NextApiRequest, NextApiResponse } from 'next';
// // import prisma from '../../../../server/db/prismadb';
// // import AWS from 'aws-sdk';
// // import { v4 as uuidv4 } from 'uuid';
// // import {nextConnect} from 'next-connect';
// // import multer from 'multer';

// // // Configure AWS S3
// // const s3 = new AWS.S3({
// //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //   region: process.env.AWS_REGION,
// // });

// // // Set up multer for file uploads with a size limit (10 MB)
// // const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10 MB

// // // Helper to wrap multer for Next.js compatibility
// // const multerMiddleware = upload.fields([{ name: 'newPic' }, { name: 'newVideo' }]);

// // // Middleware wrapper to convert multer into a promise-based function
// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) return reject(result);
//       resolve(result);
//     });
//   });
// }

// // // Create nextConnect handler
// // const handler = nextConnect<NextApiRequest, NextApiResponse>();

// // // Use the multer middleware in the handler
// // handler.use(async (req, res, next) => {
// //   try {
// //     await runMiddleware(req, res, multerMiddleware);
// //     next();
// //   } catch (error) {
// //     console.error('Multer error:', error);
// //     res.status(500).json({ error: 'File upload error' });
// //   }
// // });

// // // GET handler to fetch exercise data
// // handler.get(async (req, res) => {
// //   const { id } = req.query;

// //   try {
// //     const exercise = await prisma.exercise.findFirst({
// //       where: { id: String(id) },
// //     });

// //     if (!exercise) {
// //       return res.status(404).json({ error: 'Exercise not found' });
// //     }

// //     res.status(200).json(exercise);
// //   } catch (error) {
// //     console.error('Error fetching exercise:', error);
// //     res.status(500).json({ error: 'Failed to fetch exercise' });
// //   }
// // });

// // // PUT handler to update exercise data
// // handler.put(async (req, res) => {
// //   const { id } = req.query;
// //   const { exName, exDesc, exPic, exVideo, newPic, newVideo } = req.body;

// //   try {
// //     let uploadedPicUrl = exPic;
// //     let uploadedVideoUrl = exVideo;
// //     const bucketName = process.env.AWS_S3_BUCKET_NAME || 'workoutprobucket';

// //     if (newPic) {
// //       const picParams = {
// //         Bucket: bucketName,
// //         Key: `images/${uuidv4()}.jpg`,
// //         Body: Buffer.from(newPic, 'base64'),
// //         ContentEncoding: 'base64',
// //         ContentType: 'image/jpeg',
// //       };
// //       const picUploadResult = await s3.upload(picParams).promise();
// //       uploadedPicUrl = picUploadResult.Location;
// //     }

// //     if (newVideo) {
// //       const videoParams = {
// //         Bucket: bucketName,
// //         Key: `videos/${uuidv4()}.mp4`,
// //         Body: Buffer.from(newVideo, 'base64'),
// //         ContentEncoding: 'base64',
// //         ContentType: 'video/mp4',
// //       };
// //       const videoUploadResult = await s3.upload(videoParams).promise();
// //       uploadedVideoUrl = videoUploadResult.Location;
// //     }

// //     const updatedExercise = await prisma.exercise.update({
// //       where: { id: String(id) },
// //       data: {
// //         exName,
// //         exDesc,
// //         exPic: uploadedPicUrl,
// //         exVideo: uploadedVideoUrl,
// //       },
// //     });

// //     res.status(200).json(updatedExercise);
// //   } catch (error) {
// //     console.error('Error updating exercise:', error);
// //     res.status(500).json({ error: 'Failed to update exercise' });
// //   }
// // });

// // // Export the handler to be used as an API endpoint
// // export default handler;











// // // import { NextApiRequest, NextApiResponse } from 'next';
// // // import prisma from '../../../../server/db/prismadb';
// // // import AWS from 'aws-sdk';
// // // import { v4 as uuidv4 } from 'uuid';
// // // import * as nextConnect from 'next-connect';
// // // import multer from 'multer';

// // // const s3 = new AWS.S3({
// // //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// // //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// // //   region: process.env.AWS_REGION,
// // // });

// // // // Set up multer for file uploads with a size limit (e.g., 10 MB)
// // // const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10 MB

// // // // Create an instance of nextConnect
// // // const handler = nextConnect.createRouter<NextApiRequest, NextApiResponse>();

// // // // Use multer middleware for handling file uploads
// // // handler.use(upload.fields([{ name: 'newPic' }, { name: 'newVideo' }]));

// // // handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
// // //   const { id } = req.query;

// // //   if (req.method === 'GET') {
// // //     try {
// // //       const exercise = await prisma.exercise.findFirst({
// // //         where: { id: String(id) },
// // //       });

// // //       if (!exercise) {
// // //         return res.status(404).json({ error: 'Exercise not found' });
// // //       }

// // //       res.status(200).json(exercise);
// // //     } catch (error) {
// // //       console.error('Error fetching exercise:', error);
// // //       res.status(500).json({ error: 'Failed to fetch exercise' });
// // //     }
// // //   } else if (req.method === 'PUT') {
// // //     try {
// // //       const { exName, exDesc, exPic, exVideo, newPic, newVideo } = req.body;

// // //       let uploadedPicUrl = exPic;  // Keep the existing URL if no new pic is uploaded
// // //       let uploadedVideoUrl = exVideo;  // Keep the existing URL if no new video is uploaded
// // //       const bucketName = process.env.AWS_S3_BUCKET_NAME || 'workoutprobucket';

// // //       // Handle new picture upload
// // //       if (newPic) {
// // //         const picParams = {
// // //           Bucket: bucketName,
// // //           Key: `images/${uuidv4()}.jpg`,
// // //           Body: Buffer.from(newPic, 'base64'),
// // //           ContentEncoding: 'base64',
// // //           ContentType: 'image/jpeg',
// // //         };
// // //         const picUploadResult = await s3.upload(picParams).promise();
// // //         uploadedPicUrl = picUploadResult.Location; // Update to the new URL
// // //       }

// // //       // Handle new video upload
// // //       if (newVideo) {
// // //         const videoParams = {
// // //           Bucket: bucketName,
// // //           Key: `videos/${uuidv4()}.mp4`,
// // //           Body: Buffer.from(newVideo, 'base64'),
// // //           ContentEncoding: 'base64',
// // //           ContentType: 'video/mp4',
// // //         };
// // //         const videoUploadResult = await s3.upload(videoParams).promise();
// // //         uploadedVideoUrl = videoUploadResult.Location; // Update to the new URL
// // //       }

// // //       // Update exercise in the database
// // //       const updatedExercise = await prisma.exercise.update({
// // //         where: { id: String(id) },
// // //         data: {
// // //           exName,
// // //           exDesc,
// // //           exPic: uploadedPicUrl,
// // //           exVideo: uploadedVideoUrl,
// // //         },
// // //       });

// // //       res.status(200).json(updatedExercise);
// // //     } catch (error) {
// // //       console.error('Error updating exercise:', error);
// // //       res.status(500).json({ error: 'Failed to update exercise' });
// // //     }
// // //   } else {
// // //     res.status(405).json({ error: 'Method not allowed' });
// // //   }
// // // });
