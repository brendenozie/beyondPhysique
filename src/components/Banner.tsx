import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import  Link  from 'react-scroll';
import { Dispatch, SetStateAction, useState } from "react";
import hero from "../../public/31.jpg";
import { motion } from "framer-motion";
import NumberCounter from 'number-counter';
import hero_image from "../assets/hero_image.png";
import hero_image_back from "../assets/hero_image_back.png";
import Heart from "../assets/heart.png";
import Calories from "../assets/calories.png";

type Props = {
  setSearchInput: Dispatch<SetStateAction<string>>;
};

const loaderProp = ({ src }: any) => {
  return src;
}


const Banner = () => {
  const { data: session } = useSession();
  let mobile = false;
  const [menuOpened, setMenuOpened] = useState(false);
  const transition = { duration: 3, type: "spring" };

  useEffect(function mount() {

    if (typeof window !== "undefined") {
      // browser code
      mobile = window.innerWidth <= 768 ? true : false
    }

  });

  return (
    <>
      <div className="relative h-screen lg:h-[80vh] ">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Background Blur */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 absolute rounded-full blur-[150px] -z-10 w-[80vw] h-[80vw] lg:w-[96] lg:h-[96] top-0 left-0"></div>

          <div className="p-6 pt-10 lg:p-8 lg:pt-6 flex-1 lg:flex-[3_1] flex flex-col gap-8">
            {/* Badge */}
            <div className="mt-10 sm:mt-20 bg-[#393d42] rounded-full w-fit px-4 sm:px-6 py-2 sm:py-3 relative flex items-center text-white shadow-lg overflow-hidden">
              <motion.div
                className="absolute bg-gradient-to-r from-indigo-500 to-purple-600 w-16 sm:w-20 h-3/4 left-1 sm:left-2 top-1 sm:top-2 z-0 rounded-[48px]"
                initial={{ left: "4px" }}
                whileInView={{ left: "8px" }}
                transition={{ duration: 1, type: "tween" }}
              ></motion.div>
              <span className="relative z-10 text-xs sm:text-sm lg:text-lg tracking-wide font-semibold">
                THE BEST FITNESS CLUB IN TOWN
              </span>
            </div>


            {/* Hero Text */}
            <div className="flex flex-col gap-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-wide">
                <span className="font-outline-2 text-transparent">Shape </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Your</span> Ideal Body
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light mb-8 max-w-lg">
                Achieve your fitness goals with personalized plans, expert trainers, and state-of-the-art facilities.
              </p>
            </div>

            {/* Stats Section */}
            <div className="flex justify-center lg:justify-start gap-6 sm:gap-8">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-white text-2xl sm:text-3xl">
                  <NumberCounter end={140} start={100} delay={4} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase text-xs sm:text-sm">Expert Coaches</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-white text-2xl sm:text-3xl">
                  <NumberCounter end={978} start={878} delay={4} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase text-xs sm:text-sm">Members Joined</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-white text-2xl sm:text-3xl">
                  <NumberCounter end={50} delay={2} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase text-xs sm:text-sm">Fitness Programs</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-6 justify-center lg:justify-start">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-all">
                Get Started
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-orange-400 text-orange-400 font-bold rounded-lg shadow-md hover:text-white hover:bg-orange-400 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="relative flex-1 flex justify-center p-4 lg:p-0">
            {/* Heart Rate Info */}
            <motion.div
              initial={{ right: "-1rem" }}
              whileInView={{ right: "4rem" }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-4 bg-[#464d53] w-fit p-4 items-start rounded-md absolute right-4 lg:right-16 top-16 lg:top-28"
            >
              <Image src={Heart} alt="heart" loader={loaderProp} className="w-8" />
              <span className="text-gray-500 text-sm sm:text-base">Heart Rate</span>
              <span className="text-white text-xl sm:text-2xl">116 bpm</span>
            </motion.div>

            {/* Hero Image */}
            <Image
              src={hero_image}
              loader={loaderProp}
              alt="hero_image"
              className="relative w-full max-w-xs lg:max-w-lg right-0 lg:right-28 top-20 lg:top-32"
            />
            <motion.img
              initial={{ right: "11rem" }}
              whileInView={{ right: "20rem" }}
              transition={{ duration: 1 }}
              className="absolute top-16 right-16 lg:right-72 -z-10 w-40 sm:w-60"
              src={`${hero_image_back.src}`}
              alt=""
            />

            {/* Calories Info */}
            <motion.div
              initial={{ right: "2rem" }}
              whileInView={{ right: "6rem" }}
              transition={{ duration: 1 }}
              className="bg-[#656565] rounded-md top-[24rem] sm:top-[28rem] lg:top-[30rem] right-[2rem] lg:right-[24rem] flex gap-4 sm:gap-8 p-4 w-max absolute"
            >
              <Image src={Calories} loader={loaderProp} alt="calories" className="w-8 sm:w-12" />
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm sm:text-lg">Calories Burned</span>
                <span className="text-white text-xl sm:text-2xl">220 kcal</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
