import AddExerciseSchedule from "@/components/AddExerciseSchedule";
import RightSide from "@/components/RightSide";
import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import UserSide from "@/components/UserSide";
import { ChartPieIcon, CalendarDaysIcon, UserCircleIcon, WrenchIcon, ChatBubbleLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Console } from "console";
import {Suspense} from "react";
// import Chart from "react-apexcharts";
 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { IDailyPlan, IExercise } from "@/types/typings";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";


type Props = {
    exercisesData?: {results:IExercise[]};
    dailyPlanData?: IDailyPlan;
    alldailyPlanData?: {results:IDailyPlan[]};
    session: Session;
    // stylesData: {results:ITravelStyle[]};
    // getInspiredCities: ICity[];
  };


const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const filterPlansByWeek = (plans: IDailyPlan[]) => {
  // Sort the plans by the day order
  return plans.sort((a, b) => {
    return dayOrder.indexOf(a.dpDay) - dayOrder.indexOf(b.dpDay);
  });
};

const Dash2 = (props: Props) => {

const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filter and sort daily plans
  const weeklyPlans = props.alldailyPlanData?.results
    ? filterPlansByWeek(props.alldailyPlanData.results)
    : [];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <UserLayout>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white lg:w-full">
      <UserNav/>
        <div className="container mx-auto">
            
        <div className="flex flex-wrap">
            <div className="px-4 mx-4  md:px-10 py-4 md:py-7 w-full">
                <div className="flex items-center justify-between">
                    <p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-500">My Exercise Schedule</p>
                                         
                    <Link href="?modal=true">
                        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                            <p className="text-sm font-medium leading-none text-white">Add Exercise </p>
                        </button>
                    </Link>
                </div>
            </div>            
          </div>
        
          <div className="flex flex-wrap items-center">
            <div className="flex w-full items-center justify-center py-8 px-4">
                <div className="flex flex-wrap w-full shadow-lg">               
                    <div className="w-full md:w-12/12">
                        <div className="flex flex-wrap w-full shadow-lg justify-center">
                            <div className="w-full md:py-8 py-5 md:px-16 px-5 rounded-b">
                                {/* Training Classes */}
                                    <div className="mt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="py-1 font-semibold text-white text-lg">Today's Plan</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                            {props.dailyPlanData && props.dailyPlanData?.exercises.map((item: IExercise) => (                                
                                                <div className="bg-white backdrop-blur-lg p-6 rounded-xl shadow-xl flex flex-col sm:flex-row items-center sm:items-start sm:justify-between space-y-4 sm:space-y-0 sm:space-x-6 transition-transform duration-300 hover:scale-105">
                                                    {/* Icon or Image */}
                                                    <div className="bg-gray-100 rounded-full p-4 flex-shrink-0 shadow-md">
                                                    <svg 
                                                        fill="currentColor" 
                                                        height="32px" 
                                                        width="32px" 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 64 64" 
                                                        className="h-8 w-8 text-orange-500">
                                                        <g id="Play">
                                                        <path d="M46.0136986,31.1054993L25.1973,20.6973c-0.3096008-0.1532993-0.6777992-0.1387005-0.9727001,0.0438995
                                                            C23.9297009,20.9237995,23.75,21.2451,23.75,21.5918007v20.8163986c0,0.3467026,0.1797009,0.6679993,0.4745998,0.8506012
                                                            C24.3848,43.3583984,24.5674,43.4081993,24.75,43.4081993c0.1532993,0,0.3057003-0.035099,0.4473-0.1054001l20.8163986-10.4081993
                                                            c0.3388023-0.1699982,0.5527-0.5157013,0.5527-0.8945999C46.5663986,31.6210995,46.3525009,31.2754002,46.0136986,31.1054993z
                                                            M25.75,40.7901001v-17.580101L43.330101,32L25.75,40.7901001z"/>
                                                        <path d="M32,0C14.3268995,0,0,14.3268995,0,32s14.3268995,32,32,32s32-14.3269005,32-32S49.6730995,0,32,0z M32,62
                                                            C15.4579,62,2,48.542099,2,32C2,15.4580002,15.4579,2,32,2c16.5419998,0,30,13.4580002,30,30C62,48.542099,48.5419998,62,32,62z"/>
                                                        </g>
                                                    </svg>
                                                    </div>
                                                    {/* Exercise Info */}
                                                    <div className="flex-grow space-y-2 text-center sm:text-left gap-2">
                                                    <h4 className="font-bold text-xl text-gray-800 h-14">{item.exName}</h4>
                                                    <p className="text-gray-600 text-sm">
                                                        {props.dailyPlanData?.dpDay} {props.dailyPlanData?.dpTime}
                                                    </p>
                                                    {/* View Workout Button */}
                                                    <Link href={`/viewworkout/${item.id}`}>
                                                        <button className="flex items-center justify-center w-full mt-4 gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg transform hover:scale-110">
                                                        <svg 
                                                            fill="currentColor" 
                                                            height="24px" 
                                                            width="24px" 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            viewBox="0 0 64 64" 
                                                            className="h-6 w-6 animate-pulse">
                                                            <g id="Play">
                                                            <path d="M46.0136986,31.1054993L25.1973,20.6973c-0.3096008-0.1532993-0.6777992-0.1387005-0.9727001,0.0438995
                                                                C23.9297009,20.9237995,23.75,21.2451,23.75,21.5918007v20.8163986c0,0.3467026,0.1797009,0.6679993,0.4745998,0.8506012
                                                                C24.3848,43.3583984,24.5674,43.4081993,24.75,43.4081993c0.1532993,0,0.3057003-0.035099,0.4473-0.1054001l20.8163986-10.4081993
                                                                c0.3388023-0.1699982,0.5527-0.5157013,0.5527-0.8945999C46.5663986,31.6210995,46.3525009,31.2754002,46.0136986,31.1054993z
                                                                M25.75,40.7901001v-17.580101L43.330101,32L25.75,40.7901001z"/>
                                                            <path d="M32,0C14.3268995,0,0,14.3268995,0,32s14.3268995,32,32,32s32-14.3269005,32-32S49.6730995,0,32,0z M32,62
                                                                C15.4579,62,2,48.542099,2,32C2,15.4580002,15.4579,2,32,2c16.5419998,0,30,13.4580002,30,30C62,48.542099,48.5419998,62,32,62z"/>
                                                            </g>
                                                        </svg>
                                                        <span className="hidden sm:inline-block">View Workout</span>
                                                        </button>
                                                    </Link>
                                                    </div>                                      
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="py-1 font-semibold text-white text-lg">Plans</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                            {weeklyPlans?.map((plan) => (
                                                <div key={plan.id} className="bg-white p-6 mb-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105"
                                                        >
                                                        <div className="flex justify-between items-center mb-4">
                                                            <div>
                                                                <h3 className="text-2xl font-bold text-indigo-700">{plan.dpDay}</h3>
                                                                <p className="text-sm text-gray-400">Time: {plan.dpTime}</p>
                                                                <p className="text-sm text-gray-400">Duration: {plan.dpDuration}</p>
                                                            </div>
                                                            <span  className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-300 ${
                                                                plan.status === "completed"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                            >
                                                            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                                                            </span>
                                                        </div>    
                                                    </div>
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
      </div>

       


      <Suspense fallback={<>Loading...</>}>
        <AddExerciseSchedule exercisesData={props.exercisesData} session={props.session}/>
      </Suspense>
    </UserLayout>
    );
};

export default Dash2;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
  
        const session = await getSession(context);

    let url = process.env.NEXT_PUBLIC_API_URL;

    // Get today's date and one month back
    const today = new Date();
    const oneMonthBack = new Date();
    oneMonthBack.setMonth(today.getMonth() - 1);

    // Format dates in ISO 8601 format (MongoDB compatible)
    const fromDate = new Date(oneMonthBack.setHours(0, 0, 0, 0)).toISOString(); // One month back date at start of day
    const toDate = new Date(today.setHours(23, 59, 59, 999)).toISOString(); // Today's date at end of day

    const userId = session?.user?.id || "";  // Extracting userId from session
  
    const exercisesData =  await fetch(url+`/get-exercise`).then( (res) => res.json() );
    const alldailyPlanData =  await fetch(url+`/get-all-daily-plan?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then( (res) => res.json() );
    const dailyPlanData =  await fetch(`${url}/get-daily-plan?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then((res) => res.json());

    return {
      props: {
        session,
        exercisesData,
        alldailyPlanData,
        dailyPlanData:dailyPlanData ? dailyPlanData.results[0] : null
      },
    };
  };


