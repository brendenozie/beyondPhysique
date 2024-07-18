// src/components/RightSidebar.js
import React from 'react';

const RightSide = () => {
  return (
    <div className="hidden lg:block lg:w-64 bg-gray-800 h-full p-6">
      <div className="bg-gray-800 p-4 lg:p-6 rounded-lg mb-6">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Health Fitness</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">Learn More</button>
      </div>
      <div className="bg-orange-500 p-4 lg:p-6 rounded-lg mb-6">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Strength Training</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button className="mt-4 bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded">Learn More</button>
      </div>
      <div className="bg-gray-800 p-4 lg:p-6 rounded-lg mb-6">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Fat Burning</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">Learn More</button>
      </div>
      <div className="bg-gray-800 p-4 lg:p-6 rounded-lg">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Cardio Training</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">Learn More</button>
      </div>
    </div>
  );
};

export default RightSide;
