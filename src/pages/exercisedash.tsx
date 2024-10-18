import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
// import Chart from "react-apexcharts";
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import Link from "next/link";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { IDailyPlan, IExercise, IExerciseActivity, IExerciseCategory } from "@/types/typings";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type Props = {
  exercisesData?: {results:IExercise[]};
  dailyPlanData?: IDailyPlan;
  exerciseActivityData?: {results:IExerciseActivity[]};
  exerciseCategoryData?:{results: IExerciseCategory[]};
  session: Session;
};

const Dash2 = (props: Props) => {

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchExercises = async (categoryId: string) => {
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/get-exercise-by-cat/${categoryId}`);
      const data = await response.json();
      
      setExercises(data.results);

    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set the first category as the default selected on component mount
  useEffect(() => {
    if (props.exerciseCategoryData && props.exerciseCategoryData?.results.length > 0) {
      const firstCategoryId = props.exerciseCategoryData.results[0].id;
      setSelectedCategory(firstCategoryId);
      fetchExercises(firstCategoryId); // Fetch exercises for the first category
    }
  }, [props.exerciseCategoryData]);

  const handleTabClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchExercises(categoryId); // Fetch exercises when tab is clicked
  };

  return (
    <UserLayout>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <UserNav/>          
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 p-6 bg-purple-50 min-h-screen text-black">
                {/* Middle Section */}
                <div className="flex-1 lg:w-2/3">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
                    </div>

                    {/* Health Tips */}
                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                      <div className="flex-1 bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg shadow hover:shadow-xl transition">
                        <h3 className="font-semibold text-gray-800">Get enough rest to recover energy for the next activity</h3>
                        <a href="#" className="text-purple-600 hover:text-purple-800">Read article</a>
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg shadow hover:shadow-xl transition">
                        <h3 className="font-semibold text-gray-800">Doing exercise regularly keeps the body fit and healthy</h3>
                        <a href="#" className="text-purple-600 hover:text-purple-800">Read article</a>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold mb-4">Today's Plan</h3>
                      <a className="py-1 px-4 bg-purple-600 text-white rounded" href="/exerciseschedule">View All</a>
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
                      <h3 className="font-semibold mb-4">Workouts</h3>
                      <div className="bg-white p-4 rounded-lg shadow">

                          {/* Scrollable Tabs */}
                          <div className="flex overflow-x-auto space-x-4 bg-purple-200 p-4 rounded-lg mb-6">
                            {props.exerciseCategoryData &&
                              props.exerciseCategoryData.results.map((category) => (
                                <button
                                  key={category.id}
                                  onClick={() => handleTabClick(category.id)}
                                  className={`py-2 px-4 rounded-md font-semibold ${
                                    selectedCategory === category.id
                                      ? 'bg-purple-600 text-white'
                                      : 'bg-purple-100 text-gray-700'
                                  }`}
                                >
                                  {category.excName}
                                </button>
                              ))}
                          </div>

                          {/* Exercise Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? (
                              <div>Loading exercises...</div>
                            ) : exercises.length > 0 ? (
                              exercises.map((exercise) => (
                                <div
                                    key={exercise.id}
                                    className="bg-white shadow-md rounded-lg p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                                  >
                                    <img
                                      src={exercise.exPic}
                                      alt={exercise.exName}
                                      className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                    <h4 className="font-semibold text-xl h-16 line-clamp-2 mb-2">{exercise.exName}</h4>
                                    <p className="text-gray-600 text-sm mb-4 h-16 line-clamp-3">
                                      {exercise.exDesc}
                                    </p>
                                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                      <span>Reps: {exercise.reps}</span>
                                      <span>Sets: {exercise.sets}</span>
                                    </div>
                                    <Link href={`/viewbycatworkout/${exercise.id}`}>
                                      <div className="mt-3 inline-block py-2 px-6 bg-purple-600 text-white rounded-full transition-colors duration-300 hover:bg-purple-700 cursor-pointer">
                                        View Workout
                                      </div>
                                    </Link>
                                  </div>

                              ))
                            ) : (
                              <div>No exercises available for this category</div>
                            )}
                          </div>
                    
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-purple-700">Activity History</h3>
                        <a className="py-2 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg shadow-lg hover:scale-105 transition" href="/allexercises">View All</a>
                      </div>
                    <div className="space-y-4">
                      {props.exerciseActivityData && 
                          props.exerciseActivityData.results?.map((item: IExerciseActivity) => (
                              <div key={item.id}  className="bg-white/60 backdrop-blur-md rounded-lg shadow-md p-5 transition-transform hover:scale-105 duration-300">
                                {/* Timestamp */}
                                <p className="text-xs text-gray-500 font-light pb-3">
                                  {new Date(item.timestamp).toLocaleString()}
                                </p>

                                {/* Exercise Name */}
                                <a 
                                  href="#" 
                                  tabIndex={0} 
                                  className="block text-lg font-semibold text-gray-800 hover:text-orange-500 transition-colors duration-300 mb-3"
                                >
                                  {item.exercise?.exName}
                                </a>

                                {/* Duration & Additional Info with Icons */}
                                <div className="flex flex-col gap-2 text-sm text-gray-700">
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 6h-2v8h2v-8zm-1 14c-1.105 0-2-.895-2-2h4c0 1.105-.895 2-2 2z"/>
                                    </svg>
                                    <span>Duration: {item.acDuration} minutes</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path d="M20 13h-6v5h-4v-5h-6v-2h6v-5h4v5h6v2zm-8-13c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z"/>
                                    </svg>
                                    <span>Reps: {item.acRepCount}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path d="M20 14h-8.586l5.293-5.293-1.414-1.414-7.707 7.707v2.586h2.586l7.707-7.707-1.414-1.414-5.293 5.293v-8.586h-2v10h10v-2zm-8-12c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 2c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"/>
                                    </svg>
                                    <span>Sets: {item.acSetCount}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path d="M12 0c-6.628 0-12 5.373-12 12 0 6.627 5.372 12 12 12 6.628 0 12-5.373 12-12 0-6.627-5.372-12-12-12zm0 22c-5.522 0-10-4.479-10-10s4.478-10 10-10 10 4.479 10 10-4.478 10-10 10zm-2-10v6h-2v-6h2zm0-10h-2v8h2v-8z"/>
                                    </svg>
                                    <span>Calories: {item.acCalories}</span>
                                  </div>
                                </div>
                              </div>
                          ))
                        }
                    
                      
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

    // Get today's date and one month back
    const today = new Date();
    const oneMonthBack = new Date();
    oneMonthBack.setMonth(today.getMonth() - 1);

    // Format dates in ISO 8601 format (MongoDB compatible)
    const fromDate = new Date(oneMonthBack.setHours(0, 0, 0, 0)).toISOString(); // One month back date at start of day
    const toDate = new Date(today.setHours(23, 59, 59, 999)).toISOString(); // Today's date at end of day

    console.log(session?.user)
    const userId = session?.user?.id || "";  // Extracting userId from session

  let url = process.env.NEXT_PUBLIC_API_URL;

  const exercisesData =  await fetch(url+`/get-exercise`).then( (res) => res.json() );
  const dailyPlanData =  await fetch(url+`/get-daily-plan?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then( (res) => res.json() );
  const exerciseActivityData =  await fetch(url+`/get-exercise-activity?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}&userId=${userId}`).then( (res) => res.json() );  
  const exerciseCategoryData =  await fetch(url+`/get-exercise-category`).then( (res) => res.json() );

  return {
    props: {
      session,
      exercisesData,
      dailyPlanData:dailyPlanData.results ? dailyPlanData.results[0] : null,
      exerciseActivityData,
      exerciseCategoryData
    },
  };
};


