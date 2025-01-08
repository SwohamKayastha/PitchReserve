import React from "react";
import logo from "../assets/logo.png";
import homeLocation from "../assets/homeLocation.jpg";
import noLocationPng from "../assets/bg.jpg";

export const Background = () => {
  return (
    <div className="flex w-full h-screen bg-[#f2f2f2]">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white">
        <div className="flex flex-col items-center text-center">
          <div
            className="w-[100px] h-[100px] bg-cover bg-center"
            style={{ backgroundImage: `url(${noLocationPng})` }}
          />
          <p className="mt-5 text-[#494949] text-2xl">
            Seems like you haven't picked a location yet.
          </p>
          <p className="mt-2 text-[#494949] text-sm">
            Explore more venues by selecting a location
          </p>
          <button className="mt-5 px-6 py-2 rounded-md bg-gradient-to-b from-[#009f5c] to-[#00bb59] text-white">
            Pick Your Location
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center w-1/2 bg-gradient-to-b from-[#01a15c] to-[#2dae60] text-white p-10">
        <img className="mb-5 w-[200px]" alt="Logo" src={logo} />
        <h1 className="text-2xl font-bold">
          Nepal’s Only Futsal Venue Booking System
        </h1>
        <ul className="mt-10 space-y-6 text-lg">
          <li>Search Futsals Nationwide</li>
          <li>Book Venues at a Go</li>
          <li>Review the Futsal Venues</li>
          <li>Track Your Booking Records</li>
          <li>Manage Subscriptions</li>
        </ul>
      </div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full bg-[#f9f9f9] shadow-md">
        <div className="flex items-center p-3">
          <img
            className="w-6 h-6 mr-3"
            alt="Home location"
            src={homeLocation}
          />
          <p className="text-[#444444] text-sm">No location picked</p>
        </div>
      </div>
    </div>
  );
};
