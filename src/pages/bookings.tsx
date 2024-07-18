import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCardMyBooking";
import MapCard from "../components/MapCard";
import { IResult, ISuggestionFormatted } from "../types/typings";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

type Props = {
  bookings: any[];
  session: Session;
};

const Bookings = ({ bookings, session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<ISuggestionFormatted | null>(
    null
  );

  return (
    <div>
      <Header />
      <div className=" h-[120px] sm:h-[120px] lg:h-[120px] xl-h-[120px] 2xl:h-[120px] bg-black">

      </div>
      <main
        className={`flex ${!bookings && "flex-col max-w-4xl mx-auto"} `}
      >
        {/* Left Section */}
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            My Bookings
          </h1>

          
          <div className="flex flex-col">
            {/* Map Available Hotels */}
            {bookings &&
              bookings?.map((item) => (
                <InfoCard
                key={item.img}
                item={item}
                session={session!}
                favorite={false}
                booking={true}
                fromFavPage={true}
              />
              ))}
          </div>
        </section>
        {/* MapBox, Right Section */}
        {bookings ? (
          <section className="hidden lg:inline-flex xl:min-w-[600px]">
            <div className="sticky top-[68px] w-full h-screen">
              <MapCard searchResults={bookings} />
            </div>
          </section>
        ) : (
          <div className="font-semilight max-w-sm mb-[155px] mx-auto text-center">
            <FaceFrownIcon className="mx-auto max-w-[300px]" />
            <p>
              {`Sorry, there are no Bookings yet . Get your history booking by booking with us.`}
            </p>
          </div>
        )}
      </main>
      <Footer />
      {/* Drawer Menu, hided by default */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-item">
          <Link href={"/favorites"}>List of Favorites</Link>
        </p>
        <p className="drawer-item">
          <Link href={"/bookings"}>Your Bookings</Link>
        </p>
        <p onClick={() => signOut()} className="drawer-item">
          Sign out
        </p>
      </Drawer>
    </div>
  );
};

export default Bookings;

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

  let url = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(url+`/get-bookings?userEmail=${userEmail}`
  );

  const json = await response.json();

  const bookings = json;

  return {
    props: {
      bookings,
      session,
    },
  };
};
