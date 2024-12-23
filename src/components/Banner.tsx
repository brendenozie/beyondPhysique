"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion as MotionComponent } from "framer-motion";
import NumberCounter from "number-counter";
import hero_image from "../assets/hero_image.png";
import hero_image_back from "../assets/hero_image_back.png";
import Heart from "../assets/heart.png";
import Calories from "../assets/calories.png";

const loaderProp = ({ src }: any) => {
  return src;
}

const Banner = () => {
  const { data: session, status } = useSession();
  const [mobile, setMobile] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const transition = { duration: 3, type: "spring" };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setMobile(window.innerWidth <= 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="relative h-screen lg:h-[80vh]">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-600 to-purple-700 blur-[150px] rounded-full -z-10 animate-pulse-slow" />
      <div className="flex flex-col lg:flex-row justify-between items-center h-full relative">
        <div className="p-6 pt-10 lg:p-8 lg:pt-6 flex-1 lg:flex-[3_1] flex flex-col gap-8">
          <div className="mt-10 sm:mt-20 bg-[#393d42] rounded-full w-fit px-4 sm:px-6 py-2 sm:py-3 relative flex items-center text-white shadow-lg overflow-hidden">
            <MotionComponent.div
              className="absolute bg-gradient-to-r from-pink-500 via-purple-600 to-purple-700 w-20 sm:w-24 h-full left-1 sm:left-2 top-0 z-0 rounded-3xl animate-shimmer"
              initial={{ left: "-20px" }}
              animate={{ left: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            ></MotionComponent.div>
            <span className="relative z-10 text-xs sm:text-sm lg:text-lg tracking-wide font-semibold whitespace-nowrap">
              Train Anywhere Anytime
            </span>
          </div>

          <div className="flex flex-col gap-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center lg:text-left">
            <MotionComponent.h1
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
            </MotionComponent.h1>
            <MotionComponent.p
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light mb-8 max-w-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Achieve your goals with world-class facilities, expert trainers, and personalized programs.
            </MotionComponent.p>
          </div>

          <MotionComponent.div
            className="flex justify-center lg:justify-start gap-6 sm:gap-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 2 }}
          >
            {[{ value: 140, label: "Expert Coaches" }, { value: 978, label: "Members Joined" }, { value: 50, label: "Fitness Programs" }].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start hover:scale-105 transition-transform">
                <span className="text-white text-3xl sm:text-4xl font-bold">
                  <NumberCounter end={stat.value} start={stat.value - 40} delay={4} preFix="+" />
                </span>
                <span className="text-gray-400 uppercase text-sm">{stat.label}</span>
              </div>
            ))}
          </MotionComponent.div>

          <div className="flex space-x-4 mt-6 justify-center lg:justify-start">
            <button className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-full shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105">
              Join Now
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full shadow-lg hover:bg-white hover:text-gray-900 transition-transform transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative flex-1 flex justify-center p-4 lg:p-0">
          <MotionComponent.div
            initial={{ right: "-1rem" }}
            whileInView={{ right: "4rem" }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-4 bg-[#464d53] w-fit p-4 items-start rounded-md absolute right-4 lg:right-16 top-16 lg:top-28"
          >
            <Image src={Heart} alt="heart" loader={loaderProp} className="w-8" />
            <span className="text-gray-500 text-sm sm:text-base">Heart Rate</span>
            <span className="text-white text-xl sm:text-2xl">116 bpm</span>
          </MotionComponent.div>

          <MotionComponent.img
            src={hero_image.src}
            alt="hero_image"
            className="relative w-full max-w-xs lg:max-w-lg right-0 lg:right-28 top-20 lg:top-32"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />

          <MotionComponent.img
            initial={{ right: "11rem" }}
            whileInView={{ right: "20rem" }}
            transition={transition}
            src={hero_image_back.src}
            alt="hero_image_back"
            className="absolute w-52 lg:w-96 right-0 top-0 lg:right-32 lg:top-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
