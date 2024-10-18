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

type Props = {
	trainingProgramData?: { results: ITrainingProgram[] };
	programsCategoryData?: { results: IProgramsCategory[] };
	session: Session;
};


const Dash2 = (props: Props) => {

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [bodyPartList, setBodyPartList] = useState([{}]);

	 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [programs, setExercises] = useState<ITrainingProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchExercises = async (categoryId: string) => {
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/get-training-programs-cat/${categoryId}`);
      const data = await response.json();
      
      setExercises(data.results);

    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set the first category as the default selected on component mount
  useEffect(() => {
    if (props.programsCategoryData && props.programsCategoryData?.results.length > 0) {
      const firstCategoryId = props.programsCategoryData.results[0].id;
      setSelectedCategory(firstCategoryId);
      fetchExercises(firstCategoryId); // Fetch programs for the first category
    }
  }, [props.programsCategoryData]);

  const handleTabClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchExercises(categoryId); // Fetch programs when tab is clicked
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


										{/* Scrollable Tabs */}
										<div className="flex overflow-x-auto space-x-4 bg-purple-200 p-4 rounded-lg mb-6">
											{props.programsCategoryData &&
											props.programsCategoryData.results.map((category) => (
												<button
												key={category.id}
												onClick={() => handleTabClick(category.id)}
												className={`py-2 px-4 rounded-md font-semibold ${
													selectedCategory === category.id
													? 'bg-purple-600 text-white'
													: 'bg-purple-100 text-gray-700'
												}`}
												>
												{category.pcName}
												</button>
											))}
										</div>

										{/* Exercise Grid */}
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
											{loading ? (
											<div>Loading programs...</div>
											) : programs.length > 0 ? (
											programs.map((item: ITrainingProgram, index: number) => (
												<a href={`/onlineclasses/${item.id}`} key={index} className="transform  hover:scale-105 transition duration-300 p-4 bg-white rounded-lg shadow-md w-full justify-evenly">
															{/* <img src={meal.image} alt={meal.title} className="rounded-lg mb-4 w-full lg:w-24 lg:h-24" /> */}
															<Image
																src={item.trainingImage?item.trainingImage : img}
																alt="calories"
																width={100}
																height={100}
																fill={false}
																loader={loaderProp}
																className="rounded-lg mb-4 w-full lg:h-24"
															/>
															<div className="text-lg font-semibold text-black min-h-[4rem]">{item.trainingName}</div>
															<div className="mb-4">
																<ul className="list-none text-xs">

																</ul>
															</div>
															<div className="flex justify-between mt-2 text-sm text-black">
																<div className="flex items-center text-xs">
																	<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
																		<path d="M10 2a6 6 0 00-6 6v4H2a2 2 0 000 4h16a2 2 0 000-4h-2V8a6 6 0 00-6-6zM8 14v-4a2 2 0 114 0v4H8z" />
																	</svg>
																	{item.trainingDay}
																</div>
																<div className="flex items-center text-black">
																	<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
																		<path d="M3.172 4.828a4 4 0 115.656 5.656L10 11.656l1.172-1.172a4 4 0 115.656-5.656l1.172 1.172a4 4 0 11-5.656 5.656L10 11.656l-1.172 1.172a4 4 0 11-5.656-5.656l1.172-1.172z" />
																	</svg>
																	{/* {meal.calories} */}
																	{/* {item.trainingTime} */}
																	{item.traingDuration}
																</div>
															</div>
														</a>
											))
											) : (
											<div>No programs available for this category</div>
											)}
										</div>
									</div>
									<div className="w-full md:w-1/4 text-black">
										<div className="p-4 bg-white rounded-lg shadow-md mb-6 md:mb-0">
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

	const session = await getSession(context);

	// const userEmail = session?.user?.email;

	let url = process.env.NEXT_PUBLIC_API_URL;

	const programsCategoryData = await fetch(url + `/get-programs-category`).then((res) => res.json());
	const trainingProgramData = await fetch(url + `/get-training-programs`).then((res) => res.json());

	return {
		props: {
			session,
			programsCategoryData,
			trainingProgramData
		},
	};
};
