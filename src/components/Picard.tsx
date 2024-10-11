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
    <div className="flex flex-col gap-y-3 snap-center px-2"> 
  <div className="group rounded-md overflow-hidden relative shadow-lg transition-transform duration-300 hover:scale-105">
    <Image
      src={src}
      alt={`${title} picture`}
      width={808}
      height={632}
      loader={loaderProp}
      className="w-full h-auto group-hover:scale-110 group-hover:brightness-75 transition-all duration-300"
      priority // Optionally, load the image with priority
    />
    <div className="absolute top-0 opacity-0 group-hover:opacity-100 w-full flex justify-between transition-opacity duration-300 p-4">
      <Link
        href=""
        aria-label={`Save ${title}`}
        className="flex items-center gap-x-2 px-3 py-2 bg-gray-700 text-gray-100 rounded-3xl bg-opacity-70 transition duration-300 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-400"
      >
        <FolderIcon />
        <p className="text-xs">Save</p>
      </Link>
      <button 
        aria-label={`Bookmark ${title}`} 
        className="transition-transform duration-300 transform -translate-y-2 group-hover:translate-y-0 focus:outline-none focus:ring focus:ring-gray-400"
      >
        <BookmarkIcon color="#ad9058" className="h-6 w-6" />
      </button>
    </div>
  </div>
  <div className="flex flex-col text-gray-800">
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm">{desc}</p>
  </div>
</div>

  );
};

export default Picard;
