import React from "react";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import nb from '../assets/nb.png';
import adidas from '../assets/adidas.png'
import nike from '../assets/nike.png'
import tick from "../assets/tick.png";
// import "./Reasons.css";
const Reasons = () => {
  return (

    <>

      <div className="bg-gray-800 text-white p-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="col-span-2 row-span-2">
                  <img src={`${image1.src}`} alt="Image 1" className="w-full h-[26rem] object-cover rounded-lg" />
                </div>
                <div className="col-span-2 ">
                  <img src={`${image2.src}`} alt="Image 2" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <img src={`${image3.src}`} alt="Image 3" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <img src={`${image4.src}`} alt="Image 4" className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">

              <div className="flex-1 uppercase gap-4 flex flex-col mt-8 lg:mt-0">
                <span className="font-bold text-[#fe9d43]">some reasons</span>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                  <span className="font-outline-2 text-transparent">Why </span>
                  <span className="font-bold text-white">choose us?</span>
                </div>
                <div className="flex flex-col gap-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold">
                  <div className="flex text-base gap-4">
                    <img className="w-6 h-6 sm:w-8 sm:h-8" src={`${tick.src}`} alt="" />
                    <span>over 140+ expert coachs</span>
                  </div>
                  <div className="flex text-base gap-4">
                    <img className="w-6 h-6 sm:w-8 sm:h-8" src={`${tick.src}`} alt="" />
                    <span>train smarter and faster than before</span>
                  </div>
                  <div className="flex text-base gap-4">
                    <img className="w-6 h-6 sm:w-8 sm:h-8" src={`${tick.src}`} alt="" />
                    <span>1 free program for new member</span>
                  </div>
                  <div className="flex text-base gap-4">
                    <img className="w-6 h-6 sm:w-8 sm:h-8" src={`${tick.src}`} alt="" />
                    <span>reliable partners</span>
                  </div>
                </div>
                <span className="text-[#9C9C9C]">OUR PARTNERS</span>
                <div className="flex gap-4">
                  <img className="w-8 sm:w-10" src={`${nb.src}`} alt="" />
                  <img className="w-8 sm:w-10" src={`${adidas.src}`} alt="" />
                  <img className="w-8 sm:w-10" src={`${nike.src}`} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Reasons;
