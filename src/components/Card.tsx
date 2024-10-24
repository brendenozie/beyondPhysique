import { IExerciseCategory } from "@/types/typings";
import React from "react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

type Props = {
    exercisesCategory: IExerciseCategory;
  };

const Card = (props: Props ) => {

	const router = useRouter();

	const handleClick = (param: string) => {
		router.push(`/viewbycatworkout/${param}`);
	};

	return (
		<div className='flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl'>
			<div className='flex flex-col items-center justify-center w-full max-w-sm mx-auto'>
				<div
					className='w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md'
					style={{
						backgroundImage: `url(${props.exercisesCategory.image})`,
						objectFit: "cover",
						objectPosition: "center",
					}}></div>

				<div className='w-56 -mt-10 mb-2 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800'>
					<h3 className='py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white'>
						{props.exercisesCategory.excName}
					</h3>

					<div className='flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700'>
						<span className='font-bold text-gray-800 dark:text-gray-200'>
							{props.exercisesCategory.excName} exercise!
						</span>
						<button
							className='px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none'
							onClick={() => handleClick(props.exercisesCategory.id)}>
							let's go
						</button>
					</div>
				</div>
			</div>
			<div className='w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100' />
		</div>
	);
};

export default Card;
