import Card from "@/components/Card";
import RightSide from "@/components/RightSide";
import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import UserSide from "@/components/UserSide";
import { ChartPieIcon, CalendarDaysIcon, UserCircleIcon, WrenchIcon, ChatBubbleLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
// import Chart from "react-apexcharts";
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { GetServerSidePropsContext } from "next";
import { IDailyPlan, IExercise, IExerciseActivity, IExerciseCategory } from "@/types/typings";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import ExerciseCard from "@/components/ExerciseCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
 
const chartConfig :any = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Expenditure",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
    {
        name: "Income",
        data: [30, 20, 100, 620, 1500, 200, 700, 1230, 5000],
      },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617","#ea0c0c"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

type Props = {
  exercisesData?: {results:IExercise[]};
  dailyPlanData?: {results:IDailyPlan[]};
  exerciseActivityData?: {results:IExerciseActivity[]};
  exerciseCategoryData?:{results: IExerciseCategory[]};
  session: Session;
};

const Dash2 = (props: Props) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <UserLayout>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <UserNav/>
          
          <div className="container mx-auto">

            <div className="flex flex-col lg:flex-row gap-6 p-6 bg-purple-50 min-h-screen text-black">
                {/* Middle Section */}
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <h2 className="text-xl font-semibold">Dashboard</h2>
                      {/* <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Oct 30, 2021</span>
                        <button className="p-2 bg-gray-200 rounded-full">
                          <i className="fas fa-bell"></i>
                        </button>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">Ricardo</span>
                          <img
                            src="https://via.placeholder.com/32"
                            alt="User avatar"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                      </div> */}
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                      <div className="flex-1 bg-purple-100 p-4 rounded-lg">
                        <h3 className="font-semibold">Get enough rest to recover energy for the next activity</h3>
                        <a href="#" className="text-purple-600">Read article</a>
                      </div>
                      <div className="flex-1 bg-purple-100 p-4 rounded-lg">
                        <h3 className="font-semibold">Doing exercise regularly keeps the body fit and healthy</h3>
                        <a href="#" className="text-purple-600">Read article</a>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold mb-4">Today's Plan</h3>
                      <a className="py-1 px-4 bg-purple-600 text-white rounded" href="/exerciseschedule">View All</a>
                    </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                      {props.dailyPlanData &&
                              props.dailyPlanData.results.map((item: IDailyPlan) => (
                                      <div className="bg-white p-4 rounded-lg shadow justify-between flex flex-row">
                                        <div>
                                          <h4 className="font-semibold">{item.exercise.exName}</h4>
                                          <p className="text-gray-600 text-sm">{item.dpDay} {item.dpTime}</p>
                                        </div>
                                        <Link href={`/viewworkout/${item.exercise.id}`}>
                                        <button className=" bg-orange-400 text-white px-4 py-2 rounded-lg "><i className="h-16 w-16">
                                        <svg fill="#000000" height="32px" width="32px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                        
                                              viewBox="0 0 64 64" enable-background="new 0 0 64 64">
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
                                            </i>
                                            {/* <span className="ml-2">Add</span> */}
                                        </button>
                                        </Link>
                                      </div>
                                    ))}
                      </div>
                    </div>

                    {/* <div className="space-y-6 mt-12"> */}
                      {/* Hero text */}
                      {/* <div className="mt-8 mx-4 lg:mt-0 text-4xl lg:text-4xl font-bold gap-6 uppercase text-black text-clip overflow-hidden">
                          Your Next Exercise
                      </div>
                      <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16">
                          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                          <path className="text-gray-700" strokeWidth="3.8" fill="none" d="M18 1.0845a 16.9155 16.9155 0 1 1 0 33.831a 16.9155 16.9155 0 1 1 0 -33.831" />
                          <path className="text-orange-500" strokeWidth="3.8" fill="none" d="M18 1.0845a 16.9155 16.9155 0 0 1 0 33.831a 16.9155 16.9155 0 0 1 0 -33.831" />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xl">4:35</span>
                      </div>
                      <div className="text-lg">Push ups</div><br/>
                      <div className="text-base">6 x 5 minutes</div>
                      </div>
                      <div className="flex justify-center">
                      <img src="bas.png" alt="Workout" className="w-full lg:w-3/4 h-auto" />
                      </div>
                  </div> */}

                    <div className="mt-6">
                      <h3 className="font-semibold mb-4">Activity History</h3>
                      <div className="bg-white p-4 rounded-lg shadow">
                      {props.exerciseActivityData &&
                        props.exerciseActivityData.results.map((item: any) => (
                          <div className="px-4 pt-4">
                              <div className="border-b pb-4 border-gray-400 border-dashed">
                                  <p className="text-xs font-light leading-3 text-black  pb-4">{item.acDate} {item.acTime} </p>
                                  <a tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-black mt-2">{item.exercise.exName}</a>
                                  <p className="text-sm pt-2 leading-4 leading-none text-black">{item.acDuration}</p>
                              </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                  {/* <div className='max-w-sm hover:translate-y-2 duration-500'>
                      <div className="flex flex-col bg-white p-6 rounded-lg shadow-md">
                        <h5
                          className='text-xl font-bold tracking-tight text-gray-900 '
                          style={{ textAlign: "center" }}>
                          BMI
                        </h5>
                        <p className='font-normal text-gray-500 dark:text-gray-400 mr-2'>
                          BMI stands for Body Mass Index, which is a measure of
                          body fat based on a person's weight and height. BMI is a
                          widely used method to assess whether a person has a
                          healthy body weight, with a BMI of 18.5 to 24.9
                          considered healthy, while a BMI of 25 to 29.9 is
                          classified as overweight, and a BMI of 30 or higher is
                          considered obese.
                        </p>                  
                        <a className=" mt-4 text-center uppercase font-bold py-1 px-4 bg-purple-600 text-white rounded" href="/calculatebmi">
                            Check your BMI
                        </a>                  
                      </div>
                    </div> */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Pick Training</h3>
                      <a className="py-1 px-4 bg-purple-600 text-white rounded" href="/allexercises">View All</a>
                    </div>
                    <div className="space-y-4">
                    {props.exerciseCategoryData &&
                              props.exerciseCategoryData.results.map((item: any) => (
                                <div className="bg-purple-100 p-4 rounded-lg">
                                  <h4 className="font-semibold">{item.excName}</h4>
                                  <p className="text-gray-600">ways to maintain health by doing some sports</p>
                                  <Link href={`/viewbycatworkout/${item.id}`} className="mt-2 py-1 px-4 bg-purple-600 text-white rounded">View</Link>
                                </div>
                    ))}
                      
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

  const exercisesData =  await fetch(url+`/get-exercise`).then( (res) => res.json() );
  const dailyPlanData =  await fetch(url+`/get-daily-plan`).then( (res) => res.json() );
  const exerciseActivityData =  await fetch(url+`/get-exercise-activity`).then( (res) => res.json() );  
  const exerciseCategoryData =  await fetch(url+`/get-exercise-category`).then( (res) => res.json() );

  return {
    props: {
      session,
      exercisesData,
      dailyPlanData,
      exerciseActivityData,
      exerciseCategoryData
    },
  };
};