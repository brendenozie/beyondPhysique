import Picard from "@/components/Picard";
import React, { useRef } from "react";
import { picardData } from "@/constant/Data";

import {ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Pic = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -250,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  };
  return (
    <section
      id="destinations"
      data-testid="destinations"
      className="flex flex-col"
    >
      <div className="min-h-[4.5rem]"></div>
      <div className="relative">
        <div
          className="px-8 grid grid-flow-col auto-cols-[100%] md:auto-cols-[50%] lg:auto-cols-[30%] overflow-hidden overscroll-y-contain snap-x snap-mandatory scroll-pl-2 scrollbar-hide"
          ref={scrollContainer}
        >
          {picardData.map((card) => (
            <Picard
              key={card.id}
              src={card.src}
              title={card.title}
              desc={card.desc}
            />
          ))}
        </div>
        <button
          className="p-3 backdrop-blur btn-color rounded-full absolute top-1/2 -translate-y-1/2 left-6"
          onClick={scrollLeft}
        >
          <ChevronLeftIcon className="h-20" />
        </button>
        <button
          className="p-3 backdrop-blur btn-color rounded-full absolute top-1/2 -translate-y-1/2 right-6"
          onClick={scrollRight}
        >
          <ChevronRightIcon className="h-20" />
        </button>
      </div>
    </section>
  );
};

export default Pic;
