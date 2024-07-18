import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from "../../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  // if (!session.isAdmin) {
  //   return res.status(401).end()
  // }
  if (req.method === 'GET') {
    await GetExercise(req, res)
    return;
  }
  if (req.method === 'DELETE') {
    await deleteExercise(req, res)
    return;
  }
  if (req.method === 'PUT') {
    await updateExercise(req, res)
    return;
  }

  else {
    res.status(404).end()
    return;
  }
}

async function GetExercise(req: NextApiRequest, res: NextApiResponse) {
  const exerciseId = req.query.id as string

  try {

    const training = await prisma.trainingProgram.findFirst({
      where: { id: exerciseId },
    });

    if (!training) {
      res.status(404).json({ error: 'Training not found' });
      return;
    }

    const [trainers, exercises] = await Promise.all([
      prisma.user.findMany({
        where: {
          id: { in: training.trainer },
        },
      }),
      prisma.exercise.findMany({
        where: {
          id: { in: training.exercises },
        },
      }),
    ]);

    return res.status(200).json({
      InfoResponse: {
        count: 1,
        next: "2",
        pages: 10,
        prev: "0"
      },
      results: { ...training, trainer: trainers, exercises: exercises }
    })
  } catch (e) {
    res.status(500)
  }
}

async function deleteExercise(req: NextApiRequest, res: NextApiResponse) {
  const amaId = req.query.id as string
  try {
    const ama = await prisma.trainingProgram.delete({
      where: {
        id: amaId,
      },
    })
    return res.status(204).json({ id: ama.id })
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

async function updateExercise(req: NextApiRequest, res: NextApiResponse) {

  const {
    id,
    exerciseName,
    publicId,
    url,
    status,
  } = req.body;

  const session = await getSession({ req });
  try {

    const result = await prisma.trainingProgram.update({
      where: {
        id: id,
      },
      data: {
        // exName: exerciseName,
        // publicId,
        // url,
        // status,
      },
    });
    return res.json(result);

  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
}
