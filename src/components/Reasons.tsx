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
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery Section */}
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="col-span-2 row-span-2">
                  <img
                    src={`${image1.src}`}
                    alt="Image 1"
                    className="w-full h-[26rem] object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="col-span-2">
                  <img
                    src={`${image2.src}`}
                    alt="Image 2"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <img
                    src={`${image3.src}`}
                    alt="Image 3"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <img
                    src={`${image4.src}`}
                    alt="Image 4"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-center gap-8">
              <div className="uppercase text-lg font-semibold text-[#fe9d43] tracking-wider">
                Some Reasons
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
                <span className="font-outline-2 text-transparent">Why </span>
                <span className="font-bold text-white">Choose Us?</span>
              </div>

              {/* Reasons List */}
              <div className="flex flex-col gap-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                <div className="flex items-center gap-4">
                  <img
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    src={`${tick.src}`}
                    alt="Tick"
                  />
                  <span>Over 140+ expert coaches</span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    src={`${tick.src}`}
                    alt="Tick"
                  />
                  <span>Train smarter and faster than before</span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    src={`${tick.src}`}
                    alt="Tick"
                  />
                  <span>1 free program for new members</span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    src={`${tick.src}`}
                    alt="Tick"
                  />
                  <span>Reliable partners</span>
                </div>
              </div>

              {/* Partners Section */}
              <div className="flex flex-col gap-4">
                <span className="text-gray-400 text-sm font-semibold">OUR PARTNERS</span>
                <div className="flex gap-6">
                  <img className="w-10 sm:w-12" src={`${nb.src}`} alt="New Balance" />
                  <img className="w-10 sm:w-12" src={`${adidas.src}`} alt="Adidas" />
                  <img className="w-10 sm:w-12" src={`${nike.src}`} alt="Nike" />
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
