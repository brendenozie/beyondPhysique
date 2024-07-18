import RightSide from "@/components/RightSide";
import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import UserSide from "@/components/UserSide";
import { ChartPieIcon, CalendarDaysIcon, UserCircleIcon, WrenchIcon, ChatBubbleLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Console } from "console";
// import Chart from "react-apexcharts";
 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

import { IFoodPlan , IFoodPlanCategory} from "@/types/typings";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";
import AddFoodPlanSchedule from "@/components/AddFoodPlanSchedule";
import { GetServerSidePropsContext } from "next";


type Props = {
    foodPlanCategoryData?: {results:IFoodPlanCategory[]};
    foodPlanData?: {results:IFoodPlan[]};
    session: Session;
    // stylesData: {results:ITravelStyle[]};
    // getInspiredCities: ICity[];
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
          <div className="flex flex-wrap items-center">
            
          <div className="text-gray-700">
          

{/* component 1 */}

<div className="flex flex-grow overflow-auto"> 
    <div className="flex flex-col flex-grow">
    <div className="px-4 md:px-10 py-4 md:py-7 w-full">
                <div className="flex items-center justify-between">
                    <p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-500">My Food Plan Schedule</p>
                                         
                    <Link href="?modal=true">
                        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                            <p className="text-sm font-medium leading-none text-white">Add Food Plan </p>
                        </button>
                    </Link>
                </div>
            </div>

          <div className="flex w-full items-center justify-center py-8 px-4">
            <div className="flex flex-wrap w-full shadow-lg">                 
                <div className="w-full md:w-4/12 lg:w-4/12 px-6 mr-auto ml-auto">
                    <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
                        <div className="px-4 flex items-center justify-between">
                            <span  tabIndex={0} className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">October 2020</span>
                            <div className="flex items-center">
                                <button aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="15 6 9 12 15 18" />
                                </svg>
                            </button>
                            <button aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"> 
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </button>

                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-12 overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Mo</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Tu</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">We</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Th</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Fr</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Sa</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div className="w-full flex justify-center">
                                                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">Su</p>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="pt-6">
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                                        </td>
                                        <td className="pt-6">
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                                        </td>
                                        <td className="pt-6">
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">1</p>
                                            </div>
                                        </td>
                                        <td className="pt-6">
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">2</p>
                                            </div>
                                        </td>
                                        <td className="pt-6">
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100">3</p>
                                            </div>
                                        </td>
                                        <td className="pt-6">
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100">4</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">5</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">6</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">7</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="w-full h-full">
                                                <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                                    <a  role="link" tabIndex={0} className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full">8</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">9</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100">10</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100">11</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">12</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">13</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">14</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">15</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">16</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100">17</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100">18</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">19</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">20</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">21</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">22</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">23</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100">24</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100">25</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">26</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">27</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">28</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">29</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                <p className="text-base text-gray-500 dark:text-gray-100 font-medium">30</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-8/12">
                    <div className="flex flex-wrap w-full shadow-lg justify-center">
                        <div className="w-full md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
                        {props.foodPlanData?.results.map((foodPlan) => (
                            <div className="px-4 pt-4">
                                <div className="border-b pb-4 border-gray-400 border-dashed">
                                    <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300 pb-4">{foodPlan.fp_day} {foodPlan.fp_time} </p>
                                    <a tabIndex={0} className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">{foodPlan.fp_name}</a>
                                    <p className="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">{foodPlan.fp_description}</p>
                                </div>
                            </div>
                        ))}
                        </div>     
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-center mt-4">
            <div className="flex ml-6">
                {/* Navigation buttons */}
                <button>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
            </div>
            <h2 className="ml-2 text-xl font-bold leading-none">September, 2020</h2>
        </div>
        <div className="grid grid-cols-7 mt-4">
            {/* Days of the week */}
                <div className="pl-1 text-sm">Mon</div>
                <div className="pl-1 text-sm">Tue</div>
                <div className="pl-1 text-sm">Wed</div>
                <div className="pl-1 text-sm">Thu</div>
                <div className="pl-1 text-sm">Fri</div>
                <div className="pl-1 text-sm">Sat</div>
                <div className="pl-1 text-sm">Sun</div>
        </div>
        <div className="grid flex-grow w-full grid-cols-7 grid-rows-5 gap-px pt-px mt-1 bg-gray-200">
            {/* Calendar days */}

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">1 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">2 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">3 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">4 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">5 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">6 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">7 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>


            
            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">1 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">2 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">3 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">4 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">5 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">6 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">7 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>


            
            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">1 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">2 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">3 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">4 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">5 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">6 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">7 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>


            
            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">1 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">2 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">3 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">4 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">5 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">6 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs md:text-sm font-bold">7 September</span>
                <div className="flex flex-col px-1 py-1 overflow-auto">
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>



        </div>
    </div>
</div>













</div>

<a className="fixed flex items-center justify-center h-8 pr-2 pl-1 bg-blue-600 rounded-full bottom-0 right-0 mr-4 mb-4 shadow-lg text-blue-100 hover:bg-blue-600" href="https://twitter.com/lofiui" target="_top">
<div className="flex items-center justify-center h-6 w-6 bg-blue-500 rounded-full">
    <svg className="w-4 h-4 fill-current r-jwli3a r-4qtqp9 r-yyyyoo r-16y2uox r-1q142lx r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue" viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
</div>
<span className="text-sm ml-1 leading-none">@Brenden</span>
</a> 
          
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
        <AddFoodPlanSchedule foodPlanCategoryData={props.foodPlanCategoryData} session={props.session}/>
      </Suspense>
      
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
  
    const foodPlanCategoryData =  await fetch(url+`/get-foodplan-category`).then( (res) => res.json() );
    const foodPlanData =  await fetch(url+`/get-food-plan`).then( (res) => res.json() );
  
    return {
      props: {
        session,
        foodPlanCategoryData,
        foodPlanData
      },
    };
  };



