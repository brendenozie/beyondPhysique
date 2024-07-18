import React from "react";
import Github from "../assets/github.png";
import Instagram from "../assets/instagram.png";
import LinkedIn from "../assets/linkedin.png";
import Logo from '../assets/logo.png'
const Footer = () => {
  return (
    <div className="relative;">
      <hr className="rounded-sm var(--lightgray);"/>
      <div className="px-4 py-8
                        flex
                        flex-col
                        gap-16
                        items-center
                        justify-center
                        h-[20rem]">
        <div className="flex
                          gap-16">
          <img src={Github.src}  className="w-8 h-8 cursor-pointer" alt="" />
          <img src={Instagram.src}  className="w-8 h-8 cursor-pointer" alt="" />
          <img src={LinkedIn.src}  className="w-8 h-8 cursor-pointer" alt="" />
        </div>
        <div className="w-[10rem]">
            <img src={Logo.src} alt="" />
        </div>
      </div>
      <div className="blur 
                            filter: blur(200px);
                            bg-[#f43434] 
                            bottom-[0]
                            right-[15%]
                            w-[26rem]
                            h-[12rem]
                            filter: blur(200px)
                            bg-red;"></div>
      <div className="blur bottom-0
                            right-[15%]
                            w-[26rem]
                            h-[12rem]
                            filter: blur(200px)
                            bg[rgb(255, 115, 0)]
                            b-0
                            left-[15%]
                            w-[26rem]
                            h-[12rem]
                            filter: blur(200px)
                            bg-[rgb(255, 115, 0)]"></div>
    </div>
  );
};

export default Footer;
