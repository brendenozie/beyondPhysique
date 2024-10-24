import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Nav from "./Nav";
import Link from "next/link";
import fit1 from "../assets/fit1.png";
import {
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useOnClickOutside } from "usehooks-ts";

const Header = () => {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = useState(false);
  
  
  const navbarVisible = () => {
    if (window.scrollY > 10 && window.scrollY < window.innerHeight - 80) {
      setVisible(true);
      setDark(false);
    } else if (window.scrollY >= window.innerHeight - 80) {
      setDark(true);
      setVisible(false);
    } else {
      setVisible(false);
      setDark(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navbarVisible);
    return () => {
      window.removeEventListener("scroll", navbarVisible);
    };
  }, []);

  return (
    <header
  className={`bg-transparent fixed top-0 left-0 w-full flex items-center z-50 
    ${visible ? "backdrop-blur-sm" : ""}
    ${dark ? "nav-color backdrop-blur shadow-md" : ""}`}
>
  <div id="navbar" className="w-screen 2xl:container relative">
    <div
      className={`flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 relative 
      ${dark ? "min-h-[4.5rem]" : "min-h-[5rem] md:min-h-[7rem]"}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-x-4 order-1 w-[25%] box-border pl-6 lmd:pl-14 lg:pl-24 2xl:pl-16">
        <Link href="/" aria-label="Home">
          {/* <PaperAirplaneIcon className={`h-6 ${dark ? "text-black" : "text-white"}`} /> */}
          <img src={fit1.src} className="w-24 h-20 cursor-pointer hover:scale-110 transition-all" alt="Github" />
        </Link>
        <Link
          href="/"
          aria-label="Beyond Physique"
          className={`hidden lg:inline text-lg sm:text-xl lg:text-[1.5rem] font-bold tracking-wide 
            ${dark ? "text-black" : "text-orange-400"}`}
        >
          WorkoutPro
        </Link>
      </div>

      {/* Navigation */}
      <Nav />

      {/* Login & Register */}
      {!session && (
        <div className="order-2 lg:order-3 lg:w-[25%] flex justify-center items-center lg:pr-24 2xl:pr-16 gap-x-2 lg:justify-end">
          <Link
            href="/signin"
            aria-label="Login"
            className={`uppercase lg:inline xs:inline xs:text-sm sm:text-base tracking-widest 
              ${dark ? "text-black border-gray-700" : "text-white"}`}
          >
            log in
          </Link>
          <div className={`h-4 sm:h-[1.5rem] w-[1px] border-l-[1px] 
            ${dark ? "border-gray-700" : "border-gray-100"}`}
          ></div>
          <Link
            href="/register"
            aria-label="Register"
            className={`uppercase lg:inline xs:inline xs:text-sm sm:text-base tracking-widest 
              ${dark ? "text-black" : "text-white"}`}
          >
            register
          </Link>
        </div>
      )}
    </div>
  </div>
</header>
  );
};

export default Header;
