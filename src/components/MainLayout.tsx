import React, { PropsWithChildren, useState } from "react";
import Head from "next/head";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from "next/link";
import Navbar from "./AdminNavbar";
import Sidebar from "./sidebar";
import { signOut } from "next-auth/react";
import Pic from "./Pic";

const MainLayout = (props: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-hero-pattern bg-[#3c3f45] mix-blend-overlay flex flex-col gap-24 overflow-y-scroll no-scrollbar ">
      <Head>
        <title>Beyond Physique</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header  />

      <div>
        {props.children}
      </div>

      <Pic />

      <Footer />

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-item">
          <Link href={"/favorites"}>List of Favorites</Link>
        </p>
        <p className="drawer-item">
          <Link href={"/bookings"}>Your Bookings</Link>
        </p>
        <p onClick={() => signOut()} className="drawer-item">
          Sign out
        </p>
      </Drawer>

    </div>
  );
};

export default MainLayout;
