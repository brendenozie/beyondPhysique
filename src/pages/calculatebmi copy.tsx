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

type Props = {
	// detailsResult: IDetails;
	session: Session;
};

interface BMIValues {
	height: number;
	weight: number;
}

const CalculateBmi = ({ session }: Props) => {
	const userId = session?.user?.id || "66683b24098666aa4e7ff0de";

	const [bmiValues, setBMIValues] = useState<BMIValues>({
		height: 0,
		weight: 0,
	});
	const [bmiResult, setBMIResult] = useState<number>(0);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setBMIValues({ ...bmiValues, [name]: +value });
	};

	const calculateBMI = () => {
		const { height, weight } = bmiValues;
		if (height > 0 && weight > 0) {
			const bmi = weight / (height / 100) ** 2;
			setBMIResult(bmi);
			uploadBMI(bmi);
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
		}
	};


	const uploadBMI = async (bmiR: Number) => {
		// const { height, weight } = bmiValues;
		try {

			const body = {
				height: bmiValues.height.toString(),
				weight: bmiValues.weight.toString(),
				bmi: bmiR.toString(),
				userId: userId,
			}

			let updateBookingStatus = `${process.env.NEXT_PUBLIC_API_URL}/post-bmi`;

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
								<h2
									className='text-2xl font-bold text-purple-500 dark:text-purple-300 mb-2 text-center'>
									BMI Calculator
								</h2>
								<p className='font-normal text-gray-500 mr-2'>
									BMI stands for Body Mass Index, which is a measure of
									body fat based on a person's weight and height. BMI is a
									widely used method to assess whether a person has a
									healthy body weight, with a BMI of 18.5 to 24.9
									considered healthy, while a BMI of 25 to 29.9 is
									classified as overweight, and a BMI of 30 or higher is
									considered obese.
								</p>
								<h1 className='font-normal text-gray-800'>
									<span className='font-bold uppercase text-black'>How to calculate Body Mass Index.</span><br />
									1. Body Mass Index is a simple calculation using a person's height and weight.<br />
									2.The formula is BMI = kg/m2 where kg is a person's weight in kilograms and m2 is their height in metres squared.<br />
									A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9.
								</h1>
								<div className='w-2/3 mx-auto flex flex-col justify-center items-center'>
									<label
										htmlFor='height'
										className='block text-sm text-gray-500 my-4'>
										Height
									</label>

									<input
										type='text'
										placeholder='0'
										name='height'
										value={bmiValues.height}
										onChange={handleInputChange}
										className=' bg-purple-200 rounded-sm border-none focus-none focus:ring-0 focus:border-transparent text-center'
									/>
									<label
										htmlFor='weight'
										className='block text-sm text-gray-500 dark:text-gray-300 my-4'>
										Weight
									</label>

									<input
										type='text'
										placeholder='0'
										name='weight'
										value={bmiValues.weight}
										onChange={handleInputChange}
										className=' bg-purple-200 rounded-sm border-none focus-none focus:ring-0 focus:border-transparent text-center'
									/>
									<button
										onClick={calculateBMI}
										className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-4'
									>
										Calculate
									</button>
								</div>
								<p
									className='text-2xl font-bold text-black dark:text-purple-300 font-mono text-center my-4'
								>
									Your BMI : {bmiResult.toFixed(2)}
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

	// const detailsResult = await getHotelDetails(hotelId).catch(console.error);

	return {
		props: {
			// detailsResult,
			session,
		},
	};
};