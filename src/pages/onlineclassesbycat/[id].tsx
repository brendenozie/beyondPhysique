import AddExerciseSchedule from "@/components/AddExerciseSchedule";
import RightSide from "@/components/RightSide";
import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import UserSide from "@/components/UserSide";
import { ChartPieIcon, CalendarDaysIcon, UserCircleIcon, WrenchIcon, ChatBubbleLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Console } from "console";
import { Suspense, useEffect } from "react";
// import Chart from "react-apexcharts";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { IDailyPlan, IExercise, IExerciseCategory, IProgramsCategory, ITrainingProgram } from "@/types/typings";

import Image from "next/image";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Card from "@/components/Card";

import img from "../../assets/sleep.png";


const loaderProp = ({ src }: any) => {
	return src;
}

const meals = [
	{
		title: 'Red Bread & Jam',
		time: '4m',
		calories: '250cal',
		image: 'path_to_image_1', // Replace with actual image paths or URLs
	},
	{
		title: 'Grilled Chicken',
		time: '6m',
		calories: '250cal',
		image: 'path_to_image_2',
	},
	{
		title: 'Cashew Nut Salad',
		time: '6m',
		calories: '250cal',
		image: 'path_to_image_3',
	},
];

const shoppingList = [
	{ item: 'Eggs', quantity: '2 dozens' },
	{ item: 'Chicken breast', quantity: '1.5kg' },
	{ item: 'Cheese', quantity: '500gm' },
	{ item: 'Milk', quantity: '5ltr' },
	{ item: 'Chocolate', quantity: '2 pc' },
	{ item: 'Bread', quantity: '4pc' },
	{ item: 'Potatoes', quantity: '3kg' },
];

type Props = {
	exercisesData?: { results: IExercise[] };
	dailyPlanData?: { results: IDailyPlan[] };
	programsCategoryData?: { results: IProgramsCategory[] };
	trainingProgramData?: { results: ITrainingProgram[] };
	session: Session;
};


