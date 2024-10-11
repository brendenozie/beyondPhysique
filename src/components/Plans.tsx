import React from "react";
import { plansData } from "../data/plansData";
import whiteTick from "../assets/whiteTick.png";
const Plans = () => {
  return (
    <div className="mt-16 px-4 sm:px-8 flex flex-col gap-12 sm:gap-20 relative">
      {/* Background Gradient Circles */}
      <div className="bg-[#fd782b] absolute rounded-full blur-[160px] w-[20rem] sm:w-[32rem] h-[15rem] sm:h-[23rem] top-[4rem] left-0"></div>
      <div className="bg-[#fd782b] absolute rounded-full blur-[160px] w-[20rem] sm:w-[32rem] h-[15rem] sm:h-[23rem] top-[10rem] right-0"></div>

      {/* Heading Section */}
      <div className="flex flex-col sm:flex-row font-bold text-3xl sm:text-4xl md:text-5xl justify-center text-white uppercase italic gap-4 sm:gap-8 md:gap-[2rem] text-center sm:text-left z-10">
        <span className="font-outline-2 text-transparent">Ready to Start</span>
        <span>Your Journey</span>
        <span className="font-outline-2 text-transparent">Now with Us</span>
      </div>

      {/* Plans Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-[3rem] z-10">
        {plansData.map((plan, i) => (
          <div
            className={`flex flex-col text-white gap-6 sm:gap-8 p-6 sm:p-8 w-full sm:w-[18rem] md:w-[20rem] rounded-lg shadow-lg transition-transform duration-300 transform ${
              i == 1
                ? "scale-105 sm:scale-110 bg-gradient-to-r from-[#fa5042] to-[#ffa739]"
                : "bg-[#4c39ff]"
            }`}
            key={i}
          >
            {/* Plan Icon */}
            {plan.icon}

            {/* Plan Name */}
            <span className="text-base sm:text-lg font-bold">{plan.name}</span>

            {/* Plan Price */}
            <span className="text-3xl sm:text-4xl font-bold">$ {plan.price}</span>

            {/* Features */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {plan.features.map((feature, i) => (
                <div className="flex items-center gap-3 sm:gap-4" key={i}>
                  <img className="w-4 sm:w-6" src={whiteTick.src} alt="Tick" />
                  <span className="text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>

            {/* See More Benefits */}
            <div className="text-xs sm:text-sm text-gray-300 underline cursor-pointer">
              <span>See more benefits</span>
            </div>

            {/* Join Now Button */}
            <button className="mt-4 py-2 px-6 sm:py-3 sm:px-8 font-bold rounded-sm bg-[#f48915] hover:bg-[#e67f0d] transition-all duration-300">
              Join now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
