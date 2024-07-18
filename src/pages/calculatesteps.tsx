// import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import React, { useState } from "react";
// import Normal from "./Normal";
// import Underweight from "./Underweight";
// import Overweight from "./Overweight";

import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
// import Normal from "./Normal";
// import Underweight from "./Underweight";
// import Overweight from "./Overweight";

type Props = {
	// detailsResult: IDetails;
	session: Session;
};

interface BMIValues {
	stepsCount: number;
	duration: number;
	distanceCovered: number;
}


const CalculateBmi = ({ session }: Props) => {

	const userId = session?.user?.id || "66683b24098666aa4e7ff0de";

	const [bmiValues, setBMIValues] = useState<BMIValues>({
		stepsCount: 0,
		duration: 0,
		distanceCovered: 0,
	});
	const [bmiResult, setBMIResult] = useState<number>(0);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setBMIValues({ ...bmiValues, [name]: +value });
	};

	const calculateBMI = () => {
		const { duration, distanceCovered } = bmiValues;
		if (duration > 0 && distanceCovered > 0) {
			{/* 
										1 km = 0.62 miles
										1 km = 3281.5 feet
										1.61 km	 = 1 mile
										17 min = 5280 feet
										2000 steps = 1 mile
										1 foot = 0.413 steps
										5280 feet = 2435 steps 
										17 min = 2435 steps
										1km = 11 min
										1km = 1400 steps
										11 min = 1400 steps
										distance = 
										3km * 1400 steps/km = 4200 steps
									*/}
			// const steps = 
			const steps = distanceCovered * 1400;
			setBMIValues({ ...bmiValues, stepsCount: steps });
			//   if (bmiResult < 18.5) {
			//     return alert(`your bmi is ${bmi} (Under Weight)`);
			//   }
			//   if (bmiResult > 18.5 && bmiResult <= 24.9) {
			//     return alert(`your bmi is ${bmi} (Normal)`);
			//   }
			//   if (bmiResult > 24.9 && bmiResult <= 29.9) {
			//     return alert(`yout bmi is ${bmi} (overweight)`);
			//   }
			//   if (bmiResult > 24.9 && bmiResult <= 39.9) {
			//     return alert(`your bmi is ${bmi} (Obese)`);
			//   } else {
			//     alert(`your bmi is ${bmi} (Morbidly obese)`);
			//   }
			uploadSteps(steps);
		}
	};


	const uploadSteps = async (bmiR: number) => {

		try {

			const body = {
				duration: bmiValues.duration.toString(),
				distanceCovered: bmiValues.distanceCovered.toString(),
				stepsCount: bmiR.toString(),
				userId: userId,
			}

			let updateBookingStatus = `${process.env.NEXT_PUBLIC_API_URL}/post-steps`;

			await fetch(updateBookingStatus, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

		} catch (error) {
			console.error(error);
		}
	};



	return (
		<>
			<UserLayout>
				<div className="flex flex-col  bg-gray-900 text-white w-full min-h-screen">
					<UserNav />
					<div className="container mx-auto">
						<div>
							<div className='bg-white min-h-screen dark:bg-gray-800 rounded-lg shadow-md p-20 mb-6 first-letter:'>
								<h2 className='text-2xl font-bold text-purple-500 dark:text-purple-300 mb-2 text-center'>
									Step Calculator
								</h2>
								<h2 className='text-black font-semibold'>
									1. Kilometer: A kilometer is 0.62 miles, which is also 3281.5 feet, or 1000 meters.<br />
									2. It takes 10 to 12 minutes to walk at a moderate pace.<br />
									3. Mile: A mile is 1.61 kilometers or 5280 feet.<br />
									4. It takes 15 to 20 minutes to walk 1 mile / 1.61 KM / 5280 feet at a moderate pace.
									5. It takes over 2000 steps to walk one mile. 1 foot is approximately equal to 0.413 steps.
								</h2>
								<div
									className='w-2/3 mx-auto flex flex-col justify-center items-center text-center'
								>
									<label
										htmlFor='height'
										className='block text-sm text-gray-500 dark:text-gray-300 my-4'>
										Duration of the walk/run in minutes
									</label>

									<input
										type='text'
										placeholder='0'
										name='duration'
										value={bmiValues.duration}
										onChange={handleInputChange}
										className=' bg-purple-200 rounded-sm border-none focus-none focus:ring-0 focus:border-transparent text-center'
									/>
									<label
										htmlFor='weight'
										className='block text-sm text-gray-500 dark:text-gray-300 my-4'>
										Distance Covered in kilometers
									</label>

									<input
										type='text'
										placeholder='0'
										name='distanceCovered'
										value={bmiValues.distanceCovered}
										onChange={handleInputChange}
										className=' bg-purple-200 rounded-sm border-none focus-none focus:ring-0 focus:border-transparent text-center'
									/>
									<button
										onClick={calculateBMI}
										className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-4'
									>
										Calculate Steps
									</button>
								</div>
								<p
									className='text-2xl font-bold text-black dark:text-purple-300 font-mono text-center my-4'
								>
									Your Steps Count : {bmiValues.stepsCount.toFixed(2)}
								</p>
							</div>
						</div>
						<div className='mt-8 bg-slate-300 '>
							{/* {bmiResult > 10 && bmiResult < 18.5 && <Underweight />}
				{bmiResult > 18.5 && bmiResult <= 24.9 && <Normal />}
				{bmiResult > 24.9 && bmiResult <= 39.9 && <Overweight />} */}
						</div>
					</div>
				</div>
			</UserLayout>
		</>
	);
};

export default CalculateBmi;




export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { hotelId } = context.query;
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/signin",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
};