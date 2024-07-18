// import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import React, { useEffect, useState } from "react";
// import Normal from "./Normal";
// import Underweight from "./Underweight";
// import Overweight from "./Overweight";

import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { start } from "repl";
// import Normal from "./Normal";
// import Underweight from "./Underweight";
// import Overweight from "./Overweight";

type Props = {
	// detailsResult: IDetails;
	session: Session;
};

function getYesterDate() {
	const today = new Date();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	const date = today.getDate() - 1;

	return `${month}/${date}/${year}`;
}

function getTodayDate() {
	const today = new Date();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	const date = today.getDate();

	return `${month}/${date}/${year}`;
}

interface BMIValues {
	height: number;
	weight: number;
}

const CalculateSleep = ({ session }: Props) => {

	const userId = session?.user?.id || "66683b24098666aa4e7ff0de";

	const [bmiValues, setBMIValues] = useState<BMIValues>({
		height: 0,
		weight: 0,
	});
	const [bmiResult, setBMIResult] = useState<number>(0);

	const [currentDate, setCurrentDate] = useState(getTodayDate());
	const [yesterDayDate, setYesterDayDate] = useState(getYesterDate());

	const [durationTime, setSelectedDurationTime] = useState<any>("0:00");

	const [startTime, setSelectedStartTime] = useState<any>("1:00");
	const [startTimeHr, setSelectedStartTimeHr] = useState<any>("1");
	const [startTimeMin, setSelectedStartTimeMin] = useState<any>("00");
	const [startTimePeriod, setSelectedStartTimePeriod] = useState<any>("AM");

	const [stopTime, setSelectedStopTime] = useState<any>("1:00");
	const [stopTimeHr, setSelectedStopTimeHr] = useState<any>("1");
	const [stopTimeMin, setSelectedStopTimeMin] = useState<any>("00");
	const [stopTimePeriod, setSelectedStopTimePeriod] = useState<any>("AM");

	useEffect(() => {

		let startDate = getYesterDate() + " " + startTimeHr + ":" + startTimeMin + " " + startTimePeriod;
		setSelectedStartTime(startDate);

	}, [startTimeHr, startTimeMin, startTimePeriod]);


	useEffect(() => {

		let endDate = getTodayDate() + " " + stopTimeHr + ":" + stopTimeMin + " " + stopTimePeriod;
		setSelectedStopTime(endDate);

	}, [stopTimeHr, stopTimeMin, stopTimePeriod]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setBMIValues({ ...bmiValues, [name]: +value });
	};

	const calculateHours = () => {

		let startDate = getYesterDate() + " " + startTimeHr + ":" + startTimeMin + " " + startTimePeriod;
		let endDate = getTodayDate() + " " + stopTimeHr + ":" + stopTimeMin + " " + stopTimePeriod;

		let starting = new Date(startDate).getTime();
		let ending = new Date(endDate).getTime();

		let diffInMs = ending - starting;

		let diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
		let diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

		setSelectedStartTime(startDate);
		setSelectedStopTime(endDate);

		setSelectedDurationTime(`${diffInHours}:${diffInMinutes}`);

		uploadSleep(startDate, endDate, `${diffInHours}:${diffInMinutes}`)

	};


	const uploadSleep = async (startDate: String, endDate: String, hrs: String) => {

		try {

			const body = {
				slDuration: hrs,
				slStartTime: startDate,
				slEndTime: endDate,
				status: "",
				userId,
			}

			let updateBookingStatus = `${process.env.NEXT_PUBLIC_API_URL}/post-sleep`;

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
							<div className='flex min-h-screen rounded-lg shadow-md p-20 mb-6 first-letter:'>
								<div className="w-1/3">
									<h2 className='text-2xl font-bold text-purple-500 dark:text-purple-300 mb-2 text-center'>
										Sleep Calculator
									</h2>
									<h2 className="font-semibold">
										The average sleep cycle is 90 minutes long.<br /><br />
										A typical night of sleep includes 5 full sleep cycles.<br />
										90 x 5 = 450 minutes, or 7.5 hours.<br />
										Starting at your wake time, work back 7.5 hours to find your bedtime.
									</h2><br />
									<div className="flex flex-col font-semibold">
										<div className="flex flex-row text-xl">Age Group	Recommended Hours of Sleep Per Day</div>
										<div className="flex flex-row">0-3 months	14-17 hours</div>
										<div className="flex flex-row">4-12 months	12-16 hours per 24 hours (including naps)</div>
										<div className="flex flex-row">1-2 years	11-14 hours per 24 hours (including naps)</div>
										<div className="flex flex-row">3-5 years	10-13 hours per 24 hours (including naps)</div>
										<div className="flex flex-row">6-12 years	9-12 hours per 24 hours</div>
										<div className="flex flex-row">13-18 years	8-10 hours per 24 hours</div>
										<div className="flex flex-row">18-60 years	7 or more hours per night</div>
										<div className="flex flex-row">61-64 years	7-9 hours</div>
										<div className="flex flex-row">65 years and older	7-8 hours</div>
									</div>
								</div>
								<div className='w-2/3 mx-auto flex flex-col justify-center items-center'>
									<h2 className="font-semibold">
										It is assumed that you went to sleep on {yesterDayDate}
									</h2><br />
									<label
										htmlFor='height'
										className='block text-sm text-gray-500 dark:text-gray-300 my-4'>
										Slept At:
									</label>

									<div className="flex flex-col">
										<label className="leading-loose">Set Time</label>
										<div className="relative focus-within:text-gray-600 text-gray-400">
											<div className="mt-0 p-5 w-40 bg-white rounded-lg shadow-xl">
												<div className="flex">
													<select name="hours" className="bg-transparent text-xl appearance-none outline-none" onChange={(e) => { setSelectedStartTimeHr(e.target.value) }}>
														<option value="1">1</option>
														<option value="2">2</option>
														<option value="3">3</option>
														<option value="4">4</option>
														<option value="5">5</option>
														<option value="6">6</option>
														<option value="7">7</option>
														<option value="8">8</option>
														<option value="9">9</option>
														<option value="10">10</option>
														<option value="11">11</option>
														<option value="12">12</option>
													</select>
													<span className="text-xl mr-3">:</span>
													<select name="minutes" className="bg-transparent text-xl appearance-none outline-none mr-4" onChange={(e) => { setSelectedStartTimeMin(e.target.value) }}>
														<option value="0">00</option>
														<option value="30">30</option>
													</select>
													<select name="ampm" className="bg-transparent text-xl appearance-none outline-none" onChange={(e) => { setSelectedStartTimePeriod(e.target.value) }}>
														<option value="am">AM</option>
														<option value="pm">PM</option>
													</select>
												</div>
												<p className='text-xs font-bold font-mono text-center my-4'>
													<br />
													{startTime}
													<br />
												</p>

											</div>
										</div>
									</div>
									<label
										htmlFor='height'
										className='block text-sm text-gray-500 dark:text-gray-300 my-4'>
										Woke Up At:
									</label>

									<div className="flex flex-col">
										<label className="leading-loose">Set Time</label>
										<div className="relative focus-within:text-gray-600 text-gray-400">
											<div className="mt-0 p-5 w-40 bg-white rounded-lg shadow-xl">
												<div className="flex">
													<select name="hours" className="bg-transparent text-xl appearance-none outline-none" onChange={(e) => { setSelectedStopTimeHr(e.target.value) }}>
														<option value="1">1</option>
														<option value="2">2</option>
														<option value="3">3</option>
														<option value="4">4</option>
														<option value="5">5</option>
														<option value="6">6</option>
														<option value="7">7</option>
														<option value="8">8</option>
														<option value="9">9</option>
														<option value="10">10</option>
														<option value="11">11</option>
														<option value="12">12</option>
													</select>
													<span className="text-xl mr-3">:</span>
													<select name="minutes" className="bg-transparent text-xl appearance-none outline-none mr-4" onChange={(e) => { setSelectedStopTimeMin(e.target.value) }}>
														<option value="0">00</option>
														<option value="30">30</option>
													</select>
													<select name="ampm" className="bg-transparent text-xl appearance-none outline-none" onChange={(e) => { setSelectedStopTimePeriod(e.target.value) }}>
														<option value="am">AM</option>
														<option value="pm">PM</option>
													</select>
												</div>
												<p className='text-xs font-bold font-mono text-center my-4'>
													<br />
													{stopTime}
												</p>

											</div>
										</div>
									</div>

									<button onClick={calculateHours} className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-4'>
										Calculate Duration Slept
									</button>

									<label
										htmlFor='weight'
										className='block text-sm text-gray-500 dark:text-gray-300 my-4'>
										Duration slept
									</label>

									<p className='text-2xl font-bold text-white font-mono text-center my-4'>
										Hr {durationTime} Minutes
									</p>

								</div>
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

export default CalculateSleep;


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