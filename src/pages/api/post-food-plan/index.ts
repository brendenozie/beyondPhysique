import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { fp_name,
    fp_description,
    fp_period,
    fp_day,
    fp_time,
    foodPlanCategoryId,
    fp_ingredients,
    fp_prep_time,
    fp_cook_time,
    fp_nutriton,
    fp_recipe,
    status
  } = req.body;

  console.log(req.body);
  // const session = await getSession({ req });
  const result = await prisma.foodPlan.create({
    data: {
      fp_name,
      fp_description,
      fp_period,
      fp_day,
      fp_time,
      fp_prep_time,
      fp_cook_time,
      foodPlanCategoryId,
      fp_ingredients,
      fp_nutriton,
      fp_recipe,
      status
    },
  });
  res.json(result);
}