import AddExerciseSchedule from "@/components/AddExerciseSchedule";
import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import { Suspense } from "react";
import Image from "next/image";
// import Chart from "react-apexcharts"; 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import Link from "next/link";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { IBmi, IBpm, IDailyPlan, IExercise, IProgramsCategory, ISleep, ISteps, ITrainingProgram } from "@/types/typings";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import ChartThree from "@/components/ChartThree";
import ChartTwo from "@/components/ChartTwo";
import bmi from "../assets/bmi.jpg";
// import heart from "../assets/heartt.png";
import heart from "../assets/heart.png";
import run from "../assets/running.png";
import calories from "../assets/calories.png";
import sleep from "../assets/sleep.png";
import edit from "../assets/edit.png";


const loaderProp = ({ src }: any) => {
    return src;
}

type Props = {
    exercisesData?: { results: IExercise[] };
    dailyPlanData?: { results: IDailyPlan[] };
    bpmData?: { results: IBpm };
    bmiData?: { results: IBmi };
    stepsData?: { results: ISteps };
    caloriesData?: { results: IDailyPlan };
    sleepCountData?: { results: ISleep };
    programsCategoryData?: { results: IProgramsCategory[] };
    trainingProgramData?: { results: ITrainingProgram[] };
    session: Session;
};

