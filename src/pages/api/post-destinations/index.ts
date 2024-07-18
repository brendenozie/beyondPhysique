import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";
import { UploadApiResponse,  } from "cloudinary";
import cloudinary from "@/server/cloudinary";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
// export async function uploadToCloudinary(
//   blob: Blob,
//   folder: string,
//   timestamp: string | Blob,
//   signature: string
// ): Promise<UploadApiResponse> {
//   const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`
//   const formData = new FormData()

//   formData.append('file', blob)
//   formData.append('folder', folder)
//   formData.append('signature', signature)
//   formData.append('timestamp', timestamp)
//   // formData.append('api_key', process.env.CLOUDINARY_API_KEY)
//   // formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
//   // If recorded on Chrome which currently only supports .webm recording
//   // This parameter will tell cloudinary to transform to mp4 for cross browser compatibility
//   formData.append('format', 'mp4')

//   const response = await fetch(url, {
//     method: 'POST',
//     body: formData,
//   })

//   if (!response.ok) {
//     throw new Error(response.statusText)
//   }

//   return response.json()
// }

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    title,
    description,
    img,
    lat,
    location,
    long,
    price,
    offer,
    offerPrice,
    cityId
  } = req.body;

  const session = await getSession({ req });
  const result = await prisma.destination.create({
    data: {
      title,
      description,
      img: {
          createMany: {
            data: img,
          },
        },
      lat,
      location,
      long,
      price,
      offer,
      offerPrice,
      userEmail: session?.user?.email!,
      cityId,
    },
  });
  res.json(result);
}