{/* <!-- Component Start --> */}
{/* <div className="flex flex-grow w-screen h-screen overflow-auto"> 
        
        <div className="flex flex-col flex-grow">
            <div className="flex items-center mt-4">
                <div className="flex ml-6">
                    <button>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <h2 className="ml-2 text-xl font-bold leading-none">September, 2020</h2>
            </div>
            <div className="grid grid-cols-7 mt-4">
                <div className="pl-1 text-sm">Mon</div>
                <div className="pl-1 text-sm">Tue</div>
                <div className="pl-1 text-sm">Wed</div>
                <div className="pl-1 text-sm">Thu</div>
                <div className="pl-1 text-sm">Fri</div>
                <div className="pl-1 text-sm">Sat</div>
                <div className="pl-1 text-sm">Sun</div>
            </div>
            <div className="grid flex-grow w-full h-auto grid-cols-7 grid-rows-5 gap-px pt-px mt-1 bg-gray-200">
                <div></div>
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">1 September</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">2</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">3</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">4</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">5</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">6</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">7</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">8</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">9</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">10</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">11</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">12</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">13</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">14</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">15</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">16</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">17</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">18</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">19</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">20</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">21</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">22</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">23</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">24</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">25</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">26</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">27</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">28</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">29</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
                <div className="relative flex flex-col bg-white group">
                    <span className="mx-2 my-1 text-xs font-bold">30</span>
                    <div className="flex flex-col px-1 py-1 overflow-auto">
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">8:30am</span>
                            <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                        </button>
                        <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                            <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                            <span className="ml-2 font-light leading-none">2:15pm</span>
                            <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                        </button>
                    </div>
                    <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                        <svg className="w-5 h-5 w-6 h-6 plus"  viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                
            </div>
        </div>
    </div> */}
{/* <!-- Component End  --> */}