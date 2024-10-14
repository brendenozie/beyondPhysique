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
import { IAverageCaloriesSummary, IAverageSleepSummary, IAverageStepsSummary, IAverageSummaryBmi, IAverageSummaryBpm, IAverageWaterSummary, IBmi, IBpm, IDailyPlan, IExercise, IProgramsCategory, ISleep, ISteps, ITrainingProgram } from "@/types/typings";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import ChartThree from "@/components/ChartThree";
import ChartTwo from "@/components/ChartTwo";
import bmi from "../assets/bmi.jpg";
import heart from "../assets/hb.png";
import run from "../assets/running.png";
import calories from "../assets/calories.png";
import sleep from "../assets/sleep.png";
import edit from "../assets/edit.png";
import waterbottle from "../assets/water.png"

type LoaderProps = {
  src: string;
  width?: number;
  quality?: number;
};

const loaderProp = ({ src, width, quality }: LoaderProps) => {
  // Optionally, you can handle width and quality parameters to optimize image loading.
  const params = [`w=${width || 800}`]; // Default width to 800 if not provided
  if (quality) {
    params.push(`q=${quality}`);
  }

  // Return the optimized image URL
  return `${src}?${params.join('&')}`;
};

type Props = {
    exercisesData?: { results: IExercise[] };
    dailyPlanData?: IDailyPlan;
    bpmData?:  IAverageSummaryBpm ;
    bmiData?:  IAverageSummaryBmi ;
    stepsData?: IAverageStepsSummary ;
    caloriesData?: IAverageCaloriesSummary ;
    sleepCountData?:  IAverageSleepSummary ;
    waterCountData?:  IAverageWaterSummary ;
    programsCategoryData?: { results: IProgramsCategory[] };
    session: Session;
};

const Dash2 = (props: Props) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

 // Helper function to calculate progress as a percentage
const calculateProgress = (currentValue: number, dailyGoal: number | undefined) => {
  if (!currentValue || !dailyGoal) return 0;  // Handle cases where values are missing
  const progress = (currentValue / dailyGoal) * 100;
  return Math.min(progress, 100);  // Ensure progress doesn't exceed 100%
};

// Example usage for each card
const bpmGoal = 120; // Example daily goal for heart rate
const stepsGoal = 10000; // Example daily goal for running steps
const sleepGoal = 8; // Example daily goal for sleep (in hours)
const waterGoal = 3000; // Example daily goal for water intake (in ml)
const caloriesGoal = 2000; // Example daily goal for calories (in kcal)

    return (
        <UserLayout>
            <div className="flex flex-col min-h-screen bg-gray-900 text-white w-full">
                <UserNav />
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-full h-full p-8 space-y-8 lg:space-y-0 lg:space-x-8"> 
  <div className="w-full lg:w-2/3 p-6 space-y-6">
    
    {/* Progress Summary */}
    <div className="text-lg font-semibold mb-6">
      <p className="text-gray-600">Here's your summary progress in health the last month.</p>
    </div>
    
      {/* Progress for Today */}
<div className="text-black">
  <h2 className="text-xl font-semibold text-gray-800">Progress for Today</h2>
  <div className="mt-4 gap-4 grid grid-cols-2 md:grid-cols-3">
    
    {/* Heart Rate Card */}
    <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow-lg relative">
      <Link href={"/calculatebpm"} className="absolute top-2 right-2">
        <Image src={edit} alt="edit" loader={loaderProp} className="w-4 h-4" />
      </Link>
      <Image src={heart} alt="heart" loader={loaderProp} width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
      <span className="font-bold">Heart Rate</span>
      <span>{props.bpmData?.averageBpmResult?.toFixed(2)} BPM</span>
      <div className="w-full mt-2 h-2 bg-gray-300 rounded-full">
        <div className="h-full bg-red-600 rounded-full" style={{ width: `${calculateProgress(props.bpmData?.averageBpmResult,bpmGoal)}%` }}></div>
      </div>
    </div>

    {/* BMI Card */}
    <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-lg shadow-lg relative">
      <Link href={"/calculatebmi"} className="absolute top-2 right-2">
        <Image src={edit} alt="edit" loader={loaderProp} className="w-4 h-4" />
      </Link>
      <Image src={bmi} alt="bmi" loader={loaderProp} width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
      <span className="font-bold">BMI</span>
      <span>{props.bmiData?.averageBmiResult?.toFixed(2)}</span>
      <div className="w-full mt-2 h-2 bg-gray-300 rounded-full">
        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${calculateProgress(props.bmiData?.averageBmiResult,bpmGoal)}%` }}></div>
      </div>
    </div>

    {/* Running Card */}
    <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-lg shadow-lg relative">
      <Link href={"/calculatesteps"} className="absolute top-2 right-2">
        <Image src={edit} alt="edit" loader={loaderProp} className="w-4 h-4" />
      </Link>
      <Image src={run} alt="running" loader={loaderProp} width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
      <span className="font-bold">Running</span>
      <span>{props.stepsData?.averageSteps?.toFixed(2)} Steps</span>
      <div className="w-full mt-2 h-2 bg-gray-300 rounded-full">
        <div className="h-full bg-green-600 rounded-full" style={{ width: `${calculateProgress(props.stepsData?.averageSteps,stepsGoal)}%` }}></div>
      </div>
    </div>

    {/* Sleep Card */}
    <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-lg shadow-lg relative">
      <Link href={"/calculatesleep"} className="absolute top-2 right-2">
        <Image src={edit} loader={loaderProp} alt="edit" className="w-4 h-4" />
      </Link>
      <Image src={sleep} loader={loaderProp} alt="sleep" width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
      <span className="font-bold">Sleep</span>
      <span>{props.sleepCountData?.averageSleepDuration?.toFixed(2)} Hours</span>
      <div className="w-full mt-2 h-2 bg-gray-300 rounded-full">
        <div className="h-full bg-purple-600 rounded-full" style={{ width: `${calculateProgress(props.sleepCountData?.averageSleepDuration,sleepGoal)}%` }}></div>
      </div>
    </div>

    {/* Water Intake Card */}
    <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-cyan-100 to-cyan-200 p-6 rounded-lg shadow-lg relative">
      <Link href={"/waterintake"} className="absolute top-2 right-2">
        <Image src={edit} alt="edit" loader={loaderProp} className="w-4 h-4" />
      </Link>
      <Image src={waterbottle} loader={loaderProp} alt="water intake" width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
      <span className="font-bold">Water</span>
      <span>{props.waterCountData?.averageWaterIntake?.toFixed(2)} ml</span>
      <div className="w-full mt-2 h-2 bg-gray-300 rounded-full">
        <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${calculateProgress(props.waterCountData?.averageWaterIntake,waterGoal)}%` }}></div>
      </div>
    </div>

    {/* Calories Card */}
    <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-lg relative">
      <Link href={"/calculatecalories"} className="absolute top-2 right-2">
        <Image src={edit} loader={loaderProp} alt="edit" className="w-4 h-4" />
      </Link>
      <Image src={calories} loader={loaderProp} alt="calories" width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
      <span className="font-bold">Calories</span>
      <span>{props.caloriesData?.averageCalories?.toFixed(2)} Kcal</span>
      <div className="w-full mt-2 h-2 bg-gray-300 rounded-full">
        <div className="h-full bg-yellow-600 rounded-full" style={{ width: `${calculateProgress(props.caloriesData?.averageCalories,caloriesGoal)}%` }}></div>
      </div>
    </div>
  </div>
