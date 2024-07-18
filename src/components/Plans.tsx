import React from "react";
import { plansData } from "../data/plansData";
import whiteTick from "../assets/whiteTick.png";
const Plans = () => {
  return (
    <div className="mt-16 px-4 sm:px-8 flex flex-col gap-8 sm:gap-16 relative">
      <div className="bg-[#fd782b] absolute rounded-full blur-[190px] w-[20rem] sm:w-[32rem] h-[15rem] sm:h-[23rem] top-[6rem] left-0"></div>
      <div className="bg-[#fd782b] absolute rounded-full blur-[190px] w-[20rem] sm:w-[32rem] h-[15rem] sm:h-[23rem] top-[10rem] right-[0rem]"></div>
      <div className="flex flex-col sm:flex-row font-bold text-3xl sm:text-4xl md:text-5xl justify-center text-white uppercase italic gap-4 sm:gap-8 md:gap-[2rem] text-center sm:text-left">
        <span className="font-outline-2 text-transparent">Ready to Start</span>
        <span>Your Journey</span>
        <span className="font-outline-2 text-transparent">now with us</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-[3rem]">
        {plansData.map((plan, i) => (
          <div className={`flex flex-col text-white gap-4 sm:gap-[2rem] p-4 sm:p-[1.5rem] w-full sm:w-[20rem] ${i == 1 ? "scale-105 sm:scale-110 bg-gradient-to-r from-[#fa5042] to-[#ffa739]" : "bg-[#4c39ff]"}`} key={i}>
            {plan.icon}
            <span className="text-sm sm:text-base font-bold">{plan.name}</span>
            <span className="text-3xl sm:text-5xl font-bold">$ {plan.price}</span>
            <div className="flex flex-col gap-2 sm:gap-[1rem]">
              {plan.features.map((feature, i) => (
                <div className="flex items-center gap-2 sm:gap-[1rem]" key={i}>
                  <img className="w-4 sm:w-[1rem]" src={whiteTick.src} alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="text-xs sm:text-sm">
              <span>See more benefits </span>
            </div>
            <button className="p-[0.1 rem] font-bold rounded-sm border-transparent transition-all duration-300 flex items-center justify-center text-white bg-[#f48915] w-24 sm:w-32">Join now</button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Plans;
