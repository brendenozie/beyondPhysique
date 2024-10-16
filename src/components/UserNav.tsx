import React, { useState } from "react";

const UserNav = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <>
        <header className="z-40 py-4  bg-gray-800  ">
            <div className="flex items-center justify-between h-8 px-6 mx-auto z-20">
                {/* <!-- Mobile hamburger --> */}
                <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple z-20"
                    aria-label="Menu" onClick={() => {setSidebarOpen(!sidebarOpen)}}>
                        {/* @click="toggleSideMenu" */}
                    {/* <x-heroicon-o-menu className="w-6 h-6 text-white" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </button>

                {/* <!-- Search Input --> */}
                <div className="flex justify-center  mt-2 mr-4 z-20">
                    {/* <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <input type="search" placeholder="Search" 
                            className="form-input px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10" />
                        {/* {{ $attributes }} */}
                        {/* <span
                            className="z-10 h-full leading-snug font-normal  text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 -mt-1" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                    </div>  */}
                    {/* <nav className="flex justify-start space-x-6 m-6">
                        <a href="/exerciseschedule" className="text-gray-400 hover:text-white">Exercise Schedule</a>
                        <a href="/foodplan" className="text-gray-400 hover:text-white">Food Plan</a>
                        <a href="/waterintake" className="text-gray-400 hover:text-white">Water Intake</a>
                    </nav> */}
                </div>

                <ul className="flex items-center flex-shrink-0 space-x-6 z-20">

                    {/* <!-- Notifications menu --> */}
                    <li className="relative">
                        <button
                            className="p-2 bg-white text-red-400 align-middle rounded-full hover:text-white hover:bg-yellow-400 focus:outline-none "
                            
                            aria-label="Notifications" aria-haspopup="true">
                                {/* @click="toggleNotificationsMenu" @keydown.escape="closeNotificationsMenu" */}
                            <div className="flex items-cemter">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            {/* <!-- Notification badge --> */}
                            <span aria-hidden="true"
                                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"></span>
                        </button>
                        {/* <template x-if="isProfileMenuOpen">
                            <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-yellow-400 border border-yellow-500 rounded-md shadow-md">
                                    
                            // x-transition:leave="transition ease-in duration-150"
                            //     x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0"
                                // @click.away="closeNotificationsMenu" @keydown.escape="closeNotificationsMenu"
                                <li className="flex">
                                    <a className="text-white inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                                        href="#">
                                        <span>Messages</span>
                                        <span
                                            className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                                            13
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </template> */}
                    </li>

                    {/* <!-- Profile menu --> */}
                    <li className="relative">
                        <button
                            className="p-2 bg-white text-blue-400 align-middle rounded-full hover:text-white hover:bg-yellow-400 focus:outline-none "
                            aria-label="Account"
                            aria-haspopup="true">
                                {/* @click="toggleProfileMenu" @keydown.escape="closeProfileMenu" */}
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </button>
                        {/*<template x-if="isProfileMenuOpen"> */}
                            {/* <ul                                         
                                className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-yellow-400 border border-yellow-500 rounded-md shadow-md"
                                aria-label="submenu">  */}
                                    
                            {/* // x-transition:leave="transition ease-in duration-150"
                            //     x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" */}
                                    {/* @click.away="closeProfileMenu" @keydown.escape="closeProfileMenu" */}
                            {/* <li className="flex">
                                    <a className=" text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                                        href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Profile</span>
                                    </a>
                                </li>
                                <li className="flex">
                                    <a className="text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                                        href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Log out</span>
                                    </a>
                                </li>
                            </ul> */}
                        {/*</template> */}
                    </li> 
                </ul>
            </div>
                                                
            <aside className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto  bg-orange-500 dark:bg-orange-500 md:hidden ${!sidebarOpen?"hidden":""}`} >
                    {/* x-show="isSideMenuOpen" x-transition:enter="transition ease-in-out duration-150"
                x-transition:enter-start="opacity-0 transform -translate-x-20" x-transition:enter-end="opacity-100"
                x-transition:leave="transition ease-in-out duration-150" x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0 transform -translate-x-20" */}
                    {/* @click.away="closeSideMenu" */}
                {/* @keydown.escape="closeSideMenu" */}
                <div>
                    <div className="text-white">
                        <div className="flex p-2  bg-orange-500">
                            <div className="flex py-3 px-2 items-center">
                                <p className="text-2xl text-white font-semibold">WorkoutPro</p> 
                                <br/>
                                <p className="ml-2 font-semibold italic"></p>
                            </div>
                        </div>
                        <div>
                            <ul className="mt-6 leading-10">                                
                                <li className="relative px-2 py-1 ">
                                <a className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-yellow-500" 
                                    href="/dashboard2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="category"><g fill="#fff" transform="translate(2 2)"><path d="M14.0755097,2.66453526e-15 L17.4614756,2.66453526e-15 C18.8637443,2.66453526e-15 20,1.1458518 20,2.55996321 L20,5.97452492 C20,7.38863633 18.8637443,8.53448813 17.4614756,8.53448813 L14.0755097,8.53448813 C12.673241,8.53448813 11.5369853,7.38863633 11.5369853,5.97452492 L11.5369853,2.55996321 C11.5369853,1.1458518 12.673241,2.66453526e-15 14.0755097,2.66453526e-15" opacity=".4"></path><path d="M5.9244903,11.4655119 C7.32675901,11.4655119 8.46301469,12.6113637 8.46301469,14.0254751 L8.46301469,17.4400368 C8.46301469,18.8531901 7.32675901,20 5.9244903,20 L2.53852439,20 C1.13625568,20 8.8817842e-16,18.8531901 8.8817842e-16,17.4400368 L8.8817842e-16,14.0254751 C8.8817842e-16,12.6113637 1.13625568,11.4655119 2.53852439,11.4655119 L5.9244903,11.4655119 Z M17.4614756,11.4655119 C18.8637443,11.4655119 20,12.6113637 20,14.0254751 L20,17.4400368 C20,18.8531901 18.8637443,20 17.4614756,20 L14.0755097,20 C12.673241,20 11.5369853,18.8531901 11.5369853,17.4400368 L11.5369853,14.0254751 C11.5369853,12.6113637 12.673241,11.4655119 14.0755097,11.4655119 L17.4614756,11.4655119 Z M5.9244903,7.99360578e-15 C7.32675901,7.99360578e-15 8.46301469,1.1458518 8.46301469,2.55996321 L8.46301469,5.97452492 C8.46301469,7.38863633 7.32675901,8.53448813 5.9244903,8.53448813 L2.53852439,8.53448813 C1.13625568,8.53448813 8.8817842e-16,7.38863633 8.8817842e-16,5.97452492 L8.8817842e-16,2.55996321 C8.8817842e-16,1.1458518 1.13625568,7.99360578e-15 2.53852439,7.99360578e-15 L5.9244903,7.99360578e-15 Z"></path></g></svg>
                                    <span className="ml-4">Overview</span>
                                </a>
                            </li>
                            <li className="relative px-2 py-1" >
                            {/* x-data="{ Open : false  }" */}
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer"
                                    >
                                        {/* x-on:click="Open = !Open" */}
                                    <a
                                        className="inline-flex items-center  text-sm font-semibold text-white hover:text-yellow-400" href="/exercisedash">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                                        </svg>
                                        <span className="ml-4">Workouts</span>
                                    </a>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="!Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div  className="hidden">
                                {/* x-show.transition="Open" */}
                                    <ul 
                                        className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  bg-yellow-400"
                                        aria-label="submenu">
                                            {/* x-transition:enter="transition-all ease-in-out duration-300"
                                        x-transition:enter-start="opacity-25 max-h-0"
                                        x-transition:enter-end="opacity-100 max-h-xl"
                                        x-transition:leave="transition-all ease-in-out duration-300"
                                        x-transition:leave-start="opacity-100 max-h-xl"
                                        x-transition:leave-end="opacity-0 max-h-0" */}

                                        <li className="px-2 py-1 text-white transition-colors duration-150">
                                            <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                                                <div className="flex items-center">
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <a href="#"
                                                        className="w-full ml-2  text-sm font-semibold text-white hover:text-gray-800">Item
                                                        1</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative px-2 py-1" >
                            {/* x-data="{ Open : false  }" */}
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer"
                                    >
                                        {/* x-on:click="Open = !Open" */}
                                    <a
                                        className="inline-flex items-center  text-sm font-semibold text-white hover:text-yellow-400" href="/onlineclasses">
                                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144" id="analytics">
                                                <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M123.326 56.625v36.242c0 6.578-5.382 11.961-11.961 11.961H35.978c-6.578 0-11.961-5.382-11.961-11.961V34.093M123.326 34.093v11.779"></path><path fill="#fff" d="M126.57 23.055H86.821c-.051-1-1.575-4-3.44-4H63.432c-1.865 0-3.389 3-3.44 4H20.243c-2.521 0-4.883 1.002-4.883 3.452v1.239c0 2.45 2.362 5.309 4.883 5.309H126.57c2.521 0 3.79-2.86 3.79-5.309v-1.239c0-2.45-1.269-3.452-3.79-3.452zm-45.187 4H65.759c-1.269 0-2.307-.731-2.307-2 0-1.269 1.038-2 2.307-2h15.623c1.269 0 2.307.731 2.307 2 .001 1.269-1.037 2-2.306 2z" opacity=".3"></path><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M126.57 22.555H86.821c-.051-1-1.575-4-3.44-4H63.432c-1.865 0-3.389 3-3.44 4H20.243c-2.521 0-4.383 1.639-4.383 4.16v1.275c0 2.521 1.862 5.565 4.383 5.565H126.57c2.521 0 4.29-3.044 4.29-5.565v-1.275c0-2.521-1.769-4.16-4.29-4.16z"></path>
                                                <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M81.627 26.98H65.514a2.068 2.068 0 0 1-2.062-2.062v-.489c0-1.134.928-2.062 2.062-2.062h16.113c1.134 0 2.063.928 2.063 2.062v.489a2.069 2.069 0 0 1-2.063 2.062zM7.541 45.974V56.46M2.298 51.217h10.486M45.15 60.341v6.278M42.011 63.48h6.278M100.283 48.078v6.278M103.422 51.217h-6.278M136.376 68.161v10.486M141.619 73.404h-10.486M73.683 104.828l-.011 14.444"></path>
                                                <circle cx="73.672" cy="122.998" r="3.726" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle>
                                                <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="m97.318 76.079 22.926-21.133M78.069 63.392l11.307 12.266M47.134 84.033l23.063-21.26"></path>
                                                <circle cx="124.255" cy="51.248" r="5.455" fill="#fff" opacity=".3" transform="rotate(-6.76 124.285 51.258)"></circle>
                                                <circle cx="124.255" cy="51.248" r="5.455" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" transform="rotate(-6.76 124.285 51.258)"></circle>
                                                <circle cx="93.149" cy="79.599" r="5.455" fill="#fff" opacity=".3" transform="rotate(-6.76 93.171 79.616)"></circle>
                                                <circle cx="93.149" cy="79.599" r="5.455" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" transform="rotate(-6.76 93.171 79.616)"></circle>
                                                <g transform="rotate(-6.76 74.446 59.341)"><circle cx="74.428" cy="59.328" r="5.455" fill="#fff" opacity=".3"></circle>
                                                <circle cx="74.428" cy="59.328" r="5.455" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle></g>
                                                <g transform="rotate(-6.76 43.135 87.749)"><circle cx="43.125" cy="87.729" r="5.455" fill="#fff" opacity=".3"></circle>
                                                <circle cx="43.125" cy="87.729" r="5.455" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></circle></g>
                                                <path fill="#fff" d="M24.018 33.316h99.308v6.619H24.018z" opacity=".3"></path>
                                            </svg>
                                        <span className="ml-4">Programs</span>
                                    </a>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="!Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div  className="hidden">
                                {/* x-show.transition="Open" */}
                                    <ul 
                                        className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  bg-yellow-400"
                                        aria-label="submenu">
                                            {/* x-transition:enter="transition-all ease-in-out duration-300"
                                        x-transition:enter-start="opacity-25 max-h-0"
                                        x-transition:enter-end="opacity-100 max-h-xl"
                                        x-transition:leave="transition-all ease-in-out duration-300"
                                        x-transition:leave-start="opacity-100 max-h-xl"
                                        x-transition:leave-end="opacity-0 max-h-0" */}

                                        <li className="px-2 py-1 text-white transition-colors duration-150">
                                            <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                                                <div className="flex items-center">
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <a href="#"
                                                        className="w-full ml-2  text-sm font-semibold text-white hover:text-gray-800">Item
                                                        1</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative px-2 py-1" >
                            {/* x-data="{ Open : false  }" */}
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer"
                                    >
                                        {/* x-on:click="Open = !Open" */}
                                    <a
                                        className="inline-flex items-center  text-sm font-semibold text-white hover:text-yellow-400" href="/meals">
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                        <span className="ml-4">Meals</span>
                                    </a>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="!Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div  className="hidden">
                                {/* x-show.transition="Open" */}
                                    <ul 
                                        className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  bg-yellow-400"
                                        aria-label="submenu">
                                            {/* x-transition:enter="transition-all ease-in-out duration-300"
                                        x-transition:enter-start="opacity-25 max-h-0"
                                        x-transition:enter-end="opacity-100 max-h-xl"
                                        x-transition:leave="transition-all ease-in-out duration-300"
                                        x-transition:leave-start="opacity-100 max-h-xl"
                                        x-transition:leave-end="opacity-0 max-h-0" */}

                                        <li className="px-2 py-1 text-white transition-colors duration-150">
                                            <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                                                <div className="flex items-center">
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <a href="#"
                                                        className="w-full ml-2  text-sm font-semibold text-white hover:text-gray-800">Item
                                                        1</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative px-2 py-1" >
                            {/* x-data="{ Open : false  }" */}
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer"
                                    >
                                        {/* x-on:click="Open = !Open" */}
                                    <a
                                        className="inline-flex items-center  text-sm font-semibold text-white hover:text-yellow-400" href="/messages">
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                                        </svg>
                                        <span className="ml-4">Messages</span>
                                    </a>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="!Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div  className="hidden">
                                {/* x-show.transition="Open" */}
                                    <ul 
                                        className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  bg-yellow-400"
                                        aria-label="submenu">
                                            {/* x-transition:enter="transition-all ease-in-out duration-300"
                                        x-transition:enter-start="opacity-25 max-h-0"
                                        x-transition:enter-end="opacity-100 max-h-xl"
                                        x-transition:leave="transition-all ease-in-out duration-300"
                                        x-transition:leave-start="opacity-100 max-h-xl"
                                        x-transition:leave-end="opacity-0 max-h-0" */}

                                        <li className="px-2 py-1 text-white transition-colors duration-150">
                                            <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                                                <div className="flex items-center">
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <a href="#"
                                                        className="w-full ml-2  text-sm font-semibold text-white hover:text-gray-800">Item
                                                        1</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative px-2 py-1" >
                            {/* x-data="{ Open : false  }" */}
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer"
                                    >
                                        {/* x-on:click="Open = !Open" */}
                                    <span
                                        className="inline-flex items-center  text-sm font-semibold text-gray-300 hover:text-yellow-400">
                                        <span className="">Accounts</span>
                                    </span>
                                </div>
                            </li>
                            
                            <li className="relative px-2 py-1" >
                            {/* x-data="{ Open : false  }" */}
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer"
                                    >
                                        {/* x-on:click="Open = !Open" */}
                                    <a href="/settings"
                                        className="inline-flex items-center  text-sm font-semibold text-white hover:text-yellow-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        <span className="ml-4">Settings</span>
                                    </a>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="!Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div  className="hidden">
                                {/* x-show.transition="Open" */}
                                    <ul 
                                        className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  bg-yellow-400"
                                        aria-label="submenu">
                                            {/* x-transition:enter="transition-all ease-in-out duration-300"
                                        x-transition:enter-start="opacity-25 max-h-0"
                                        x-transition:enter-end="opacity-100 max-h-xl"
                                        x-transition:leave="transition-all ease-in-out duration-300"
                                        x-transition:leave-start="opacity-100 max-h-xl"
                                        x-transition:leave-end="opacity-0 max-h-0" */}

                                        <li className="px-2 py-1 text-white transition-colors duration-150">
                                            <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <a href="#"
                                                        className="w-full ml-2  text-sm font-semibold text-white hover:text-gray-800">Item
                                                        1</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative px-2 py-1" >
                            {/* x-data="{ Open : false  }" */}
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer"
                                    >
                                        {/* x-on:click="Open = !Open" */}
                                    <a href="helpsupport"
                                        className="inline-flex items-center  text-sm font-semibold text-white hover:text-yellow-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                                        </svg>
                                        <span className="ml-4">Help & Support</span>
                                    </a>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="!Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div  className="hidden">
                                {/* x-show.transition="Open" */}
                                    <ul 
                                        className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  bg-yellow-400"
                                        aria-label="submenu">
                                            {/* x-transition:enter="transition-all ease-in-out duration-300"
                                        x-transition:enter-start="opacity-25 max-h-0"
                                        x-transition:enter-end="opacity-100 max-h-xl"
                                        x-transition:leave="transition-all ease-in-out duration-300"
                                        x-transition:leave-start="opacity-100 max-h-xl"
                                        x-transition:leave-end="opacity-0 max-h-0" */}

                                        <li className="px-2 py-1 text-white transition-colors duration-150">
                                            <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <a href="#"
                                                        className="w-full ml-2  text-sm font-semibold text-white hover:text-gray-800">Item
                                                        1</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="relative px-2 py-1" >
                            {/* x-data="{ Open : false  }" */}
                                <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer"
                                    >
                                        {/* x-on:click="Open = !Open" */}
                                    <span
                                        className="inline-flex items-center  text-sm font-semibold text-white hover:text-yellow-400">
                                            <svg className="w-6 h-6 text-white" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z" fill="#fff"/>
                                            </svg>
                                        <span className="ml-4">Log Out</span>
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="!Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 19l-7-7 7-7" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="ml-1  text-white w-4 h-4 hidden" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" >
                                            {/* x-show="Open" */}
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                <div  className="hidden">
                                {/* x-show.transition="Open" */}
                                    <ul 
                                        className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  bg-yellow-400"
                                        aria-label="submenu">
                                            {/* x-transition:enter="transition-all ease-in-out duration-300"
                                        x-transition:enter-start="opacity-25 max-h-0"
                                        x-transition:enter-end="opacity-100 max-h-xl"
                                        x-transition:leave="transition-all ease-in-out duration-300"
                                        x-transition:leave-start="opacity-100 max-h-xl"
                                        x-transition:leave-end="opacity-0 max-h-0" */}

                                        <li className="px-2 py-1 text-white transition-colors duration-150">
                                            <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                    <a href="#"
                                                        className="w-full ml-2  text-sm font-semibold text-white hover:text-gray-800">Item
                                                        1</a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>

            {/* <!-- Mobile sidebar --> Backdrop --> */}
            <div className={`fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center ${!sidebarOpen?"hidden":""}`}></div>
                {/* x-show="isSideMenuOpen" x-transition:enter="transition ease-in-out duration-150"
                    x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
                    x-transition:leave="transition ease-in-out duration-150" x-transition:leave-start="opacity-100"
                    x-transition:leave-end="opacity-0" */}
        </header>

        {/* <button onClick={toggleSidebar} className="lg:hidden mb-4 bg-orange-500 text-white px-4 py-2 rounded m-6">
        <span className="material-icons">menu</span>
        </button> */}

        
    </>
  );
};

export default UserNav;
