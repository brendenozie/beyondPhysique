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
import heart from "../assets/heart.png";
import run from "../assets/running.png";
import calories from "../assets/calories.png";
import sleep from "../assets/sleep.png";
import edit from "../assets/edit.png";
import waterbottle from "../assets/waterbottle.png"


const loaderProp = ({ src }: any) => {
    return src;
}

type Props = {
    exercisesData?: { results: IExercise[] };
    dailyPlanData?: { results: IDailyPlan[] };
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
      <div className="mt-4 gap-4 grid grid-cols-2 md:grid-cols-5">
        
        {/* Heart Rate Card */}
        <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow-lg">
          <Link href={"/calculatebpm"} className="w-full flex justify-end">
            <Image src={edit} alt="edit"  loader={loaderProp} className="w-4 h-4" />
          </Link>
          <Image src={heart} alt="heart" loader={loaderProp} width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
          <span className="font-bold">Heart Rate</span>
          <span>{props.bpmData?.averageBpmResult?.toFixed(2)} BPM</span>
        </div>

        {/* BMI Card */}
        <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-lg shadow-lg">
          <Link href={"/calculatebmi"} className="w-full flex justify-end">
            <Image src={edit} alt="edit" loader={loaderProp} className="w-4 h-4" />
          </Link>
          <Image src={bmi} alt="bmi"  loader={loaderProp} width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
          <span className="font-bold">BMI</span>
          <span>{props.bmiData?.averageBmiResult?.toFixed(2)}</span>
        </div>

        {/* Running Card */}
        <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-lg shadow-lg">
          <Link href={"/calculatesteps"} className="w-full flex justify-end">
            <Image src={edit} alt="edit" loader={loaderProp} className="w-4 h-4" />
          </Link>
          <Image src={run} alt="running" loader={loaderProp} width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
          <span className="font-bold">Running</span>
          <span>{props.stepsData?.averageSteps?.toFixed(2)} Steps</span>
        </div>

        {/* Sleep Card */}
        <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-lg shadow-lg">
          <Link href={"/calculatesleep"} className="w-full flex justify-end">
            <Image src={edit} loader={loaderProp} alt="edit" className="w-4 h-4" />
          </Link>
          <Image src={sleep} loader={loaderProp} alt="sleep" width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
          <span className="font-bold">Sleep</span>
          <span>{props.sleepCountData?.averageSleepDuration?.toFixed(2)} Hours</span>
        </div>

        {/* Water Intake Card */}
        <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-cyan-100 to-cyan-200 p-6 rounded-lg shadow-lg">
          <Link href={"/waterintake"} className="w-full flex justify-end">
            <Image src={edit} alt="edit" loader={loaderProp} className="w-4 h-4" />
          </Link>
          <Image src={waterbottle} loader={loaderProp} alt="water intake" width={64} height={64} className="mt-4 w-32 h-32 mx-auto" />
          <span className="font-bold">Water</span>
          <span>{props.waterCountData?.averageWaterIntake?.toFixed(2)} ml</span>
        </div>

        {/* Calories Card */}
        <div className="transform transition-transform hover:scale-105 flex flex-col justify-between items-center py-4 bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-lg">
          <Image src={calories} loader={loaderProp} alt="calories" width={64} height={64} className="mt-4 mb-4 w-32 h-32 mx-auto" />
          <span className="font-bold">Calories</span>
          <span>{props.caloriesData?.averageCalories?.toFixed(2)} Kcal</span>
        </div>
      </div>
    </div>

    {/* Training Classes */}
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="py-1 font-semibold text-black text-lg">Today's Training Classes</h3>
        <a className="py-2 px-6 bg-purple-600 font-semibold text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors" href="/myclasses">My Classes</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {props.trainingProgramData && props.trainingProgramData.results?.map((item: ITrainingProgram) => (
          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between">
            <div>
              <h4 className="font-semibold text-black">{item.trainingName}</h4>
              <p className="text-gray-600 text-sm">{item.trainingDay} {item.trainingTime} {item.traingDuration}</p>
            </div>
            <Link href={`/myclasses/${item.id}`}>
              <button className="bg-orange-400 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-orange-500 transition-colors">
                <svg fill="#000000" height="32px" width="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <g id="Play">
                    <path d="M46.01 31.11L25.2 20.7a1 1 0 00-1.53.85v20.82a1 1 0 001.53.85l20.82-10.41a1 1 0 000-1.79zM25.75 40.79v-17.58L43.33 32 25.75 40.79z" />
                    <path d="M32 0C14.33 0 0 14.33 0 32s14.33 32 32 32 32-14.33 32-32S49.67 0 32 0zm0 62C15.46 62 2 48.54 2 32 2 15.46 15.46 2 32 2s30 13.46 30 30-13.46 30-30 30z" />
                  </g>
                </svg>
              </button>
            </Link>
          </div>
        ))} */}
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

    console.log(session?.user)
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


    console.log(
        {
            session,
            exercisesData,
            dailyPlanData,
            caloriesData,
            bpmData,
            bmiData,
            stepsData,
            sleepCountData,
            waterCountData,
            programsCategoryData,
      }
    )

    return {
      props: {
        session,
        exercisesData,
        dailyPlanData,
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