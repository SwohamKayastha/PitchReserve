import React from 'react';
import { Users, Trophy, MapPin, Linkedin, GraduationCap, MapPinIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import aayush from '../assets/aayush.jpg';
import parichit from '../assets/parichit.jpg';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';


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
            {/* <a href ="/player/profile"> */}
            <a href ="/login">
              <img 
                src={profileIcon} 
                alt="profile" 
                className="h-10 w-auto"
                style={{
                  filter: 'brightness(1) contrast(1)',
                  backgroundColor: 'transparent'
                }}
              />``
            </a>  
          </div>
        </button>
      </div>


      <div className="flex items-center">
        <button className="felx items-right bg-transparent hover:bg-gray-00">
          <div className="relative h-10 w-auto p-0">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-10 w-auto"
              style={{
                filter: 'brightness(1) contrast(1)',
                backgroundColor: 'transparent'
              }}
            />
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


const AboutUs = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-emerald-600" />, value: "1000+", label: "Active Players" },
    { icon: <Trophy className="w-8 h-8 text-emerald-600" />, value: "5000+", label: "Bookings" },
    { icon: <MapPin className="w-8 h-8 text-emerald-600" />, value: "50+", label: "Venues" }
  ];

  const teamMembers = [
    {
      name: "Ayush Dahal",
      role: "Founder & CEO",
      image: aayush,
      college: "Computer Science, KU",
      address: "Banepa, Nepal",
      linkedin: "linkedin.com/in/aayush-dahal-a80ab9279"
    },
    {
      name: "Swoham Kayastha",
      role: "Technical Lead",
      image: "/api/placeholder/400/400",
      college: "Computer Science, KU",
      address: "Banepa, Nepal",
      linkedin: "linkedin.com/in/swohamkayastha/"
    },
    {
        name: "Roshish Sainju",
        role: "Lead Developer",
        image: "/api/placeholder/400/400",
        college: "Computer Science, KU",
        address: "Bhaktapur, Nepal",
        linkedin: "linkedin.com/in/roshis-sainju-a74877328/"
      },
    {
        name: "Parichit Giri",
        role: "Lead Engineer",
        image: parichit ,
        college: "Computer Science, KU",
        address: "Kathmandu, Nepal",
        linkedin: "linkedin.com/in/parichit-giri-467218343/"
    },
    {
      name: "Elvis Vaidhya",
      role: "Lead Designer",
      image: "/api/placeholder/400/400",
      college: "Computer Science, KU",
      address: "Banepa, Nepal",
      linkedin: "linkedin.com/in/"
    }
  ];

  const features = {
    players: [
      "Easy online booking system",
      "Real-time venue availability",
      "Detailed venue information",
      "Secure payment options",
      "Mobile-friendly interface",
      "Rating and review system"
    ],
    owners: [
      "Efficient venue management",
      "Increased visibility",
      "Booking analytics",
      "Automated scheduling",
      "Revenue tracking",
      "Customer insights"
    ]
  };

  return (
     <div className="fixed top-0 left-0 w-full flex justify-between items-center p-1 z-50">
      <TitleBar />
      {/* Main container */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="w-full text-center mb-16">
          <div className="w-full bg-gradient-to-r from-green-900 to-gray-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Revolutionizing Futsal in Nepal
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto text-emerald-50">
              Connecting players with the best futsal venues across Nepal through seamless digital booking
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <Card className="w-full mb-16 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-white to-emerald-50">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-emerald-800">Our Mission</h2>
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
              To make futsal accessible to everyone in Nepal by providing a hassle-free booking platform
              that connects players with quality venues while helping venue owners maximize their potential.
            </p>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="transform hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center bg-gradient-to-br from-white to-emerald-50">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold mb-2 text-emerald-800">{stat.value}</div>
                <div className="text-emerald-600 text-lg">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="w-full mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-emerald-800">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* For Players */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 bg-gradient-to-br from-white to-emerald-50">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-emerald-700">For Players</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.players.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* For Venue Owners */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 bg-gradient-to-br from-white to-emerald-50">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-emerald-700">For Venue Owners</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.owners.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="w-full pb-8 flez flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-green-800">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 sm:p-8 text-center bg-gradient-to-br from-white to-emerald-50">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-1">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-emerald-800">{member.name}</h3>
                  <p className="text-emerald-600 text-lg font-medium mb-4">{member.role}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      <span className="text-gray-600">{member.college}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPinIcon className="w-5 h-5" />
                      <span className="text-gray-600">{member.address}</span>
                    </div>
                    <a 
                      href={`https://${member.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>Connect</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;