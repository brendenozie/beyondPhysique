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
      <div className="relative h-screen lg:h-[80vh]">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Background Blur */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 absolute rounded-full blur-[190px] -z-10 w-96 h-96 left-0"></div>

          <div className="p-8 pt-6 flex-1 lg:flex-[3_1] flex flex-col gap-8">
            {/* Badge */}
            <div className="mt-12 sm:mt-36 bg-[#393d42] rounded-full w-fit px-5 py-3 relative flex items-center text-white shadow-lg">
              <motion.div
                className="absolute bg-indigo-500 w-24 h-4/5 left-2 top-2 z-0 rounded-[48px]"
                initial={{ left: "8px" }}
                whileInView={{ left: "8px" }}
                transition={{ duration: 1, type: "tween" }}
              ></motion.div>
              <span className="relative z-10 tracking-wide font-semibold">THE BEST FITNESS CLUB IN TOWN</span>
            </div>

            {/* Hero Text */}
            <div className="flex flex-col gap-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
              <div>
                <span className="font-outline-2 text-transparent">Shape </span>
                <span>Your</span>
              </div>
              <div>
                <span>Ideal Body</span>
              </div>
              <div className="text-base lg:text-xl font-light text-gray-300 w-full lg:w-10/12">
                <span>Let us help you shape and build your ideal body and live life to the fullest.</span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-row gap-8">
              <div className="flex flex-col">
                <span className="text-white text-3xl">
                  <NumberCounter end={140} start={100} delay={4} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase">Expert Coaches</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-3xl">
                  <NumberCounter end={978} start={878} delay={4} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase">Members Joined</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-3xl">
                  <NumberCounter end={50} delay={2} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase">Fitness Programs</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-all">
                Get Started
              </button>
              <button className="px-6 py-3 border-2 border-orange-400 text-orange-400 font-bold rounded-lg shadow-md hover:text-white hover:bg-orange-400 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="bg-indigo-500 flex-1 relative p-4 lg:p-0">
            {/* Heart Rate Info */}
            <motion.div
              initial={{ right: "-1rem" }}
              whileInView={{ right: "4rem" }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-4 bg-[#464d53] w-fit p-4 items-start rounded-md absolute right-4 lg:right-16 top-28"
            >
              <Image src={Heart} alt="heart" loader={loaderProp} className="w-8" />
              <span className="text-gray-500">Heart Rate</span>
              <span className="text-white text-2xl">116 bpm</span>
            </motion.div>

            {/* Hero Image */}
            <Image
              src={hero_image}
              loader={loaderProp}
              alt="hero_image"
              className="relative w-full max-w-xs lg:max-w-lg right-0 lg:right-28 top-20 lg:top-40 self-center"
            />
            <motion.img
              initial={{ right: "11rem" }}
              whileInView={{ right: "20rem" }}
              transition={{ duration: 1 }}
              className="absolute top-16 right-20 lg:right-80 -z-10 w-60"
              src={`${hero_image_back.src}`}
              alt=""
            />

            {/* Calories Info */}
            <motion.div
              initial={{ right: "2rem" }}
              whileInView={{ right: "6rem" }}
              transition={{ duration: 1 }}
              className="bg-[#656565] rounded-md top-[28rem] lg:top-[32rem] right-[2rem] lg:right-[28rem] flex gap-8 p-4 w-max absolute"
            >
              <Image
                src={Calories}
                loader={loaderProp}
                alt="calories"
                className="w-12"
              />
              <div className="flex flex-col">
                <span className="text-gray-400 text-lg">Calories Burned</span>
                <span className="text-white text-2xl">220 kcal</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
