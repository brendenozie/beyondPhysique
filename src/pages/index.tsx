import Banner from "../components/Banner";
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
        <div className="mt-[36rem] lg:mt-40"></div>
        <OurPrograms />
        <div className="mt-32 lg:mt-40"></div>
        <Reasons />
        <div className="mt-32 lg:mt-40"></div>
        <Plans />
        <div className="mt-32 lg:mt-40"></div>
        <Testimonials />
        <div className="mt-32 lg:mt-40"></div>
        <Join />
      </main>
    </MainLayout>
  );
}

export default Home;


