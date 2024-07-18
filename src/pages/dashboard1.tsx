import UserLayout from "@/components/UserLayout";
import UserNavbar from "@/components/UserNavbar";
// import Chart from "react-apexcharts";
 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import dynamic from "next/dynamic";
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


type Props = {};

const Dash = (props: Props) => {

  return (

    <UserLayout>
            <div className="flex flex-col flex-1 w-full overflow-y-auto">
            <UserNavbar/>
                <main className="">
                    <div className="flex flex-row  h-fit">
                        <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-yellow-400 w-3/4 h-fit">
                            <div className="grid grid-cols-9 gap-6">
                                <div className="grid grid-cols-9 col-span-9 gap-6 xxl:col-span-9">
                                    <div className="col-span-12 mt-8">
                                        <div className="grid grid-cols-9 gap-6 mt-5">
                                            <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                                href="#">
                                                <div className="p-5">
                                                    <div className="flex justify-between">
                                                        <div className="mt-1 text-md font-semibold leading-8">Balance</div>
                                                        <div className="mt-1 text-base text-gray-600">...</div>                                                        
                                                    </div>
                                                    <div className="flex justify-between">                                                        
                                                            <div className="mt-1 text-xl font-bold leading-8">Ksh 45.10</div>
                                                            <div
                                                                className="bg-yellow-300 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                                <span className="flex items-center text-yellow-700">10%</span>
                                                            </div>                                                            
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                                href="#">
                                                <div className="p-5">
                                                    <div className="flex justify-between">                                                    
                                                        <div className="mt-1 text-md font-semibold leading-8">This Months Income</div>
                                                        <div className="mt-1 text-base text-gray-600">...</div>
                                                    </div>
                                                    <div className="flex justify-between">                                                        
                                                            <div className="mt-1 text-xl font-bold leading-8">Ksh 2.300</div>
                                                            <div
                                                                className="bg-yellow-300 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                                <span className="flex items-center text-yellow-700">12%</span>
                                                            </div>                                                            
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                                href="#">
                                                <div className="p-5">
                                                    <div className="flex justify-between">                                                    
                                                        <div className="mt-1 text-md font-semibold leading-8">Expenses this month</div>
                                                        <div className="mt-1 text-base text-gray-600">...</div>
                                                    </div>
                                                    <div className="flex justify-between">                                                        
                                                            <div className="mt-1 text-xl font-bold leading-8">Ksh 1.230</div>
                                                            <div
                                                                className="bg-red-300 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                                <span className="flex items-center text-red-700">2%</span>
                                                            </div>                                                            
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-span-12 mt-5">
                                        <div className="bg-white shadow-lg p-4" id="chartline">
                                            <Chart options={chartConfig.options}
                                                    series={chartConfig.series}
                                                    type={chartConfig.type}
                                                    height={chartConfig.height} />
                                        </div>
                                    </div>
                                    <div className="col-span-12 mt-5">
                                        <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                                            <div className="bg-white p-4 shadow-lg rounded-lg">
                                                <h1 className="font-bold text-base">Transaction History</h1>
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
                                                                                        <span className="mr-2">Transaction</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                    <div className="flex cursor-pointer">
                                                                                        <span className="mr-2">ID</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                    <div className="flex cursor-pointer">
                                                                                        <span className="mr-2">Amount</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                    <div className="flex cursor-pointer">
                                                                                        <span className="mr-2">Date</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                                    <div className="flex cursor-pointer">
                                                                                        <span className="mr-2">Account</span>
                                                                                    </div>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                                        {/* {{ for(let index=0; index<5; index++){ */}
                                                                        {/* {mockData.map((order, id) => ( 

                                                                                ))} */}
                                                                            <tr>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p className="flex  font-semibold">Ben Trade</p>
                                                                                    <p className="text-xs text-gray-400">
                                                                                    </p>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p className="flex  font-semibold">#A213</p>
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
                                                                                        <p>Ksh 18.65</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex font-semibold">
                                                                                        <p>Wed 1:00 P.M</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex  font-semibold">
                                                                                        <p>VISA 123...</p>
                                                                                    </div>
                                                                                </td>
                                                                                {/* <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex space-x-4">
                                                                                        <a href="#" className="text-blue-500 hover:text-blue-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                                        </svg>
                                                                                        <p>Edit</p>
                                                                                        </a>
                                                                                        <a href="#" className="text-red-500 hover:text-red-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1 ml-3"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                        </svg>
                                                                                        <p>Delete</p>
                                                                                        </a>
                                                                                    </div>
                                                                                </td> */}
                                                                            </tr>

                                                                            <tr>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p className="flex  font-semibold">Ben Trade</p>
                                                                                    <p className="text-xs text-gray-400">
                                                                                    </p>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p className="flex  font-semibold">#A213</p>
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
                                                                                        <p>Ksh 18.65</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex font-semibold">
                                                                                        <p>Wed 1:00 P.M</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex  font-semibold">
                                                                                        <p>VISA 123...</p>
                                                                                    </div>
                                                                                </td>
                                                                                {/* <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex space-x-4">
                                                                                        <a href="#" className="text-blue-500 hover:text-blue-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                                        </svg>
                                                                                        <p>Edit</p>
                                                                                        </a>
                                                                                        <a href="#" className="text-red-500 hover:text-red-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1 ml-3"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                        </svg>
                                                                                        <p>Delete</p>
                                                                                        </a>
                                                                                    </div>
                                                                                </td> */}
                                                                            </tr>

                                                                            <tr>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p className="text-md font-semibold">Ben Trade</p>
                                                                                    <p className="text-xs text-gray-400">
                                                                                    </p>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p className="flex font-semibold">#A213</p>
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
                                                                                        <p>Ksh 18.65</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex font-semibold">
                                                                                        <p>Wed 1:00 P.M</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex  font-semibold">
                                                                                        <p>VISA 123...</p>
                                                                                    </div>
                                                                                </td>
                                                                                {/* <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex space-x-4">
                                                                                        <a href="#" className="text-blue-500 hover:text-blue-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                                        </svg>
                                                                                        <p>Edit</p>
                                                                                        </a>
                                                                                        <a href="#" className="text-red-500 hover:text-red-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1 ml-3"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                        </svg>
                                                                                        <p>Delete</p>
                                                                                        </a>
                                                                                    </div>
                                                                                </td> */}
                                                                            </tr>

                                                                            <tr>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p className="flex  font-semibold">Ben Trade</p>
                                                                                    <p className="text-xs text-gray-400">
                                                                                    </p>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <p className="flex  font-semibold">#A213</p>
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
                                                                                        <p>Ksh 18.65</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex font-semibold">
                                                                                        <p>Wed 1:00 P.M</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex  font-semibold">
                                                                                        <p>VISA 123...</p>
                                                                                    </div>
                                                                                </td>
                                                                                {/* <td
                                                                                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                                                    <div className="flex space-x-4">
                                                                                        <a href="#" className="text-blue-500 hover:text-blue-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                                        </svg>
                                                                                        <p>Edit</p>
                                                                                        </a>
                                                                                        <a href="#" className="text-red-500 hover:text-red-600">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            className="w-5 h-5 mr-1 ml-3"
                                                                                            fill="none" viewBox="0 0 24 24"
                                                                                            stroke="currentColor">
                                                                                            <path stroke-linecap="round"
                                                                                                stroke-linejoin="round"
                                                                                                stroke-width="2"
                                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                        </svg>
                                                                                        <p>Delete</p>
                                                                                        </a>
                                                                                    </div>
                                                                                </td> */}
                                                                            </tr>

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
                            </div>
                        </div>
                        <div className="shadow-xl rounded-l-md col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white w-1/4 h-fit py-8">
                                <div className="p-5">
                                    <div className="flex justify-between">
                                        <div className="mt-1 text-md font-bold leading-8">My Card</div>
                                        <div className="mt-1 text-sm leading-8">+Add Card</div>                                                        
                                    </div>
                                    <div className="mt-4 h-44">                                                        
                                        {/* <!-- component -->
                                        <!-- Tailwind CSS Playground : https://play.tailwindcss.com/ATVteKFRxw --> */}

                                        <figure className="top-8 left-1 ">
                                            <div className="credit-card w-max h-max relative select-none pointer-events-none">
                                                {/* <!-- Card verso --> */}
                                                <div className="verso z-1 absolute overflow-hidden transform translate-y-4 left-4 w-56 h-32 rounded-2xl bg-gray-100 shadow-2xl">
                                                    <div className="w-full h-12 bg-gray-200 absolute top-1">&nbsp;</div>
                                                </div>

                                                {/* <!-- Card recto --> */}
                                                <div className="recto z-2 absolute overflow-hidden w-56 h-32 rounded-2xl px-4 py-6 bg-red-400 text-white shadow-xl flex flex-col justify-end gap-1">
                                                {/* <!-- Visa logo --> */}
                                                <div className="logo absolute top-4 right-2 w-6 h-2 flex justify-items-center items-center">
                                                    <svg viewBox="0 0 1000 324.68"><path d="m651.19 0.5c-70.933 0-134.32 36.766-134.32 104.69 0 77.9 112.42 83.281 112.42 122.42 0 16.478-18.884 31.229-51.137 31.229-45.773 0-79.984-20.611-79.984-20.611l-14.638 68.547s39.41 17.41 91.734 17.41c77.552 0 138.58-38.571 138.58-107.66 0-82.316-112.89-87.536-112.89-123.86 0-12.908 15.502-27.052 47.663-27.052 36.287 0 65.892 14.99 65.892 14.99l14.326-66.204s-32.213-13.897-77.642-13.897zm-648.97 4.9966-1.7176 9.9931s29.842 5.4615 56.719 16.356c34.607 12.493 37.072 19.765 42.9 42.354l63.511 244.83h85.137l131.16-313.53h-84.942l-84.278 213.17-34.39-180.7c-3.1539-20.681-19.129-32.478-38.684-32.478h-135.41zm411.87 0-66.634 313.53h80.999l66.4-313.53h-80.765zm451.76 0c-19.532 0-29.88 10.457-37.474 28.73l-118.67 284.8h84.942l16.434-47.467h103.48l9.9931 47.467h74.948l-65.385-313.53h-68.273zm11.047 84.707 25.178 117.65h-67.454l42.276-117.65z" fill="#fff" /></svg>
                                                </div>

                                                {/* <!-- PIN --> */}
                                                <div className="pin w-6 h-2 rounded bg-yellow-100">&nbsp;</div>

                                                {/* <!-- Card number --> */}
                                                <div className="number whitespace-nowrap text-xs font-normal" style={{fontFamily:"Courier new, mono;"}}>4242&nbsp;4242&nbsp;4242&nbsp;4242</div>

                                                {/* <!-- Card infos --> */}
                                                <div className="credentials flex gap-1 justify-between">
                                                    <div className="owner flex flex-col w-max">
                                                    <span className="text-xs uppercase">Card holder</span>
                                                    <span className="whitespace-nowrap text-xs">John DOE</span>
                                                    </div>
                                                    <div className="expires flex flex-col w-max">
                                                    <span className="text-xs uppercase">Expires</span>
                                                    <span className="whitespace-nowrap text-xs">09/21</span>
                                                    </div>
                                                    <div className="cvc flex flex-col w-max">
                                                    <span className="text-xs uppercase">cvc</span>
                                                    <span className="whitespace-nowrap text-xs">123</span>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </figure>                                                         
                                    </div>
                                </div>

                                <div className="pt-1 px-5">
                                    <div className="flex justify-between">
                                        <div className="mt-1 text-sm font-semibold leading-8">Card Holder</div>                                                       
                                    </div>
                                    <div className="flex justify-between">                                                        
                                            <div className="text-sm font-semibold leading-8 text-gray-500">John Doe</div>                                                
                                    </div>
                                </div>
                                <div className="pt-1 px-5">
                                    <div className="flex justify-between">
                                        <div className="mt-1 text-sm font-semibold leading-8">Card Number</div>                                                       
                                    </div>
                                    <div className="flex justify-between">                                                        
                                            <div className="text-sm font-semibold leading-8 text-gray-500">1456 4567 8909 4567 9867</div>                                                          
                                    </div>
                                </div>
                                
                                <div className="pt-2 px-5">
                                    <div className="flex flex-row flex-1 justify-between items-center text-center">
                                        <div>
                                            <div className="flex-col w-full">
                                                <div className="text-sm font-semibold leading-8">Status</div>                                                         
                                                    <div className="text-sm font-semibold leading-8 text-gray-500">Active</div>                                                          
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex-col w-full">
                                                <div className="text-sm font-semibold leading-8">Expire Date</div>                                                       
                                                    <div className="text-sm font-semibold leading-8 text-gray-500">04/25</div>                                                          
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex-col w-full">
                                                <div className="text-sm font-semibold leading-8">Category</div>                                                                                                             
                                                <div className="text-sm font-semibold leading-8 text-gray-500">Platinum</div>                                                          
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-2 px-5">
                                    <div className="flex justify-between">
                                        <div className="mt-1 text-sm font-semibold leading-8">Quick Transaction</div>
                                        <div className="mt-1 text-sm font-semibold leading-8">...</div>                                                       
                                    </div>
                                    <div className="flex justify-between">                                                        
                                            <div className="text-sm font-semibold leading-8">...</div>                                                          
                                    </div>
                                </div>

                                <div className="py-2 px-5">
                                    <div className="flex justify-between">
                                        <div className="mt-1 text-sm font-semibold leading-8">Recepient's Account</div>                                                  
                                    </div>
                                    <input type="search" placeholder="4843-1234-3422-9430" 
                                    className="form-input px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" />
                                </div>

                                <div className="py-2 px-5">
                                    <div className="flex justify-between">
                                        <div className="mt-1 text-sm font-semibold leading-8">Amount</div>
                                        </div>
                                    <input type="search" placeholder="4320.00" 
                                    className="form-input px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" />
                                </div>

                                <div className="py-2 px-5">
                                    <a href="#" className="hover:bg-blue-300 font-semibold w-24 justify-around bg-yellow-400 text-center hover:text-black rounded-full shadow hover:shadow-lg py-2 px-4 border hover:border-transparent">
                                                SEND</a>
                                </div>

                        </div>
                    </div>
                </main>
            </div>
            {/* <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <script>
            function data() {
            
                return {
                
                    isSideMenuOpen: false,
                    toggleSideMenu() {
                        this.isSideMenuOpen = !this.isSideMenuOpen
                    },
                    closeSideMenu() {
                        this.isSideMenuOpen = false
                    },
                    isNotificationsMenuOpen: false,
                    toggleNotificationsMenu() {
                        this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen
                    },
                    closeNotificationsMenu() {
                        this.isNotificationsMenuOpen = false
                    },
                    isProfileMenuOpen: false,
                    toggleProfileMenu() {
                        this.isProfileMenuOpen = !this.isProfileMenuOpen
                    },
                    closeProfileMenu() {
                        this.isProfileMenuOpen = false
                    },
                    isPagesMenuOpen: false,
                    togglePagesMenu() {
                        this.isPagesMenuOpen = !this.isPagesMenuOpen
                    },
                
                }
            }
        </script>
        <script>
            var chart = document.querySelector('#chartline')
            var options = {
                series: [{
                    name: 'TEAM A',
                    type: 'area',
                    data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
                }, {
                    name: 'TEAM B',
                    type: 'line',
                    data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
                }],
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                stroke: {
                    curve: 'smooth'
                },
                fill: {
                    type: 'solid',
                    opacity: [0.35, 1],
                },
                labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09 ',
                    'Dec 10', 'Dec 11'
                ],
                markers: {
                    size: 0
                },
                yaxis: [{
                        title: {
                            text: 'Series A',
                        },
                    },
                    {
                        opposite: true,
                        title: {
                            text: 'Series B',
                        },
                    },
                ],
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function(y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(0) + " points";
                            }
                            return y;
                        }
                    }
                }
            };
            var chart = new ApexCharts(chart, options);
            chart.render();
        </script>
        <script>
            var chart = document.querySelector('#chartpie')
            var options = {
                series: [44, 55, 67, 83],
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            name: {
                                fontSize: '22px',
                            },
                            value: {
                                fontSize: '16px',
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                formatter: function(w) {
                                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                    return 249
                                }
                            }
                        }
                    }
                },
                labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
            };
            var chart = new ApexCharts(chart, options);
            chart.render();
        </script> 
        */}
{/* // </Layout> */}
        
        </UserLayout>
 
);
};

export default Dash;