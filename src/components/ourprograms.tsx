import React from "react";
import { programsData } from "../data/programsData";
import RightArrow from '../assets/rightArrow.png';
import { motion } from "framer-motion";

const OurPrograms = () => {

  return (
    <>
      <div className="flex flex-col gap-12 px-4 sm:px-8 mt-20 lg:mt-0" id="programs">
        {/* Programs Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-white uppercase italic text-center sm:text-left">
          <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Explore our
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            Programs
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            To Shape You
          </span>
        </div>

        {/* Programs Categories */}
        <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
          {programsData.map((program) => (
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                background: "linear-gradient(to right, #fa5042, #ffa739)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col bg-gray-700 p-6 sm:p-8 gap-4 text-white rounded-lg shadow-md flex-1 hover:bg-gradient-to-r from-[#fa5042] to-[#ffa739] cursor-pointer transition-all"
              key={program.heading}
            >
              {/* Program Image */}
              <div className="w-12 h-12 fill-white">
                {program.image}
              </div>
              
              {/* Program Heading */}
              <span className="text-lg font-bold">{program.heading}</span>
              
              {/* Program Details */}
              <span className="text-sm leading-6 text-gray-300">
                {program.details}
              </span>

              {/* Join Now Button */}
              <div className="flex items-center gap-4 mt-4 text-sm font-semibold text-white">
                <span>Join Now</span>
                <img className="w-4" src={`${RightArrow.src}`} alt="Right Arrow" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </>
  );
};

export default OurPrograms;
