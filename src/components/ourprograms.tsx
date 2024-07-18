import React from "react";
import { programsData } from "../data/programsData";
import RightArrow from '../assets/rightArrow.png';
import { motion } from "framer-motion";

const OurPrograms = () => {

  return (
    <>
    <div className="flex flex-col gap-8 px-4 sm:px-8 mt-[486px] lg:mt-0" id='programs'>

        {/* programs header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-20 font-bold text-3xl sm:text-4xl md:text-5xl justify-center text-white uppercase italic text-center sm:text-left">
          <span className="font-outline-2 text-transparent">Explore our</span>
          <span>Programs</span>
          <span className="font-outline-2 text-transparent">To shape you</span>
        </div>

        {/* programs-categories */}
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          {programsData.map((program) => (
            <motion.div
              whileHover={{ background: 'bg-gradient-to-r from-[#fa5042] to-[#ffa739]', cursor: 'pointer' }}
              transition={{ type: 'spring' }}
              className="flex flex-col bg-[#808080] p-4 sm:p-8 gap-4 text-white flex-1"
            >
              {/* width: 2rem; height: 2rem; fill:white */}
              {program.image}
              <span className="text-xs font-bold">{program.heading}</span>
              <span className="text-xs leading-6">{program.details}</span>
              <div className="flex items-center gap-4">
                <span>Join Now</span>
                <img className="w-4" src={`${RightArrow}`} alt="" />
              </div>
            </motion.div>
          ))}
        </div>
        </div>


      
    </>
  );
};

export default OurPrograms;
