import { signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import Banner from "../components/Banner";
import CarouselTitlesCard from "../components/CarouselTitlesCard";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import SmallCard from "../components/SmallCard";
import { ICity, ITravelStyle } from "../types/typings";
import Desc from "@/components/Desc";
import Second from "@/components/Second";
import Testi from "@/components/Testi";
import Pic from "@/components/Pic";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import traveldisc from "../../public/get-inspired1200x600.jpg";
import MainLayout from "@/components/MainLayout";
import OurPrograms from "@/components/ourprograms";
import Join from "@/components/Join";
import Reasons from "@/components/Reasons";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";

type Props = {
  citiesData: { results: ICity[] };
  stylesData: { results: ITravelStyle[] };
  getInspiredCities: ICity[];
};

const Home = ({ citiesData, stylesData, getInspiredCities }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);


  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [mail, setMail] = useState(false);


  const sendMail = async () => {

    setMail(true);

    let url = process.env.NEXT_PUBLIC_API_URL;

    await axios.post(url + `/post-travel-style`, { fname: fname, lname: lname, email: email, phone: phone, company: company, message: message, }).then(() => {
      setFname("");
      setLname("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
      setMail(false)
    }).catch(() => {
      setMail(false);
    }).finally(() => {
      setMail(false);
    })
  };

  return (
    <MainLayout>

      <main className="max-w-full">

        {/* Banner */}
        <Banner getInspiredCities={getInspiredCities} setSearchInput={setSearchInput} setSelectedCity={setSelectedCity} />

        <OurPrograms />

        <Reasons />

        <Plans />

        <Testimonials />

        <Join />

      </main>

    </MainLayout>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {

  let url = process.env.NEXT_PUBLIC_API_URL;

  // const citiesData = await fetch(url + `/get-city`).then((res) => res.json());

  // const stylesData = await fetch(url + `/get-travel-style`).then((res) => res.json());

  // const getInspiredCities = await fetch(url + `/get-city`).then((res) => res.json());

  return {
    props: {
      // citiesData,
      // stylesData,
      // getInspiredCities,
    },
  };
};
