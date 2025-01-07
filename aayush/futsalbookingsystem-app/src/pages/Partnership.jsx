import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

import playicon from '../assets/playIcon.png';
import set from '../assets/set.jpg';
import get from '../assets/get.jpg'
import background from '../assets/background.jpeg'
import logo from "../assets/logo.png"
import profileIcon from '../assets/profileIcon.png';

import { Facebook, Instagram, Mail } from 'lucide-react';
import { X, Menu } from 'lucide-react';

import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TitleBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-1 z-50">
      <div className="flex items-center">
        <button className="felx items-center bg-transparent hover:bg-gray-00">
          <div className="relative h-10 w-auto p-0">
            <a href="login">
              <img 
                src={profileIcon} 
                alt="profile" 
                className="h-10 w-auto"
                style={{
                  filter: 'brightness(1) contrast(1)',
                  backgroundColor: 'transparent'
                }}
              />
            </a>  
          </div>
        </button>
      </div>
      <div className="flex items-center">
                <button className="felx items-center bg-transparent hover:bg-gray-00">
                  <div className="relative h-10 w-auto p-0">
                    <a href='/'>
                      <img 
                        src={logo} 
                        alt="Logo" 
                        className="h-10 w-auto"
                        style={{
                          filter: 'brightness(1) contrast(1)',
                          backgroundColor: 'transparent'
                        }}
                      />
                    </a>  
                  </div>
                </button>
              </div>
      <div className="relative">
        <button
          className="p-2 text-black bg-transparent hover:bg-gray-400 rounded-lg transition-colors duration-200 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sliding Menu */}
        <div 
          className={`fixed right-0 top-0 w-64 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50`}
        >
          <div className="flex flex-col p-4">
            <button 
              onClick={toggleMenu}
              className="self-end p-2 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          

            <nav className="mt-8">
              <ul className="space-y-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Book Venue', path: '/book' },
                  { name: 'Login/ Partnership', path: '/Partnership' },
                  { name: 'Subscriptions', path: '/subscriptions' },
                  { name: 'Blogs', path: '/blogs' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="block px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

              {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};


const Background = () => {
  return (
    <div className="relative h-[600px] w-[1420px] bg-gray-800 bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
        <h1 className="text-white text-5xl font-bold">
          PARTNER WITH US
        </h1>
        <p className="text-gray-200 text-xl max-w-2xl mx-auto">
          Join our network of premium sports venues and reach thousands of sports enthusiasts
        </p>
      </div>
    </div>
  );
};


const StatCard = ({ icon, number, label }) => (
  <div className="bg-white shadow-lg rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-2">{number}</div>
      {label && (
        <div className="text-green-700 font-medium text-lg text-center">
          {label}
        </div>
      )}
    </div>
  </div>
);

const FeatureSection = ({ title, description, isReversed }) => (
  <div className="flex flex-col max-w-[1140px] items-start px-4 py-8 w-full">
    <div className={`flex items-center w-full ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-1">
        <div className="font-['Montserrat-Medium'] font-medium text-black text-[26px] leading-[31.2px]">
          {title}
        </div>
      </div>
      <div className="w-[315px] px-4">
        <div className="h-0.5 rounded-[100px] border border-solid border-[#03552b]" />
      </div>
    </div>
    <div className={`w-80 py-2.5 ${isReversed ? 'ml-auto text-right' : ''}`}>
      <p className="font-['Montserrat-Regular'] text-[#212529] text-base leading-6">
        {description}
      </p>
    </div>
  </div>
);

export const Container = () => {
  const stats = [
    { icon: "👥", number: "10000+", label: "Active Users" },
    { icon: "🏟️", number: "500+", label: "Sports Venues" },
    { icon: "🌆", number: "20+", label: "Cities" },
    { icon: "⚽", number: "Futsal", label: "Sports Category" },
    { icon: "🏆", number: "ALL 7", label: "States Coverage" }
  ];

  const features = [
    {
      title: "IMPROVE THE MANAGEMENT ",
      description: "With out audit reports venues can easily streamline bookings",
      isReversed: false
    },
    {
      title: "INCREASE VISIBILITY",
      description: "As the Only Turf facility network of nepal we increase the exposure of the venue",
      isReversed: true
    }
  ];

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-green-900 mb-4">Our Growing Network</h2>
          <p className="text-gray-900 max-w-2xl mx-auto">
            Join the largest sports venue booking platform and be part of our success story
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="max-w-[1140px] mx-auto space-y-12 text-center">
          {features.map((feature, index) => (
            <FeatureSection key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};
export const Backgrounds = () => {
  // Reusable Step Component
  const Step = ({ image, titleGreen, titleBlack, description }) => (
    <div className="flex flex-col max-w-[380px] items-start px-4 py-0 flex-1 grow">
      <div className="relative w-full h-auto">
        {/* Icon */}
        <div className="absolute w-[50px] h-[50px] top-6 left-2.5 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} aria-hidden="true"></div>
        
        {/* Title */}
        <div className="flex items-end mt-[60px] ml-2.5">
          <span className="text-[#07a856] text-[32px] font-semibold">{titleGreen}</span>
          <span className="text-black text-[22px] font-semibold ml-2">{titleBlack}</span>
        </div>
        
        {/* Description */}
        <p className="mt-4 text-black text-lg leading-[27px]">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center px-10 lg:px-[390px] py-12 bg-cover bg-center relative" style={{ backgroundImage: "url(/background.png)" }}>
      {/* Header */}
      <div className="flex flex-col items-center max-w-[1140px] w-full gap-4 text-center">
        <h1 className="text-[50px] leading-[60px] font-semibold">
          <span className="text-[#07a856]">Get started </span>
          <span className="text-black">in 3</span>
          <span className="text-[#07a856]"> easy </span>
          <span className="text-black">steps</span>
        </h1>
      </div>
      
      {/* Steps */}
      <div className="flex flex-row justify-center text-start gap-6 mt-8 w-full max-w-[1440px]">
        <Step 
          image={get}
          titleGreen="Get"
          titleBlack="Connected"
          description="Fill in details on the partnership form & get connected with the support team."
        />
        <Step 
          image={set}
          titleGreen="Set"
          titleBlack="Futsal Details"
          description="Update the necessary information about the futsal and time schedules."
        />
        <Step 
          image={playicon}
          titleGreen="Go"
          titleBlack="Live"
          description="Go live and start getting online bookings."
        />
      </div>
    </div>
  );
};


const Footer = () => {
  return (
    <div className="bg-[#0a0d14] text-white py-8 justify-center items-center" >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          
          {/* Logo and Tagline Section */}
          <div className="flex flex-row mx-auto my-10 w-1/16 h-auto relative">
            <div>
              <img src={logo} alt="Logo" className="w-40 h -20768"/>
            </div>
            <div className="mb-4 text-start">
              <p>Nepal's Only<br></br> Futsal Venue<br></br> Booking System</p>
            </div>
            {/* Vertical Divider */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-40 bg-gray-600" />
          </div>

          {/* Navigation Links Column */}
          <div className="col-span-1 text-center relative">
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">About us</a></li>
              <li><a href="/partnership" className="hover:text-gray-300">Partner With Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Membership/Subscriptions</a></li>
              <li><a href="#" className="hover:text-gray-300">Book Now</a></li>
              <li><a href="#" className="hover:text-gray-300">Updates</a></li>
              <li><a href="#" className="hover:text-gray-300">Blogs</a></li>
            </ul>
            {/* Vertical Divider */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-40 bg-gray-600" />
          </div>

          {/* Contact Info Column */}
          <div className="col-span-1 text-center">
            <ul className="space-y-2">
              <li>Pitch Reserve</li>
              <li>CS</li>
              <li>Kathmandu University</li>
              <li>+977 9741740551</li>
              <li>info@pitchreserve.com.np</li>
              {/* Social Media Links */}
              <li className="pt-4">
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://facebook.com/pitchreserve" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-blue-600 rounded-full transition-colors duration-300"
                  >
                    <Facebook size={24} />
                  </a>
                  <a 
                    href="https://instagram.com/pitchreserve" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-pink-600 rounded-full transition-colors duration-300"
                  >
                    <Instagram size={24} />
                  </a>
                  <a 
                    href="mailto:aayush7723@student.ku.edu.np"
                    className="p-2 hover:bg-red-600 rounded-full transition-colors duration-300"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

const Partnership = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    mname: '',
    email: '',
    venueName: '',
    numFutsals: '',
    sportType: '',
    contactNumber: '',
    location: '',
    otherDetails: '',
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  // };

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleValidation = () => {
    if (!formData.fname || !formData.lname || !formData.email || !formData.venueName || !formData.contactNumber) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!/^\+?\d+$/.test(formData.contactNumber)) {
      setError('Please enter a valid contact number.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      console.log('Form submitted:', formData);
      // Navigate only if validation passes
      navigate('/login', { state: { email: formData.email } });
      navigate('/login', { state: { fromPartnership: true } });
    }
    if (handleValidation()) {
      console.log('Form submitted:', formData);
      // Navigate to the /login page with email as state
     

    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TitleBar />
      <Background />
      <Container />
      <Backgrounds />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-4 pb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Start Your Journey With Pitch Reserve
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our team will get in touch with you shortly
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fname"
                    placeholder="Enter your first name"
                    className="h-12"
                    value={formData.fname}
                    onChange={(e) => setFormData({...formData, fname: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lname"
                    placeholder="Enter your last name"
                    className="h-12"
                    value={formData.lname}
                    onChange={(e) => setFormData({...formData, lname: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="mname" className="text-sm font-medium">
                    Middle Name <span className="text-red-500"></span>
                  </Label>
                  <Input
                    id="mname"
                    placeholder="Enter your middle name"
                    className="h-12"
                    value={formData.mname}
                    onChange={(e) => setFormData({...formData, mname: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-12"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="venueName" className="text-sm font-medium">
                    Venue Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="venueName"
                    placeholder="Enter your venue name"
                    className="h-12"
                    value={formData.venueName}
                    onChange={(e) => setFormData({...formData, venueName: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="numFutsals" className="text-sm font-medium">
                    Number of Venues
                  </Label>
                  <Input
                    id="numFutsals"
                    placeholder="How many venues do you have?"
                    className="h-12"
                    value={formData.numFutsals}
                    onChange={(e) => setFormData({...formData, numFutsals: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="contactNumber" className="text-sm font-medium">
                    Contact Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactNumber"
                    placeholder="+977 9841000000"
                    className="h-12"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    className="h-12"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <Label htmlFor="otherDetails" className="text-sm font-medium">
                    Additional Information
                  </Label>
                  <Textarea
                    id="otherDetails"
                    placeholder="Tell us more about your venue..."
                    className="min-h-[100px]"
                    value={formData.otherDetails}
                    onChange={(e) => setFormData({...formData, otherDetails: e.target.value})}
                  />
                </div>
              </div>

              

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  className="w-full md:w-auto px-6 py-6 bg-green-900 hover:bg-green-700 text-lg font-medium"
                  onClick={handleValidation} 
                >
                  Create an Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Partnership;