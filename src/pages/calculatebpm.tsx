// import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import React, { useState } from "react";

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


interface BPMValues {
	beats: number;
}

const CalculateBpm = ({ session }: Props) => {

	const userId = session?.user?.id || "66683b24098666aa4e7ff0de";
	const [bpmValues, setBPMValues] = useState<BPMValues>({
		beats: 0,
	});
	const [bmiResult, setBPMResult] = useState<number>(0);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setBPMValues({ ...bpmValues, [name]: +value });
	};

	const calculateBMI = () => {
		const { beats } = bpmValues;
		if (beats > 0) {
			const bmi = beats * 4;
			setBPMResult(bmi);
			uploadBPM(bmi);
		}
	};

	const uploadBPM = async (bmiR: Number) => {

		try {

			const body = {
				beats: bpmValues.beats.toString(),
				bpmResult: bmiR.toString(),
				userId: userId,
			}

			let updateBookingStatus = `${process.env.NEXT_PUBLIC_API_URL}/post-bpm`;

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
				<div className="flex flex-col  bg-gray-900  w-full min-h-screen">
					<UserNav />
					<div className="container mx-auto text-black">
    <div className="animate-fadeIn">
        <div className='bg-white min-h-screen dark:bg-gray-800 rounded-lg shadow-lg p-10 mb-6 transition-transform transform hover:scale-105'>
            <h2 className='text-4xl font-bold text-purple-600 mb-4 text-center'>
                Heart Rate Calculator
            </h2>
            <div className="text-left mb-6">
                <h1 className='text-lg font-semibold mb-3'>
                    1. **Find Your Pulse**<br />
                    Gently place your index and middle fingers on the inside of your wrist, just below your thumb, or on the side of your neck, just below your jawbone.
                </h1>
                <h1 className='text-lg font-semibold mb-3'>
                    2. **Count Your Beats**<br />
                    Use a stopwatch or timer to count the number of beats you feel for 15 seconds.
                </h1>
                <h1 className='text-lg font-semibold mb-3'>
                    3. **Calculate Your Heart Rate**<br />
                    Multiply the number of beats you counted by 4 to get your heart rate in beats per minute (BPM).
                </h1>
            </div>
            <div className='w-2/3 mx-auto flex flex-col justify-center items-center'>
                <label htmlFor='beats' className='block text-lg text-gray-600 dark:text-gray-300 my-4'>
                    Enter the number of beats you counted in 15 seconds:
                </label>
                <input
                    type='text'
                    placeholder='0'
                    name='beats'
                    value={bpmValues.beats}
                    onChange={handleInputChange}
                    className='bg-purple-200 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-center py-2 transition-transform transform hover:scale-105'
                />
                <button
                    onClick={calculateBMI}
                    className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded my-4 transition duration-300 transform hover:scale-105'
                >
                    Calculate
                </button>
            </div>
            <p className='text-2xl font-bold text-black dark:text-purple-300 font-mono text-center my-6'>
                Your BPM: <span className='text-purple-500'>{bmiResult.toFixed(2)}</span>
            </p>
        </div>
    </div>
    <div className='mt-8 bg-slate-300'>
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

export default CalculateBpm;


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