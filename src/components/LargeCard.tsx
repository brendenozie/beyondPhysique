import { ICity } from "@/types/typings";
import { addDays } from "date-fns";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

const loaderProp =({ src  } :any) => {
  return src;
}

type Props = {
  img: StaticImageData;
  title: string;
  description: string;
  buttonText: string;
  getInspiredCities: ICity[];
  setSearchInput: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<ICity | null>>;
};

const LargeCard = ({ img, title, description, buttonText, getInspiredCities, setSearchInput, setSelectedCity }: Props) => {
  const router = useRouter();
  const startDate = addDays(new Date(), 4);
  const endDate = addDays(new Date(), 7);
  const numOfGuests = 1;

  const getInspiredCity = getInspiredCities[Math.floor(Math.random() * getInspiredCities.length)];

  const setSearchInputAndSelectedCity = () => {
    setSearchInput(getInspiredCity.cityName);
    setSelectedCity(getInspiredCity);
  }

  return (
    <section className="relative py-16">
      {/* bg image */}
      <div className="relative h-96 min-w=[300px]">
        <Image className="object-cover object-left rounded-2xl" src={img} alt={title} fill loader={loaderProp}/>
      </div>
      {/* text */}
      <div className="absolute top-32 left-12">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <h2>{description}</h2>

        <button onClick={setSearchInputAndSelectedCity} className="text-sm text-white cursor-pointer bg-gray-900 px-4 py-2 rounded-lg mt-5">{buttonText}</button>
      </div>
    </section>
  );
};

export default LargeCard;