</div>


    {/* Training Classes */}
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="py-1 font-semibold text-black text-lg">Today's Training Classes</h3>
        <a className="py-2 px-6 bg-purple-600 font-semibold text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors" href="/myclasses">My Classes</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {props.dailyPlanData &&
                              props.dailyPlanData?.exercises.map((item: IExercise) => (                                
                                     <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-xl flex flex-col sm:flex-row items-center sm:items-start sm:justify-between space-y-4 sm:space-y-0 sm:space-x-6 transition-transform duration-300 hover:scale-105">
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
                                        <h4 className="font-bold text-xl text-gray-800">{item.exName}</h4>
                                        <p className="text-gray-600 text-sm">
                                          {props.dailyPlanData?.dpDay} {props.dailyPlanData?.dpTime}
                                        </p>
                                        {/* View Workout Button */}
                                        <Link href={`/viewworkout/${item.id}`}>
                                          <button className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg transform hover:scale-110">
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

    {/* Statistics and Activity */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
      
      {/* Statistics */}
      <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Statistics</h2>
        <div className="mt-4">
          <ChartTwo />
        </div>
      </div>

      {/* Today's Activity */}
      <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Exercise Activity</h2>
        <div className="mt-4">
          <ChartThree />
        </div>
      </div>
    </div>
  </div>

  {/* Right Sidebar */}
  <div className="w-full lg:w-1/3 p-6 space-y-6 text-black">
    <div className="flex justify-between mb-4">
      <h3 className="font-bold text-lg">Ongoing Trainer Classes</h3>
      <a className="py-2 px-4 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-colors" href="/onlineclasses">View All</a>
    </div>
    <div className="mt-6">
      {props.programsCategoryData && props.programsCategoryData.results?.map((item: IProgramsCategory, index: number) => (
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
</div>

                </div>
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

    // Get today's date and one month back
    const today = new Date();
    const oneMonthBack = new Date();
    oneMonthBack.setMonth(today.getMonth() - 1);

    // Format dates in ISO 8601 format (MongoDB compatible)
    const fromDate = new Date(oneMonthBack.setHours(0, 0, 0, 0)).toISOString(); // One month back date at start of day
    const toDate = new Date(today.setHours(23, 59, 59, 999)).toISOString(); // Today's date at end of day

    const userId = session?.user?.id || "";  // Extracting userId from session

    // Prepare all fetch requests with date range and userId as query parameters
    const fetchPromises = [
        fetch(`${url}/get-exercise`).then((res) => res.json()),
        fetch(`${url}/get-daily-plan?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then((res) => res.json()),
        fetch(`${url}/average-calories?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then((res) => res.json()),
        fetch(`${url}/average-bpm?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then((res) => res.json()),
        fetch(`${url}/average-bmi?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then((res) => res.json()),
        fetch(`${url}/average-steps?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then((res) => res.json()),
        fetch(`${url}/average-sleep?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then((res) => res.json()),
        fetch(`${url}/average-water?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then((res) => res.json()),
        fetch(`${url}/get-programs-category`).then((res) => res.json())
    ];



  try {
    // Wait for all fetch requests to complete
    const [
      exercisesData,
      dailyPlanData,
     // trainingProgramData,
      caloriesData,
      bpmData,
      bmiData,
      stepsData,
      sleepCountData,
      waterCountData,
      programsCategoryData
    ] = await Promise.all(fetchPromises);

    return {
      props: {
        session,
        exercisesData,
        dailyPlanData:dailyPlanData.results[0],
        caloriesData,
        bpmData,
        bmiData,
        stepsData,
        sleepCountData,
        waterCountData,
        programsCategoryData,
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
        waterCountData: null,
        programsCategoryData: null,
        trainingProgramData: null
      },
    };
  }
}