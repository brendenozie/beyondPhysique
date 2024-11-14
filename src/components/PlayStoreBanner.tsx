import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import banner from '../assets/banner.png';

const loaderProp = ({ src }:any) => {
  return src;
};

const PlayStoreBanner = () => {
  return (
    <div className="relative w-full h-[800px] md:h-[500px] flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#2D2E32] to-[#1B1C1F] overflow-hidden text-white px-6 md:px-12 lg:px-16">
      {/* Left Side: Image and Shapes */}
      <div className="relative flex items-center justify-center w-full md:w-1/2 mb-8 md:mb-0">
        {/* Decorative Animated Shapes */}
        <div className="absolute w-64 h-64 bg-[#fa5042] rounded-full opacity-30 -top-16 -left-20 blur-3xl animate-pulse"></div>
        <div className="absolute w-48 h-48 bg-[#ffa739] rounded-full opacity-30 bottom-[-20px] right-[-40px] blur-3xl animate-pulse delay-1000"></div>
        
        {/* App Mockup */}
        <Image
          src={banner}
          alt="App Mockup"
          width={320}
          loader={loaderProp}
          height={320}
          className="relative z-10 rounded-lg transform hover:scale-105 transition duration-500"
        />
      </div>

      {/* Right Side: Text and CTA */}
      <div className="flex flex-col items-center md:items-start justify-center space-y-6 md:w-1/2 text-center md:text-left max-w-lg">
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Your Journey to <br /> Fitness Begins Here
        </h1>

        {/* Supporting Text */}
        <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-md">
          Discover customized workout plans, track your progress, and stay motivated on the path to achieving your fitness goals.
        </p>

        {/* Call-to-Action Button */}
        <Link href="https://play.google.com/store/apps/details?id=co.ke.tulivuapps.workoutpro" className="bg-[#fa5042] text-white py-3 px-6 md:px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 duration-300">
            Download Now
        </Link>
      </div>
    </div>
  );
};

export default PlayStoreBanner;
