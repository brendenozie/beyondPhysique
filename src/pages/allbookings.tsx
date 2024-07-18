import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCardBookings";
import MapCard from "../components/MapCard";
import { IDestination, IResult, ISuggestionFormatted } from "../types/typings";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Layout from "@/components/AdminLayout";

type Props = {
  bookings: any;
  session: Session;
};

const AllBookings = ({ bookings, session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [getBookings, setBookings] = useState(bookings);
  const [statusView, setStatusView] = useState("active pending");
  const [selectedCity, setSelectedCity] = useState<ISuggestionFormatted | null>(
    null
  );

  useEffect(() => {

    LoadBookings(statusView);

  }, [statusView]);


  // useEffect(()=>{setBookings(bookings)},[])

  async function LoadBookings(statusView: String) {
    // let url = process.env.NEXT_PUBLIC_API_URL;
    // let response = await fetch(url+`/get-all-bookings`);
    const body = { status: statusView };

    let updateBookingStatus = `${process.env.NEXT_PUBLIC_API_URL}/get-all-bookings/status`;

    let response = await fetch(updateBookingStatus, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let json = await response.json();

    setBookings(json);
  }

  return (
    <Layout>

      <main>

        <div className="mt-6 mb-6 md:flex md:items-center md:justify-between">
          <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse 
                    dark:border-gray-700 dark:divide-gray-700">

            <button className={` px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm
                        ${statusView == "active pending" ? "bg-gray-100 dark:bg-gray-800" : "dark:hover:bg-gray-800 hover:bg-gray-100"} dark:text-gray-300`} onClick={() => setStatusView("active pending")}>
              View Pending
            </button>

            <button className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm 
                         dark:text-gray-300 ${statusView == "Booking Admin Approved" ? "bg-gray-100 dark:bg-gray-800" : "dark:hover:bg-gray-800 hover:bg-gray-100"}`} onClick={() => setStatusView("Booking Admin Approved")}>
              View Accepted
            </button>

            <button className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm 
                         dark:text-gray-300 ${statusView == "Admin Cancelled" ? "bg-gray-100 dark:bg-gray-800" : "dark:hover:bg-gray-800 hover:bg-gray-100"}`} onClick={() => setStatusView("Admin Cancelled")}>
              View Cancelled
            </button>
          </div>

          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>

            <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>
        </div>

        <div className="overflow-x-auto">

          <section className="flex-grow">

            <div className="flex flex-col">
              {/* Map Available Hotels */}
              {/* {console.log(getBookings)}; */}
              {getBookings &&
                getBookings?.map((item: any) => (
                  <InfoCard
                    key={item.id}
                    item={item}
                    session={session!}
                    favorite={false}
                    booking={true}
                    fromFavPage={true}
                  />
                ))}
            </div>

          </section>

        </div>
      </main>

    </Layout>
  );
};

export default AllBookings;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const userEmail = session?.user?.email;

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  // let url = process.env.NEXT_PUBLIC_API_URL;
  // const response = await fetch(url+`/get-all-bookings/`+"active pending"
  // );

  // const json = await response.json();

  const body = { status: "active pending" };

  let updateBookingStatus = `${process.env.NEXT_PUBLIC_API_URL}/get-all-bookings/status`;

  let response = await fetch(updateBookingStatus, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let json = await response.json();

  const bookings = json;

  return {
    props: {
      bookings,
      session,
    },
  };
};
