import Banner from "../components/Banner";
import MainLayout from "@/components/MainLayout";
import OurPrograms from "@/components/ourprograms";
import Join from "@/components/Join";
import Reasons from "@/components/Reasons";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";
import { ISubscritption } from "@/types/typings";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { empty } from "@prisma/client/runtime/library";

type Props = {
    subscriptions:  ISubscritption[] ;
};

const Home = (props:Props) => {
    return (
    <MainLayout>
      <main className="max-w-full">
        <div className="mt-20 lg:mt-16"></div>
        <Banner/>
        <div className="mt-[28rem] lg:mt-40"></div>
        <OurPrograms />
        <div className="mt-32 lg:mt-40"></div>
        <Reasons />
        <div className="mt-32 lg:mt-40"></div>
        <Plans subscriptions={props.subscriptions}/>
        <div className="mt-32 lg:mt-40"></div>
        <Testimonials />
        <div className="mt-32 lg:mt-40"></div>
        <Join />
      </main>
    </MainLayout>
  );
}

export default Home;


export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    
    let url = process.env.NEXT_PUBLIC_API_URL;

    // Prepare all fetch requests with date range and userId as query parameters
    const fetchPromises = [
        fetch(`${url}/get-subscriptions`).then((res) => res.json()),
       ];



  try {
    // Wait for all fetch requests to complete
    const [
      subscriptions,
    ] = await Promise.all(fetchPromises);

    return {
      props: {
        subscriptions,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    // Handle error appropriately
    return {
      props: {
        subscriptions: null,
      },
    };
  }
}