const Dash2 = (props: Props) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <UserLayout>
            <div className="flex flex-col min-h-screen bg-gray-900 text-white w-full">
                <UserNav />
                <div className="container mx-auto">

                    <div className="flex flex-col lg:flex-row bg-gray-100 min-h- h-full p-6 space-y-4 lg:space-y-0 lg:space-x-4">
                        <div className="w-full lg:w-2/3 p-4 space-y-4">
                            <div className="text-lg font-semibold mb-4">
                                {/* <h1 className="text-2xl text-black">Hello, Welcome 👋</h1> */}
                                <p className="text-gray-600">Here's your summary progress in health the last month.</p>
                            </div>
                            {/* Progress for today */}
                            <div className="col-span-1  text-black">
                                <h2 className="text-lg font-semibold">Progress for today</h2>
                                <div className="mt-4 gap-2 grid grid-cols-2 md:grid-cols-5">
                                    <div className="flex flex-col justify-between items-center py-2 bg-white p-4 rounded-lg shadow">
                                        <Link href={"/calculatebpm"} className="w-full flex justify-end">
                                            <Image
                                                src={edit}
                                                alt="edit"
                                                fill={false}
                                                loader={loaderProp}
                                                className="w-4 h-4"
                                            />
                                        </Link>

                                        <Image
                                            src={heart}
                                            alt="heart"
                                            fill={false}
                                            loader={loaderProp}
                                            className="mt-4 w-32 h-20 mx-auto"
                                        />
                                        <span className=" font-bold">Heart Rate</span>
                                        <span>{props.bpmData?.results.bpmResult} BPM</span>
                                    </div>
                                    <div className="flex flex-col justify-between items-center py-2 bg-white p-4 rounded-lg shadow">
                                        <Link href={"/calculatebmi"} className="w-full flex justify-end">
                                            <Image
                                                src={edit}
                                                alt="edit"
                                                fill={false}
                                                loader={loaderProp}
                                                className="w-4 h-4"
                                            />
                                        </Link>
                                        <Image
                                            src={bmi}
                                            alt="bmi"
                                            fill={false}
                                            loader={loaderProp}
                                            className="mt-4 w-32 h-20 mx-auto"
                                        />
                                        <span className=" font-bold">BMI</span>
                                        <span>{props.bmiData?.results.bmi}</span>
                                    </div>
                                    <div className="flex flex-col justify-between items-center py-2 bg-white p-4 rounded-lg shadow">
                                        <Link href={"/calculatesteps"} className="w-full flex justify-end">
                                            <Image
                                                src={edit}
                                                alt="edit"
                                                fill={false}
                                                loader={loaderProp}
                                                className="w-4 h-4"
                                            />
                                        </Link>
                                        <Image
                                            src={run}
                                            alt="running"
                                            fill={false}
                                            width={24}
                                            loader={loaderProp}
                                            className="mt-4 w-32 h-20 mx-auto"
                                        />
                                        <span className=" font-bold">Running</span>
                                        <span>{props.stepsData?.results.stepsCount} Steps</span>
                                    </div>
                                    <div className="flex flex-col justify-between items-center py-2 bg-white p-4 rounded-lg shadow">
                                        <Link href={"/calculatesleep"} className="w-full flex justify-end">
                                            <Image
                                                src={edit}
                                                alt="edit"
                                                fill={false}
                                                loader={loaderProp}
                                                className="w-4 h-4"
                                            />
                                        </Link>
                                        <Image
                                            src={sleep}
                                            alt="sleep"
                                            fill={false}
                                            loader={loaderProp}
                                            className="mt-4  w-32 h-20 mx-auto"
                                        />
                                        <span className=" font-bold">Sleep</span>
                                        <span>{props.sleepCountData?.results.slDuration} Score</span>
                                    </div>
                                    <div className="flex flex-col justify-between items-center py-2 bg-white p-4 rounded-lg shadow">
                                        {/* <Link href={"/calculatebpm"} className="w-full flex justify-end">
                                            <Image
                                                src={edit}
                                                alt="edit"
                                                fill={false}
                                                loader={loaderProp}
                                                className="w-4 h-4"
                                            />
                                        </Link> */}
                                        <Image
                                            src={calories}
                                            alt="calories"
                                            fill={false}
                                            loader={loaderProp}
                                            className="mt-4 mb-4 w-28 h-20 mx-auto"
                                        />
                                        <span className=" font-bold">Calories</span>
                                        <span>0 Kcal</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="py-1 font-semibold text-black text-lg">Today's Training Classes</h3>
                                    <a className="py-1 px-4 bg-purple-600 font-semibold text-white rounded" href="/myclasses">My Classes</a>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                    {props.trainingProgramData &&
                                        props.trainingProgramData.results.map((item: ITrainingProgram) => (
                                            <div className="bg-white p-4 rounded-lg shadow justify-between flex flex-row">
                                                <div>
                                                    <h4 className="font-semibold text-black">{item.trainingName}</h4>
                                                    <p className="text-gray-600 text-sm">{item.trainingDay} {item.trainingTime} {item.traingDuration}</p>
                                                </div>
                                                <Link href={`/myclasses/${item.id}`}>
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

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-black">

                                {/* Statistics */}
                                <div className="col-span-1 bg-white p-4 rounded-lg shadow ">
                                    <h2 className="text-lg font-semibold">Statistics</h2>
                                    <div className="mt-4">
                                        <ChartTwo />
                                    </div>
                                </div>

                                {/* Today's activity */}
                                <div className="col-span-1 bg-white p-4 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold">Exercise Activity</h2>
                                    <div className="mt-4">
                                        <ChartThree />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="bg-white p-4 rounded-lg shadow text-black">
                                <div className="flex flex-row justify-between">
                                    <h2 className="text-lg font-semibold">Today's Scheduled</h2>
                                    <h2 className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">View All</h2>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <div className="p-2 bg-blue-100 rounded">
                                        <span className="block text-lg font-semibold">Training - Yoga Class</span>
                                        <span className="block text-gray-500">22 Mar</span>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded">
                                        <span className="block text-lg font-semibold">Training - Swimming</span>
                                        <span className="block text-gray-500">29 Mar</span>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {/* Right Sidebar */}
                        <div className="w-full h-full lg:w-1/3 p-4 space-y-4 text-black">
                            <div className="flex flex-wrap">
                                <div className="flex flex-1 items-center justify-between mb-4">
                                    <h3 className="font-semibold">Ongoing Trainer Classes</h3>
                                    <a className="py-1 px-4 bg-orange-500 text-white rounded" href="/onlineclasses">View All</a>
                                </div>
                                <div className=" mt-6 lg:mt-0">
                                    {props.programsCategoryData &&
                                        props.programsCategoryData.results.map((item: IProgramsCategory, index: number) => (
                                            <div className={`${index % 2 === 0 ? "bg-white" : "bg-orange-500 "}   p-6`}>
                                                <h2 className="text-2xl font-bold mb-4">{item.pcName}</h2>
                                                <p className="font-mono text-base">{item.pcDesc}</p>
                                                <div className="mt-4">
                                                    <a href={`/onlineclassesbycat/${item.id}`} className={`mt-4 ${index % 2 === 0 ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-900 hover:bg-gray-800"}  text-white py-2 px-4 rounded`}>Learn More</a>
                                                </div>
                                            </div>
                                        ))}

                                </div>
                            </div>

                            {/* <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Calendar</h2>
                <div className="mt-4">
                    <div className="flex justify-between text-gray-500">
                    <span>March, 2022</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mt-2 text-sm">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div> */}

                            {/* Example dates */}
                            {/* {Array(31).fill(0).map((_, i) => (
                        <div key={i} className="py-1">{i + 1}</div>
                    ))}
                    </div>
                </div>
                </div> */}


                        </div>
                    </div>


                </div>

                {/* <div className="lg:flex flex-grow "> */}
                {/* Sidebar */}
                {/* <div className={`fixed top-0 left-0 h-full w-64 bg-orange-500 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-50`}>
            <div className="flex justify-between items-center lg:hidden p-4">
              <h1 className="text-white text-lg font-bold">Menu</h1>
              <button onClick={toggleSidebar} className="text-white focus:outline-none">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="hidden lg:block mb-20 items-center">
                  <img src="city.png" alt="Logo" className="h-8 w-8" />
              </div>
            <nav className="flex flex-col lg:space-y-6 space-y-4 lg:flex-col items-center justify-around lg:justify-start">
                  <a href="#" className="flex items-center">
                      <ChartPieIcon className="h-6 w-6"/>
                  </a>
                  <a href="#" className="flex items-center">
                      <CalendarDaysIcon className="h-6 w-6"/>
                  </a>
                  <a href="#" className="flex items-center">
                      <CheckCircleIcon className="h-6 w-6"/>
                  </a>
                  <a href="#" className="flex items-center">
                      <ChatBubbleLeftIcon className="h-6 w-6"/>
                  </a>
                  <a href="#" className="flex items-center">
                      <UserCircleIcon className="h-6 w-6"/>
                  </a>
                  <a href="#" className="flex items-center">
                      <WrenchIcon className="h-6 w-6"/>
                  </a>
              </nav>
          </div> */}

                {/* Main Content */}
                {/* <div className="flex-1 lg:ml-64">       

              

          </div> */}


                {/* </div>       */}
            </div>




            <Suspense fallback={<>Loading...</>}>
                <AddExerciseSchedule exercisesData={props.exercisesData} session={props.session} />
            </Suspense>
        </UserLayout >
    );
};

export default Dash2;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    
  const session = await getSession(context);

  let url = process.env.NEXT_PUBLIC_API_URL;

  // Prepare all fetch requests
  const fetchPromises = [
    fetch(`${url}/get-exercise`).then((res) => res.json()),
    fetch(`${url}/get-daily-plan`).then((res) => res.json()),
    fetch(`${url}/get-my-training-programs`).then((res) => res.json()),
    fetch(`${url}/get-bpm`).then((res) => res.json()),
    fetch(`${url}/get-bmi`).then((res) => res.json()),
    fetch(`${url}/get-steps`).then((res) => res.json()),
    fetch(`${url}/get-sleep`).then((res) => res.json()),
    fetch(`${url}/get-programs-category`).then((res) => res.json())
  ];

  try {
    // Wait for all fetch requests to complete
    const [
      exercisesData,
      dailyPlanData,
      trainingProgramData,
      bpmData,
      bmiData,
      stepsData,
      sleepCountData,
      programsCategoryData
    ] = await Promise.all(fetchPromises);

    return {
      props: {
        session,
        exercisesData,
        dailyPlanData,
        bpmData,
        bmiData,
        stepsData,
        sleepCountData,
        programsCategoryData,
        trainingProgramData
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    // Handle error appropriately
    return {
      props: {
        session,
        exercisesData: null,
        dailyPlanData: null,
        bpmData: null,
        bmiData: null,
        stepsData: null,
        sleepCountData: null,
        programsCategoryData: null,
        trainingProgramData: null
      },
    };
  }
}