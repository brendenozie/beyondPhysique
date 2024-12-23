import UserLayout from "@/components/UserLayout";
import UserNav from "@/components/UserNav";
// import Chart from "react-apexcharts";
 
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { IExerciseCategory } from "@/types/typings";

import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Card from "@/components/Card";


type Props = {
    exercisesCategoryData?: IExerciseCategory[];
    session: Session;
  };
  

const Dash2 = (props: Props) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [bodyPartList, setBodyPartList] = useState([{}]);
	const [loading, setLoading] = useState(false);
	

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <UserLayout>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white w-full">
      <UserNav/>
        <div className="container mx-auto">

        <div className='w-full h-full'>
			<div className='relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
				<div className='absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0'>
					<svg
						viewBox='0 0 88 88'
						className='w-full max-w-screen-xl text-indigo-100'>
						<circle fill='currentColor' cx='44' cy='44' r='15.5' />
						<circle
							fillOpacity='0.2'
							fill='currentColor'
							cx='44'
							cy='44'
							r='44'
						/>
						<circle
							fillOpacity='0.2'
							fill='currentColor'
							cx='44'
							cy='44'
							r='37.5'
						/>
						<circle
							fillOpacity='0.3'
							fill='currentColor'
							cx='44'
							cy='44'
							r='29.5'
						/>
						<circle
							fillOpacity='0.3'
							fill='currentColor'
							cx='44'
							cy='44'
							r='22.5'
						/>
					</svg>
				</div>
				{!loading ? (
					<div className='relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
						{props.exercisesCategoryData &&
							props.exercisesCategoryData.map((item, index) => (
								<Card
                                    key={index}
                                    exercisesCategory={item}								/>
							))}
					</div>
				) : (
					// <Skeleton arrLength={8} />
                    <div></div>
				)}
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

    // const userEmail = session?.user?.email;

    let url = process.env.NEXT_PUBLIC_API_URL;
  
    const exercisesCategoryData =  await fetch(url+`/get-exercise-category`).then( (res) => res.json() );
  
    return {
      props: {
        session,
        exercisesCategoryData : exercisesCategoryData.results,
      },
    };
  };
