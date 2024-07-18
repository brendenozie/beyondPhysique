import Link from "next/link";
import React from "react";
import Image from "next/image";
import pg24 from "../../public/pg2-4.jpg";

import {GlobeAsiaAustraliaIcon,UserGroupIcon,WindowIcon } from "@heroicons/react/24/solid";

const loaderProp =({ src  } :any) => {
  return src;
}

const Second = () => {
  return (
    <>
      <div
        id="about"
        data-testid="about"
        className="flex flex-col justify-end 2xl:container" >
        <div className="min-h-[7rem]"></div>
        <div className="flex flex-col cont-height gap-y-20 sm:gap-y-28 box-border min-h-[80vh] md:min-h-[50vh]">
          <div className="flex flex-wrap gap-y-6 gap-x-6">
            <div className="flex flex-col gap-y-10 md:w-[50%] box-border">
              <div className="flex flex-col gap-y-6">
                <h2 className="text-3xl font-bold text-gray-700 md:text-4xl lg:text-5xl ">
                  Awesome travel destinations in the world
                </h2>
                <p className="lg:text-lg">
                Kenya is a world-class wildlife destination, recommended both for experienced safari-goers and for those booking a first-time safari. The peerless Masai Mara National Reserve offers excellent big cat encounters and is the setting for the yearly wildebeest migration. Palm-lined beaches offer a perfect place to relax after an action-packed safari. About Kenya
                </p>
              </div>
              <div className="flex gap-x-4">
                <Link
                  href="#"
                  className="px-4 py-[0.6rem] py-3 px-6 bg-gray-700 text-gray-100 hover:bg-gray-800 transition-all duration-300"
                >
                  Discover awesome places
                </Link>
                <Link
                  href=""
                  className="px-4 py-[0.6rem] py-3 px-6 border-[1px] border-gray-400 hover:border-gray-800 border-opacity-40 hover:border-opacity-100 transition-all duration-200"
                >
                  View our packages
                </Link>
              </div>
              <div className="bg-gray-200 p-4">
                <p>
                  Interested in Travel to be your travel companion on your special
                  moment? Get in touch with our team at{" "}
                  <Link href="$contact" className="text-emerald-800 underline">
                    akinyisafiris@gmail.com
                  </Link>
                </p>
              </div>
            </div>
            {/* image */}
            <div className="w-full md:w-[45%]  box-border">
              <div className="bg-[url('/pg2-2.jpg')] h-[20rem] w-full bg-cover bg-center shadow-2xl sm:h-3/4 lg:h-[100%] lg:h-[90%] relative">
                <div className="absolute -bottom-4 -right-4 shadow-2xl border-8 border-gray-200">
                  <Image src={pg24} alt="" width={200} height={50} loader={loaderProp}/>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start box-border justify-center">
            <div className="md:w-[100%] flex flex-col sm:flex-row gap-y-6 justify-between justify-items-center items-center px-2 box-border">
              
              <div className="flex items-start gap-x-3">
                <GlobeAsiaAustraliaIcon className="h-30" />
                <div>
                  <h3 className="text-3xl sm:text-[2rem] leading-8 font-bold text-gray-700 text-4xl">
                    1.4M
                  </h3>
                  <p>travellers month</p>
                </div>
              </div>
              <div className="flex items-start gap-x-3">
                <UserGroupIcon className="h-30" />
                <div>
                  <h3 className="text-3xl sm:text-[2rem] leading-8 font-bold text-gray-700 text-4xl">
                    4.9M
                  </h3>
                  <p>honest reviews</p>
                </div>
              </div>
              <div className="flex items-start gap-x-3">
                <WindowIcon className="h-30" />
                <div>
                  <h3 className="text-3xl sm:text-[2rem] leading-8 font-bold text-gray-700 text-4xl">
                  329k
                  </h3>
                  <p>honest reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Second;
