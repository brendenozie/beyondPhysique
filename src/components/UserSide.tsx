// src/components/Sidebar.js
import React from 'react';

type Props = { isOpen : any , toggleSidebar : any };

const UserSide = (props: Props) => {
  return (
    <div className={`fixed lg:relative top-0 left-0 w-64 bg-orange-500 h-full transition-transform transform ${props.isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-50`}>
      <div className="flex justify-between items-center lg:hidden p-4">
        <h1 className="text-white text-lg font-bold">Menu</h1>
        <button onClick={props.toggleSidebar} className="text-white focus:outline-none">
          <span className="material-icons">close</span>
        </button>
      </div>
      <nav className="mt-10 space-y-4">
        <a href="#" className="block px-4 py-2 text-white hover:bg-orange-600">Exercise</a>
        <a href="#" className="block px-4 py-2 text-white hover:bg-orange-600">Food Plan</a>
        <a href="#" className="block px-4 py-2 text-white hover:bg-orange-600">Daily Habits</a>
        <a href="#" className="block px-4 py-2 text-white hover:bg-orange-600">Water Intake</a>
      </nav>
    </div>
  );
};

export default UserSide;
