import React from "react";
import Image from "next/image";
import Link from "next/link";

import {FolderIcon, BookmarkIcon } from "@heroicons/react/24/solid";

interface cardProps {
  src: string;
  title: string;
  desc: string;
}

const loaderProp =({ src  } :any) => {
  return src;
}

const Picard = ({ src, title, desc }: cardProps) => {
  return (
   <div className="flex flex-col gap-y-4 snap-center px-3">
  {/* Image Container */}
  <div className="group rounded-md overflow-hidden relative shadow-lg transition-transform duration-300 hover:scale-105">
    <Image
      src={src}
      alt={`${title} picture`}
      width={808}
      height={632}
      loader={loaderProp}
      className="w-full h-96 group-hover:scale-110 group-hover:brightness-75 transition-transform duration-300"
      priority
    />
    {/* Hover Actions */}
    <div className="absolute top-0 opacity-0 group-hover:opacity-100 w-full flex justify-between transition-opacity duration-300 p-4">
      <Link
        href=""
        aria-label={`Save ${title}`}
        className="flex items-center gap-x-2 px-4 py-2 bg-gray-800 text-white rounded-full bg-opacity-80 transition duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <FolderIcon />
        <p className="text-xs sm:text-sm">Save</p>
      </Link>
      <button 
        aria-label={`Bookmark ${title}`} 
        className="transition-transform duration-300 transform -translate-y-2 group-hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <BookmarkIcon color="#ad9058" className="h-6 w-6" />
      </button>
    </div>
  </div>
  {/* Description Section */}
  <div className="flex flex-col text-gray-900">
    <h3 className="font-bold text-lg sm:text-xl text-orange-500">{title}</h3>
    <p className="text-sm sm:text-base text-gray-400">{desc}</p>
  </div>
</div>


  );
};

export default Picard;
