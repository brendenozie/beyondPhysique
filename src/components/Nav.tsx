import React, { useState, useEffect, useRef } from "react";
import {
  Bars4Icon,
} from "@heroicons/react/24/solid";
import { Navdata } from "@/constant/Data";
import NavHor from "./NavHor";
import NavVer from "./NavVer";
import { useOnClickOutside } from "usehooks-ts";
import { useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isDark, setIsDark] = useState(false);

const ref = useRef<HTMLDivElement>(null);

useOnClickOutside(ref, () => {
  setIsMenuOpen(false);
});

const handleToggleMenu = () => {
  setIsMenuOpen((prev) => !prev);
};

const handleScroll = () => {
  const scrollY = window.scrollY;
  setIsDark(scrollY >= window.innerHeight - 80);
};

useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

return (
  <div className="order-3 lg:px-0 lg:order-2 w-1/4 lg:w-fit" ref={ref}>
    <div className="flex justify-end pr-6 lmd:pr-14 w-full">
      <button
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
        className={`lg:hidden rounded-full ${isDark ? "text-black" : "text-white"}`}
        onClick={handleToggleMenu}
      >
        <Bars4Icon className={`h-6 ${isDark ? "text-white" : "text-white"}`} />
      </button>
    </div>

    {isMenuOpen && (
      <nav
        id="nav-menu"
        className="lg:hidden absolute top-[4.5rem] right-4 py-[0.6rem] px-3 bg-gray-800 rounded-lg shadow-md"
      >
        <ul className="flex flex-col gap-2 pr-2 text-gray-800">
          {Navdata.map((item) => (
            <NavVer key={item.reference} title={item.title} href={item.href} reference={item.reference} />
          ))}
          {session && (
            <NavVer key="dashboard" title="Dashboard" href="/dashboard2" reference="My Dashboard" />
          )}
        </ul>
      </nav>
    )}

    <nav id="nav-menu" className="hidden lg:block">
      <ul className="flex text-black font-bold">
        {Navdata.map((item) => (
          <NavHor key={item.reference} title={item.title} href={item.href} reference={item.reference} />
        ))}
        {session && (
          <NavHor key="dashboard" title="Dashboard" href="/dashboard2" reference="My Dashboard" />
        )}
      </ul>
    </nav>
  </div>
);

};

export default Nav;
