import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
import UserNavbar from "@/components/UserNavbar";
import { setDate } from "date-fns";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
// import Chart from "react-apexcharts";
 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { IWaterIntake } from "@/types/typings";
import waterbottle from "../assets/waterbottle.png";


const loaderProp =({ src  } :any) => {
  return src;
}

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
 
const chartConfig :any = {
  type: "line",
  height: 240,
  series: [
    {
        name: "Water Intake",
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
    session: Session;
    waterIntakeData?: {results:IWaterIntake[]};
  };

const Dash = (props: Props) => {

  const [wi_amount, setSelectedAmount] = useState<any>("");
  const [wi_date, setSelectedDate] = useState<any>("");
  const [wi_time, setSelectedTime] = useState<any>("");

  const [isLoading, setIsLoading] = useState(false);

  const [fpc_day,setSelectedFpDay] = useState<any>("");
  const [fpc_timehr,setSelectedFpTimeHr] = useState<any>("1");
  const [fpc_timemin,setSelectedFpTimeMin] = useState<any>("00");
  const [fpc_timeampm,setSelectedFpTimeAmPm] = useState<any>("Am");

    const router = useRouter();
    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    const pathname = usePathname();

  const onPostWaterIntake = useCallback(async () => {

    if (!props.session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    setIsLoading(true);

    const ur_l =`${process.env.NEXT_PUBLIC_API_URL}/post-water-intake`;

    await axios.post(ur_l, {wi_amount,
                            wi_date,
                            wi_time:`${fpc_timehr}:${fpc_timemin} ${fpc_timeampm}`,
                        }).then(() => {
            router.push(pathname);
        }).catch(() => {
            alert('Something went wrong.');
            setIsLoading(false);
        });
    },
    [
        wi_amount,
        wi_date,
        fpc_day,
        fpc_timehr,
        fpc_timemin,
        fpc_timeampm,
    ]);

  return (

    <UserLayout>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <UserNav/>
        <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-4 space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Middle Part */}
      <div className="flex-grow bg-white rounded-lg shadow-md p-6">
        <div className="gap-4 mb-4 bg-gray-100 p-4  rounded-md">
            <div className="text-2xl font-bold mb-4 text-black">Welcome! This is your water intake Dashboard</div>
            <div className="flex items-center mb-4 ">
              <div className="text-yellow-500 text-xl mr-2">☀️</div>
              <div className="text-lg font-normal text-black">26°C It's a <span className="text-lg text-bold font-bold">Sunny Day today!</span> <span className="text-lg text-gray-500">Don't forget to take your water bottle with you.</span></div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-green-100 text-green-700 rounded-lg p-4 flex flex-col items-center">
            <span className="text-3xl font-bold">80%</span>
            <span className="text-lg">Daily Intake</span>
            <span className="text-2xl font-bold">5000 ml</span>
          </div>
          <div className="bg-blue-100 text-blue-700 rounded-lg p-4 flex flex-col items-center">
            <span className="text-3xl font-bold">85%</span>
            <span className="text-lg">Average Intake</span>
            <span className="text-2xl font-bold">2500 ml</span>
          </div>
          <div className="bg-red-100 text-red-700 rounded-lg p-4 flex flex-col items-center">
            <span className="text-3xl font-bold">68%</span>
            <span className="text-lg">Total Intake</span>
            <span className="text-2xl font-bold">17000 ml</span>
          </div>
        </div>
        <div className="text-xl font-bold mb-4 text-gray-600">Water Intake</div>
        <div className=" mb-6">
        <div className="bg-white shadow-lg p-4" id="chartline">
                                            <Chart options={chartConfig.options}
                                                    series={chartConfig.series}
                                                    type={chartConfig.type}
                                                    height={chartConfig.height} />
                                        </div>
        </div>
        <div className="font-bold mb-2">Hydration Tips</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="font-bold text-black">Watermelon</div>
            <div className="text-gray-700">It contains 97% water in it. A good choice to stay hydrated.</div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <div className="font-bold text-black">Oranges</div>
            <div className="text-gray-700">It contains 72% water in it. Its tangy nature helps with skin care.</div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="font-bold text-black">Grapes</div>
            <div className="text-gray-700">It contains vitamin 'C' which helps with retaining water.</div>
          </div>
        </div>

        <div className="col-span-12 mt-5">
                                        <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                                            <div className="bg-white p-4 shadow-lg rounded-lg">
                                                <h1 className="font-bold text-base text-black">Water Intake History</h1>
                                                <div className="mt-4">
                                                    <div className="flex flex-col">
                                                        <div className="-my-2 overflow-x-auto">
                                                            <div className="py-2 align-middle inline-block min-w-full">
                                                                <div
                                                                    className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                                                    <table className="min-w-full divide-y divide-gray-200">
                                                                        <thead>
                                                                            <tr>
                                                                                <th
                                                                                    className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                    <div className="flex cursor-pointer">
                                                                                        <span className="mr-2">Date</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                    <div className="flex cursor-pointer">
                                                                                        <span className="mr-2">Time</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                    <div className="flex cursor-pointer">
                                                                                        <span className="mr-2">Amount</span>
                                                                                    </div>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                                        {/* {{ for(let index=0; index<5; index++){ */}
                                                                        {props.waterIntakeData?.results.map((waterintake) => (
                                                                            <tr>
                                                                            <td
                                                                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                <p className="flex  font-semibold text-gray-500">{waterintake.wi_date}</p>
                                                                                <p className="text-xs text-gray-400">
                                                                                </p>
                                                                            </td>
                                                                            <td
                                                                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                <p className="flex  font-semibold text-gray-500">{waterintake.wi_time}</p>
                                                                            </td>
                                                                            <td
                                                                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                <div className="flex text-yellow-500">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                                        className="w-5 h-5 mr-1" fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        stroke="currentColor">
                                                                                        <path stroke-linecap="round"
                                                                                            stroke-linejoin="round"
                                                                                            stroke-width="2"
                                                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                    </svg>
                                                                                    <p className="text-gray-500">{waterintake.wi_amount}</p>
                                                                                </div>
                                                                            </td>                                                                            
                                                                        </tr>
                                                                                ))} 
                                                                            

                                                                            

                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
      </div>
      {/* Right Sidebar */}
      <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-blue-500">🗓️</div>
          <div className="text-lg font-bold text-black">Tue, 24 Nov 2021</div>
        </div>
        <div className="flex flex-wrap text-black">
                {/* Right Side */}
                        <div className="">
                            <div className="flex justify-between">
                                <div className="mt-1 text-sm font-semibold leading-8">Amount in Litres</div>                                                  
                            </div>
                            <input type="search" placeholder="1" onChange={(e) => {setSelectedAmount(e.target.value)}}
                            className="form-input px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" />
                        </div>

                        <div className="">
                            <div className="flex justify-between">
                                <div className="mt-1 text-sm font-semibold leading-8">Date</div>
                                </div>
                            <input type="search" placeholder="13/6/2020" onChange={(e) => {setSelectedDate(e.target.value)}}
                            className="form-input px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" />
                        </div>

                        <div className="">
                            <div className="flex flex-col w-full">
                                <label className="leading-loose">Set Time</label>
                                <div className="relative focus-within:text-gray-600 text-gray-400">
                                <div className="mt-0 p-5 w-full bg-white rounded-lg shadow-xl">
                                    <div className="flex">
                                        <select name="hours" className="bg-transparent text-xl appearance-none outline-none"  onChange={(e) => {setSelectedFpTimeHr(e.target.value)}}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                        <span className="text-xl mr-3">:</span>
                                        <select name="minutes" className="bg-transparent text-xl appearance-none outline-none mr-4"  onChange={(e) => {setSelectedFpTimeMin(e.target.value)}}>
                                            <option value="0">00</option>
                                            <option value="30">30</option>
                                        </select>
                                        <select name="ampm" className="bg-transparent text-xl appearance-none outline-none"  onChange={(e) => {setSelectedFpTimeAmPm(e.target.value)}}>
                                            <option value="am">AM</option>
                                            <option value="pm">PM</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        
                        <div className="my-2">
                            <button onClick={onPostWaterIntake} disabled={isLoading}  className="w-full hover:bg-blue-300 font-semibold w-full justify-around bg-yellow-400 text-center hover:text-black rounded-sm shadow hover:shadow-lg py-2 px-4 border hover:border-transparent">
                                        SAVE</button>
                        </div>                
              </div>
        <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6">
          <div className="font-bold">Stay Hydrated and beat heat.</div>
          {/* <img src="/waterbottle.png" alt="Water Bottle" className="" /> */}
          <Image
                src={waterbottle}
                alt="calories"
                fill={false}
                loader={loaderProp}
                className="mt-4 w-16 mx-auto"
              />
        </div>
        <div className="font-bold text-lg mb-4 text-black">Intake Goal</div>
        <div className=" text-lg font-bold text-center mb-6 text-black">18000 ml / 25000 ml</div>
        <div className="font-bold text-lg mb-4 text-black">Drink Log</div>
        <div className="space-y-2">
          {[
            { amount: '250 ml', time: '8:00 am' },
            { amount: '200 ml', time: '9:30 am' },
            { amount: '500 ml', time: '11:00 am' },
            { amount: '200 ml', time: '1:00 pm' },
            { amount: '250 ml', time: '3:30 pm' },
          ].map((log, index) => (
            <div key={index} className="flex justify-between text-black">
              <span>{log.amount}</span>
              <span>{log.time}</span>
            </div>
          ))}
        </div>
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
    </UserLayout>

 
);
};

export default Dash;



export const getServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
  
    const session = await getSession(context);
    let url = process.env.NEXT_PUBLIC_API_URL;
  
    const waterIntakeData =  await fetch(url+`/get-water-intake`).then( (res) => res.json() );

    // const userEmail = session?.user?.email;

  
    return {
      props: {
        session,
        waterIntakeData,
      },
    };
  };