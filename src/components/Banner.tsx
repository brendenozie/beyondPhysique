import React, { useEffect } from "react";
import { ICity } from "@/types/typings";
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
  getInspiredCities: ICity[];
  setSearchInput: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<ICity | null>>;
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
      <div className="relative h-[900px] sm:h-[900px] lg:h-[900px] xl:h-[900px] 2xl:h-[730px]">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="bg-[#4f46e5] absolute rounded-full blur-[190px] -z-10 w-96 h-96 left-0"></div>
          <div className="p-8 pt-6 flex-1 lg:flex-[3_1] flex flex-col gap-8">
            {/* the best ad */}
            <div className="mt-12 sm:mt-36 bg-[#393d42] rounded-full object-fill w-fit px-3.5 py-5 relative flex items-center text-white">
              <motion.div
                className="absolute bg-[#4f46e5] w-24 h-4/5 left-2 top-2 z-0 rounded-[48px]"
                initial={{ left: "8px" }}
                whileInView={{ left: "8px" }}
                transition={{ ...transition, type: "tween" }}
              ></motion.div>
              <span className="relative z-10 tracking-wide">THE BEST FITNESS CLUB IN THE TOWN</span>
            </div>
            {/* Hero text */}
            <div className="flex flex-col gap-6 uppercase text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-clip overflow-hidden">
              <div>
                <span className="font-outline-2 text-transparent">Shape </span>
                <span>Your</span>
              </div>
              <div>
                <span>Ideal body</span>
              </div>
              <div className="text-base font-extralight normal-case tracking-wide w-full lg:w-10/12">
                <span>
                  In here we will help you to shape and build your ideal body and
                  live up your life to fullest
                </span>
              </div>
            </div>
            {/* experience figures */}
            <div className="flex flex-row sm:flex-row gap-6">
              <div className="flex flex-col">
                <span className="text-white text-3xl">
                  <NumberCounter end={140} start={100} delay={4} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase">expert coaches</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-3xl">
                  <NumberCounter end={978} start={878} delay={4} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase">Members joined</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-3xl">
                  <NumberCounter end={50} delay={2} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase">fitness programs</span>
              </div>
            </div>
            {/* hero buttons */}
            <div className="flex gap-4 !font-normal">
              <button className="p-[0.05rem] font-bold border: 4px solid transparent transition-all duration-300 flex items-center justify-center text-white bg-[#f48915] w-32">Get Started</button>
              <button className="p-[0.05rem] font-bold border: 4px solid transparent transition-all duration-300 flex items-center justify-center text-white bg-transparent w-32 border-2 border-orange-400">Learn More</button>
            </div>
          </div>
          
        </div>
      </div>

    </>
  );
};

export default Banner;
