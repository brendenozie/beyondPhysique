import { ICity } from "@/types/typings";
import { addDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

const loaderProp =({ src  } :any) => {
  return src;
}

type Props = {
  cityData: ICity;
  setSearchInput: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<ICity | null>>;
};

const SmallCard = ({ cityData, setSearchInput, setSelectedCity }: Props) => {
  
  const router = useRouter();
  const startDate = addDays(new Date(), 4);
  const endDate = addDays(new Date(), 7);
  const numOfGuests = 1;

  const setSearchInputAndSelectedCity = () => {
    setSearchInput(cityData.cityName);
    setSelectedCity(cityData);
  }

  return (
    <div onClick={setSearchInputAndSelectedCity} className="justify-items-center items-center m-2 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out ">
      {/* Left side */}
      <div className="relative min-h-[5rem] min-w-[5rem]">
        <Image
          className="rounded-lg"
          src={cityData.url!}
          alt={cityData.cityName!}
          fill
          loader={loaderProp}
        />
      </div>
      {/* Right side */}
      <div>
        <h2 className="min-w-[5rem]">{cityData.cityName}</h2>
      </div>
    </div>
  );
};

export default SmallCard;
