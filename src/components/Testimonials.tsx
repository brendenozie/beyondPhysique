import React from "react";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import { testimonialsData } from "../data/testimonialsData";
import { useState } from "react";
import { motion } from "framer-motion";
const Testimonials = () => {
  const [selected, setSelected] = useState(0);
  const tLength = testimonialsData.length;
  const transition = { type: "spring", duration: 1 };

  return (
    
<div className="mt-16 flex flex-col lg:flex-row gap-12 sm:gap-16 px-4 sm:px-8">
  {/* Testimonials Text Section */}
  <div className="flex-1 flex flex-col gap-6 uppercase text-white">
    <span className="text-[#ff6200] font-bold text-xl lg:text-2xl">Testimonials</span>
    <span className="font-outline-2 text-transparent font-bold text-3xl lg:text-5xl">What they</span>
    <span className="font-bold text-3xl lg:text-5xl">Say About Us</span>

    {/* Testimonial Review Animation */}
    <motion.span
      className="font-bold text-lg lg:text-xl"
      key={selected}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={transition}
    >
      {testimonialsData[selected].review}
    </motion.span>

    {/* Name and Status */}
    <span className="normal-case text-sm lg:text-base text-justify tracking-widest leading-7">
      <span className="text-[#ff6200]">
        {testimonialsData[selected].name}
      </span> - {testimonialsData[selected].status}
    </span>
  </div>

  {/* Testimonial Image Section */}
  <div className="flex-1 relative">
    {/* Background Border Box */}
    <motion.div
      className="absolute w-64 h-72 lg:w-72 lg:h-80 border-2 rounded-none border-[#ffa500] bg-transparent right-12 lg:right-28 top-4 lg:top-8"
      initial={{ opacity: 0, x: -100 }}
      transition={{ ...transition, duration: 2 }}
      whileInView={{ opacity: 1, x: 0 }}
    ></motion.div>

    {/* Gradient Box */}
    <motion.div
      className="absolute w-64 h-68 lg:w-72 lg:h-76 right-8 lg:right-20 top-12 lg:top-16 bg-gradient-to-r from-[#fa5042] to-[#ffa739]"
      initial={{ opacity: 0, x: 100 }}
      transition={{ ...transition, duration: 2 }}
      whileInView={{ opacity: 1, x: 0 }}
    ></motion.div>

    {/* Testimonial Image */}
    <motion.img
      className="absolute w-64 h-72 lg:w-72 lg:h-80 object-cover right-8 lg:right-20 top-8 lg:top-12"
      key={selected}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={transition}
      src={testimonialsData[selected].image.src}
      alt={testimonialsData[selected].name}
    />

    {/* Arrow Controls */}
    <div className="flex gap-6 absolute bottom-4 lg:bottom-8 left-6 lg:left-12">
      <img
        className="w-6 lg:w-8 cursor-pointer"
        src={leftArrow.src}
        alt="Left Arrow"
        onClick={() => {
          selected === 0 ? setSelected(tLength - 1) : setSelected((prev) => prev - 1);
        }}
      />
      <img
        className="w-6 lg:w-8 cursor-pointer"
        src={rightArrow.src}
        alt="Right Arrow"
        onClick={() => {
          selected === tLength - 1 ? setSelected(0) : setSelected((prev) => prev + 1);
        }}
      />
    </div>
  </div>
</div>

  );
};

export default Testimonials;