const Dash2 = (props: Props) => {

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [bodyPartList, setBodyPartList] = useState([{}]);
	const [loading, setLoading] = useState(false);


	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<UserLayout>
			<div className="flex flex-col min-h-screen bg-gray-900 text-white w-full">
				<UserNav />
				<div className="container mx-auto">

					<div className="container mx-auto">
						<div className="flex flex-wrap items-center">
							<div className="min-h-screen bg-gray-100 p-8">
								<div className="max-w-7xl mx-auto flex flex-col md:flex-row">
									<div className="w-full md:w-3/4 mb-8 md:mb-0 mr-4">
										<div className="p-6 bg-orange-400 rounded-lg shadow-md text-white mb-6">
											<div className="text-2xl md:text-3xl font-bold mb-4">Build up your Ideal Body</div>
											<div className="text-lg md:text-xl mb-4">
												With our specialized classes, let us help you build up your ideal body.
											</div>
											<button className="bg-white text-orange-400 px-4 py-2 rounded-lg font-semibold">
												Get started
											</button>
										</div>

										<div className=" py-4 md:py-7 w-full ">
											<div className="flex flex-col md:flex-row items-center justify-between">
												<p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-900 uppercase">Online Classes</p>
											</div>
										</div>

										<div className="relative grid gap-5 sm:grid-cols-1 lg:grid-cols-5 mt-4 text-black">
											{props.trainingProgramData &&
												props.trainingProgramData.results.map((item: ITrainingProgram, index: number) => (
													(index === 0) ? (
														<a href={`/onlineclasses/${item.id}`} className="transform  hover:scale-105 transition duration-300 p-4 bg-white rounded-lg col-span-2 shadow-md w-full ">
															<Image
																src={img}
																alt="calories"
																fill={false}
																loader={loaderProp}
																className="rounded-lg mb-4 w-full lg:h-24"
															/>
															<div className="flex flex-col mb-4">
																<div className="text-xl font-semibold">{item.trainingName}</div>
																<div className="text-sm text-gray-500">{item.trainingDay} {item.trainingTime} </div>
															</div>
															<div className="mb-4">
																<ul className="list-none">

																</ul>
															</div>
															<div className="flex justify-between">
																<div className="flex items-center">
																	<svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
																		<path d="M10 2a6 6 0 00-6 6v4H2a2 2 0 000 4h16a2 2 0 000-4h-2V8a6 6 0 00-6-6zM8 14v-4a2 2 0 114 0v4H8z" />
																	</svg>
																	<span className="ml-2">{item.traingDuration}</span>
																</div>
																<div className="flex items-center">
																	<svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
																		<path d="M3.172 4.828a4 4 0 115.656 5.656L10 11.656l1.172-1.172a4 4 0 115.656-5.656l1.172 1.172a4 4 0 11-5.656 5.656L10 11.656l-1.172 1.172a4 4 0 11-5.656-5.656l1.172-1.172z" />
																	</svg>
																	<span className="ml-2">11k</span>
																</div>
															</div>
														</a>
													) : (
														<a href={`/onlineclasses/${item.id}`} key={index} className="transform  hover:scale-105 transition duration-300 p-4 bg-white rounded-lg shadow-md w-full">
															{/* <img src={meal.image} alt={meal.title} className="rounded-lg mb-4 w-full lg:w-24 lg:h-24" /> */}
															<Image
																src={img}
																alt="calories"
																fill={false}
																loader={loaderProp}
																className="rounded-lg mb-4 w-full lg:h-24"
															/>
															<div className="text-lg font-semibold min-h-[4rem]">{item.trainingName}</div>
															<div className="my-4">
																<ul className="list-none">

																</ul>
															</div>
															<div className="flex justify-between mt-2 text-sm text-gray-500">
																<div className="flex items-center text-xs">
																	<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
																		<path d="M10 2a6 6 0 00-6 6v4H2a2 2 0 000 4h16a2 2 0 000-4h-2V8a6 6 0 00-6-6zM8 14v-4a2 2 0 114 0v4H8z" />
																	</svg>
																	{item.trainingDay}
																</div>
																<div className="flex items-center">
																	<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
																		<path d="M3.172 4.828a4 4 0 115.656 5.656L10 11.656l1.172-1.172a4 4 0 115.656-5.656l1.172 1.172a4 4 0 11-5.656 5.656L10 11.656l-1.172 1.172a4 4 0 11-5.656-5.656l1.172-1.172z" />
																	</svg>
																	{/* {meal.calories} */}
																	{/* {item.trainingTime} */}
																	{item.traingDuration}
																</div>
															</div>
														</a>
													)
												))}
										</div>
									</div>
									<div className="w-full md:w-1/4 text-black">
										<div className="p-4 bg-white rounded-lg shadow-md mb-6 md:mb-0">
											{/* <div className="mb-6">
                                            <div className="mb-4 flex flex-row items-center justify-between">
                                                <p className="text-xl font-semibold ">Shopping List</p>
                                                <button className=" bg-orange-400 text-white px-4 py-2 rounded-lg "><i>
                                                    <svg className="fill-current w-3 h-3 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z" />
                                                    </svg>
                                                </i>
                                                    <span className="ml-2">Add</span>
                                                </button>
                                            </div>
                                            <ul className="list-none p-0">
                                                {shoppingList.map((item, index) => (
                                                    <li key={index} className="flex justify-between mb-2">
                                                        <span>{item.item}</span>
                                                        <span>{item.quantity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="mt-4 bg-orange-400 text-white px-4 py-2 rounded-lg w-full">
                                                Shop now
                                            </button>
                                        </div> */}
											<div>
												<div className="text-xl font-semibold mb-4 ">Classes Offered</div>
												{props.programsCategoryData &&
													props.programsCategoryData.results.map((item: IProgramsCategory, index: number) => (
														<Link href={`/onlineclassesbycat/${item.id}`}>
															<div className={`${index % 2 === 0 ? " bg-sky-900" : "bg-orange-500 "} rounded-lg p-4 my-4 text-white transform  hover:scale-105 transition duration-300 `}>
																<div className="font-bold text-lg mb-2">{item.pcName}</div>
																<div className="text-md mb-4 overflow-clip">{item.pcDesc}.</div>
																{/* <div className="bg-white text-orange-400 rounded-lg p-2 text-center font-semibold">Order now</div> */}
															</div>
														</Link>
													))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</UserLayout>
	);
};

export default Dash2;

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {

	const { id, } = context.query;

	const session = await getSession(context);

	// const userEmail = session?.user?.email;

	let url = process.env.NEXT_PUBLIC_API_URL;

	const programsCategoryData = await fetch(url + `/get-programs-category`).then((res) => res.json());
	const trainingProgramData = await fetch(url + `/get-training-programs-cat/${id}`).then((res) => res.json());

	return {
		props: {
			programsCategoryData,
			trainingProgramData
		},
	};
};
