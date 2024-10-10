import Banner from "../components/Banner";
import { GetServerSidePropsContext } from "next";
import MainLayout from "@/components/MainLayout";
import OurPrograms from "@/components/ourprograms";
import Join from "@/components/Join";
import Reasons from "@/components/Reasons";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";


const Home = () => {



    return (
    <MainLayout>

      <main className="max-w-full">

        <Banner/>

        <OurPrograms />

        <Reasons />

        <Plans />

        <Testimonials />

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

  // const citiesData = await fetch(url + `/get-city`).then((res) => res.json());

  // const stylesData = await fetch(url + `/get-travel-style`).then((res) => res.json());

  // const getInspiredCities = await fetch(url + `/get-city`).then((res) => res.json());

  return {
    props: {
      // citiesData,
      // stylesData,
      // getInspiredCities,
    },
  };
};
