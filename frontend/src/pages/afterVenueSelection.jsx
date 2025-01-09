
// INCOMPLETE CODE

import React from 'react';

// Frame component
const Frame = () => {
  return (
    <div className="flex">
      {/* Left Section */}
      <div className="w-1/2 p-4">
        {/* Image and Venue Info */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="C:\Users\Irithel\Pictures\Saved Pictures\worldMap.jpg"
            alt="Venue"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold">RMS TURF PARK</h2>
            <p className="text-sm text-gray-600">
              Thumka, Banepa 45210, Behind Banepa Municipality, Araniko Highway
            </p>
            <p className="text-sm text-gray-600">12:00 AM to 11:59 PM</p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex justify-between items-center mt-4">
          <button className="text-gray-600">&lt;</button>
          <span className="text-sm font-bold">January 2025</span>
          <button className="text-gray-600">&gt;</button>
        </div>

        {/* Date Buttons */}
        <div className="flex justify-between mt-2">
          {['1 WED', '2 THU', '3 FRI', '4 SAT', '5 SUN'].map((date) => (
            <button
              key={date}
              className="px-4 py-2 border rounded-lg text-sm font-medium"
            >
              {date}
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="flex items-center mt-4">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            Football
          </span>
          <span className="ml-2 text-sm">5 a side</span>
          <span className="ml-2 text-sm">5's</span>
        </div>

        {/* Available Slots */}
        <div className="mt-4">
          <h3 className="text-sm font-bold">Available Slots</h3>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'].map(
              (slot, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 rounded-lg text-xs ${
                    index === 3
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {slot}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 p-4 bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">PlaySpots</h1>
          <p className="text-sm">Nepal’s Only Futsal Venue Booking System</p>
        </div>
        <ul className="mt-4 space-y-2">
          {[
            'Search Futsals Nationwide',
            'Book Venues at a go',
            'Review the futsal venues',
            'Track your Booking records',
            'Manage Subscriptions',
          ].map((item, index) => (
            <li key={index} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Frame;
