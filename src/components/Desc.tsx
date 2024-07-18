import React, { useRef } from "react";
import {
  CalendarIcon,
  UsersIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useDebounce from "../hooks/useDebounce";
import { ICity, ISuggestionFormatted } from "../types/typings";
import getCitySuggestions from "../utils/getCitySuggestions";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  getInspiredCities: {results:ICity[]};
  placeholder?: string;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  selectedCity: ICity | null;
  setSelectedCity: Dispatch<SetStateAction<ICity | null>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Desc = ({
  getInspiredCities,
  placeholder,
  searchInput,
  setSearchInput,
  selectedCity,
  setSelectedCity,
  isOpen,
  setIsOpen,
}: Props) => {

  const { data: session, status } = useSession();
  const debouncedSearchInput = useDebounce(searchInput, 300);
  const [citySuggestions, setCitySuggestions] = useState<ISuggestionFormatted[] | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(false);
  const [triggerDate, setTriggerDate] = useState(false);
  const [selectedGuest, setselectedGuest] = useState(false);
  const [triggerGuest, setTriggerGuest] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [numOfGuests, setNumOfGuests] = useState("1");
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(ref, (e) => {
    resetDate();
    resetGuests();
  });

  useEffect(() => {
    setCitySuggestions(null);
    searchInput?.length > 3 && getCitySuggestions(debouncedSearchInput, setCitySuggestions).then((value) => console.log(value)).catch(console.error);
  }, [debouncedSearchInput]);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setCitySuggestions(null);
    setSelectedCity(null);
    setSearchInput("");
  };

  const resetDate = () => {
    setSelectedDate(false);
  };

  const resetGuests = () => {
    setselectedGuest(false);
  };

  const setSearchInputAndSelectedCity = (cityData: ICity) => {
    setSearchInput(cityData.id);
    setSelectedCity(cityData);
  }

  const search = () => {
    router.push({
      pathname: "/hotelist",
      query: {
        location: selectedCity?.cityName,
        id: selectedCity?.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
      },
    });

    resetInput();
  };

  return (
    <>
      <div className="min-h-[6rem] w-full justify-center items-center box-border text-slate-100 backdrop-blur bg-[#65324b] ">
        <div className=" text-center rounded-md transform -translate-y-20 sm:-translate-y-10 sm:max-w-[90%] mx-auto">
          <div className="justify-center items-center mx-16 bg-white rounded-md ">
            <div className="container flex flex-col sm:flex-row ng-untouched ng-pristine ng-valid">
              <div className="p-2 sm:w-1/4 w-full border-[1px] justify-center flex items-center rounded-md shadow-md ">
                <div >
                  <MapPinIcon className="flex items-center rounded-l-md border border-white justify-center w-12 text-white h-5 w-5 text-gray-900" />
                </div>

                <div className="w-full">
                  <select id="country" name="country" defaultValue={"Pick A City"} className="w-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 sm:text-sm h-12 focus:outline-none" 
                  onChange={(e) => {setSelectedCity({id:JSON.parse(e.target.value).id,
                                                      cityName : JSON.parse(e.target.value).cityName,
                                                      publicId : "",
                                                      url      : "",
                                                      status   : ""});
                                                    }}>
                  <option value="Pick A City" >Pick A City</option>
                  {getInspiredCities.results.map((city) => (
                      <option value={JSON.stringify(city)} >{city.cityName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-2 w-full sm:w-1/4  border-[1px]  justify-center flex items-center rounded-md shadow-md">
                <div>
                  <CalendarIcon className="flex items-center rounded-l-md border border-white justify-center w-12 text-white h-5 w-5 text-gray-900" />
                </div>

                <div className="w-full">
                  <input type="search" x-model="input1"
                    className="w-full h-5 px-4 py-1 rounded-r-md text-gray-800 focus:outline-none h-12"
                    placeholder="Pick A Date" onClick={() => { setSelectedDate(true); setTriggerDate(true) }} value={triggerDate ? `${selectionRange.startDate} ${selectionRange.endDate} `: "Set Date"} />
                  {/* Date Range Picker, Bottom */}
                  {selectedDate && (
                    <motion.div
                      initial={{
                        y: -25,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      className="flex absolute left-0 right-0 mx-auto items-center flex-col col-span-3  bg-transparent"
                      ref={ref}
                    >
                      <div className="flex z-10 mx-auto items-center flex-col col-span-3 mb-3 bg-white pb-5 rounded-b-lg shadow-md" >
                        <DateRangePicker
                          className="text-black"
                          ranges={[selectionRange]}
                          minDate={new Date()}
                          rangeColors={["#EA640E"]}
                          onChange={handleSelect}
                        />
                        <div />
                        <div className="flex w-full justify-between px-6 pt-2 text-black">
                          <button  onClick={resetDate} className="bg-white self-start px-5 py-2 shadow-md rounded-full font-bold text-sm hover:shadow-xl active:scale-90 transition duration-150" >
                            Close
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="p-2 w-full sm:w-1/4  border-[1px] justify-center flex items-center rounded-md shadow-md">
                <div>
                  <UsersIcon className="flex items-center rounded-l-md border border-white justify-center w-12 text-white h-5 w-5 text-gray-900" />
                </div>

                <div className="w-full">
                  <input type="search" x-model="input2"
                    className="w-full h-5 px-4 py-1 rounded-r-md text-gray-800 focus:outline-none h-12"
                    placeholder="Guests" onClick={() => { setselectedGuest(true); setTriggerGuest(true) }} value={`${triggerGuest ? numOfGuests : "Guests"}`} />
                  {/* Number Of Guests, Bottom */}
                  {selectedGuest && (
                    <motion.div
                      initial={{ y: -25, opacity: 0,}}
                      transition={{  duration: 0.3, }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      className="flex absolute left-0 right-0 mx-auto items-center flex-col  mt-[24px] text-black bg-white rounded-md md:w-1/4 sm:w-1/2"
                      ref={ref}>
                      <div className=" gap-4 items-center m-4 pl-5">
                        <h2 className="text-l flex-grow font-semibold">
                          Number of Guests
                        </h2>
                        <div className="flex p-2">
                          <UsersIcon className="h-8" />
                          <input
                            value={numOfGuests}
                            onChange={(e) => setNumOfGuests(e.target.value)}
                            className="w-12 p-2 text-l outline-none text-orange-500"
                            type="number"
                            min={1}
                          />
                        </div>
                      </div>
                      <div className="flex justify-items-center items-center p-2">
                        <button onClick={resetGuests} className="bg-white px-5 py-2 shadow-md rounded-full font-bold text-sm hover:shadow-xl active:scale-90 transition duration-150"  >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <button className="px-5 w-full sm:w-1/4  rounded-r-md bg-gray-800 text-white py-8 px-10 font-bold p-4 uppercase border-gray-500 border-t border-b border-r" onClick={search}>Enquire</button>

            </div>
          </div>
        </div>

        <div className="flex items-center w-full pb-8">
          {/* place */}
          <div className="basis-1/3 flex items-center justify-center px-4 gap-x-3 xl:basis-1/4">
            <MapPinIcon className="h-6" />
            <h2 className="xs:text-xl sm:text-2xl lg:text-[1.7rem] font-bold">
              Nairobi, Kenya
            </h2>
          </div>
          {/* advertisment */}
          <div className="basis-2/3 flex xl:basis-3/4">
            <div className="flex items-center justify-center text-sm px-2 sm:hidden ">

              <h3>
                In each and every destination, you will find information, advice, and experiences from locals.
                Learn about the latest recommendations on attractions, places to eat, shop and much more.
              </h3>
            </div>
            <div className="hidden sm:flex sm:w-full sm:items-center">
              <div className=" basis-1/3 flex flex-col justify-center px-2 lg:px-6 xl:px-9">
                <h2 className="text-xl lg:text-[1.375rem] font-bold">01</h2>
                <p className="hidden sm:block xs:block text-xs lg:text-[0.8125rem] lg:leading-[1.15rem]">
                  {/* hidden */}
                  In each and every destination{" "}
                  <span className="hidden lg:inline">
                    you will find information, advice, and experiences from locals.{" "}
                    <span className="hidden 2xl:inline">
                      Learn about the latest recommendations on attractions, places to eat, shop and much more.
                    </span>
                  </span>
                </p>
              </div>
              <div className=" basis-1/3 flex flex-col justify-center px-2 lg:px-6 xl:px-9">
                <h2 className="text-xl lg:text-[1.375rem] font-bold">02</h2>
                <p className="hidden sm:block xs:block text-xs lg:text-[0.8125rem] lg:leading-[1.15rem]">
                  {/* hidden */}

                  Through effective management, infrastructure, engagement with local communities, rigorous protection,
                  several species reintroductions, and well-managed and developed tourism{" "}
                  <span className="hidden lg:inline">
                    <span className="hidden 2xl:inline">
                      , unique park to support both people and wildlife.{" "}
                    </span>
                  </span>
                </p>
              </div>
              <div className=" basis-1/3 flex flex-col justify-center px-2 lg:px-6 xl:px-9">
                <h2 className="text-xl lg:text-[1.375rem] font-bold">03</h2>
                <p className="hidden sm:block xs:block text-xs lg:text-[0.8125rem] lg:leading-[1.15rem]">
                  {/* hidden */}
                  Kenya is a world-class wildlife destination, recommended both for experienced safari-goers and for those booking a first-time safari.
                  <span className="hidden lg:inline">
                    The peerless Masai Mara National Reserve offers excellent big cat encounters{" "}
                    <span className="hidden 2xl:inline">
                      Palm-lined beaches offer a perfect place to relax after an action-packed safari.{" "}
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Desc;
