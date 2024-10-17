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
        {/* Animated Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-600 to-purple-700 blur-[150px] rounded-full -z-10 animate-pulse-slow" />
          <div className="flex flex-col lg:flex-row justify-between items-center h-full relative">
            <div className="p-6 pt-10 lg:p-8 lg:pt-6 flex-1 lg:flex-[3_1] flex flex-col gap-8">
              {/* Animated Badge */}
              

              <div className="mt-10 sm:mt-20 bg-[#393d42] rounded-full w-fit px-4 sm:px-6 py-2 sm:py-3 relative flex items-center text-white shadow-lg overflow-hidden">
                <motion.div
                  className="absolute bg-gradient-to-r from-pink-500 via-purple-600 to-purple-700 w-20 sm:w-24 h-full left-1 sm:left-2 top-0 z-0 rounded-3xl animate-shimmer"
                  initial={{ left: "-20px" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <span className="relative z-10 text-xs sm:text-sm lg:text-lg tracking-wide font-semibold whitespace-nowrap">
                  Train Anywhere Anytime
                </span>
              </div>

              {/* Hero Text with Animation */}
              <div className="flex flex-col gap-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center lg:text-left">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-wide"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <span className="font-outline-2 text-transparent">Discover </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 animate-gradient-text">
                    Your
                  </span>{" "}
                  Perfect Body
                </motion.h1>
                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Achieve your goals with world-class facilities, expert trainers, and personalized programs.
                </motion.p>
              </div>

              {/* Stats Section with Hover Effects */}
              <div className="flex justify-center lg:justify-start gap-6 sm:gap-10">
                {[
                  { value: 140, label: "Expert Coaches" },
                  { value: 978, label: "Members Joined" },
                  { value: 50, label: "Fitness Programs" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center lg:items-start hover:scale-105 transition-transform"
                  >
                    <span className="text-white text-3xl sm:text-4xl font-bold">
                      <NumberCounter end={stat.value} start={stat.value - 40} delay={4} preFix="+" />
                    </span>
                    <span className="text-gray-400 uppercase text-sm">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons with Enhanced Animation */}
              <div className="flex space-x-4 mt-6 justify-center lg:justify-start">
                <button className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-full shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105">
                  Join Now
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full shadow-lg hover:bg-white hover:text-gray-900 transition-transform transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Side Content with More Motion */}
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

              {/* Hero Image with Subtle Motion */}
              <motion.img
                src={hero_image.src}
                alt="hero_image"
                className="relative w-full max-w-xs lg:max-w-lg right-0 lg:right-28 top-20 lg:top-32"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
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
