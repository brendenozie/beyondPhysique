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
  const [toggle, setToggle] = useState(true);

  const ref = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(ref, (e) => {
    setToggle(true);
  });
  
  const handleClick = () => {
    setToggle(!toggle);
  };
  const [dark, setDark] = useState(false);
  const navbarDark = () => {
    if (window.scrollY > 10 && window.scrollY < window.innerHeight - 80) {
      setDark(false);
    } else if (window.scrollY >= window.innerHeight - 80) {
      setDark(true);
    } else {
      setDark(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navbarDark);
    return () => {
      window.removeEventListener("scroll", navbarDark);
    };
  }, []);

  return (
    <div className="order-3 lg:px-0 lg:order-2 w-1/4 lg:w-fit" ref={ref}>
      <div className=" flex justify-end pr-6 lmd:pr-14 w-full" >
        <button className={`lg:hidden rounded-full ${ dark ? "text-black" : "text-white" }`} onClick={handleClick} >
          <Bars4Icon color={`${
                dark ? "text-white" : "text-white "
              }`}   className="h-6"/>
          {/* dark ? "#334155" :  */}
        </button>
      </div>

      {!toggle ? (
        <nav
          id="nav-menu"
          className={`lg:hidden absolute top-[4.5rem] right-4 py-[0.6rem] px-3 bg-gray-800`}
        >
          <ul className="flex flex-col gap-2 pr-2 text-gray-800">
            {Navdata.map((item) => (
              <div key={item.reference}>
                <NavVer title={item.title} href={item.href} reference={item.reference} />
              </div>
            ))}
            {session && (
              <div key="dashboard">
              <NavVer title="Dashboard" href="/dashboard2" reference="My Dashboard" />
            </div>
            )}
          </ul>
        </nav>
      ) : null}

      <nav id="nav-menu" className="hidden lg:block">
        <ul className="flex text-black  font-bold">
          {Navdata.map((item) => (
            <div key={item.reference}>
              <NavHor title={item.title} href={item.href} reference={item.reference} />
            </div>
          ))}
          {session && (
              <div key="dashboard">
              <NavHor title="Dashboard" href="/dashboard2" reference="My Dashboard" />
            </div>
            )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
