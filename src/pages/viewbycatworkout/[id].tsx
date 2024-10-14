import AddExerciseSchedule from "@/components/AddExerciseSchedule";
import RightSide from "@/components/RightSide";
import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import UserSide from "@/components/UserSide";
import { ChartPieIcon, CalendarDaysIcon, UserCircleIcon, WrenchIcon, ChatBubbleLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Console } from "console";
import {Suspense, useEffect} from "react";
// import Chart from "react-apexcharts";
 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { IDailyPlan, IExercise, IExerciseCategory } from "@/types/typings";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Card from "@/components/Card";
import ExerciseCard from "@/components/ExerciseCard";


type Props = {
    exercisesData?: IExercise[];
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
      <UserNav/>
        <div className="container mx-auto">
			<div className="w-full h-full">
				<div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
				{/* Background decorative circles */}
				<div className="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
					<svg
					viewBox="0 0 88 88"
					className="w-full max-w-screen-xl text-indigo-100">
					<circle fill="currentColor" cx="44" cy="44" r="15.5" />
					<circle fillOpacity="0.2" fill="currentColor" cx="44" cy="44" r="44" />
					<circle fillOpacity="0.2" fill="currentColor" cx="44" cy="44" r="37.5" />
					<circle fillOpacity="0.3" fill="currentColor" cx="44" cy="44" r="29.5" />
					<circle fillOpacity="0.3" fill="currentColor" cx="44" cy="44" r="22.5" />
					</svg>
				</div>

				{/* Exercise Cards */}
				{!loading ? (
					<div className="relative grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					{props.exercisesData &&
						props.exercisesData.map((item) => (
						<ExerciseCard
							{...item}
							key={item.id}
							className="p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
						/>
						))}
					</div>
				) : (
					<div className="flex justify-center items-center h-96">
						<div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-indigo-500 border-t-transparent"></div>
					</div>
					//<SkeletonLoader arrLength={8} />
				)}
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
  
    const exercisesData =  await fetch(url+`/get-exercise-by-cat/${id}`).then( (res) => res.json() );

    return {
      props: {
        session,
        exercisesData : exercisesData.results,
      },
    };
  };
