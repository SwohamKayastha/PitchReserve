import React, { useState } from 'react';
import { Users, Trophy, MapPin, Linkedin, GraduationCap, MapPinIcon, X, Menu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import aayush from '../assets/aayush.jpg';
import parichit from '../assets/parichit.jpg';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';

const TitleBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <a href="/login">
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

        <div className="flex items-center">
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

        <button
          className="p-2 text-black bg-transparent hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sliding Menu */}
      <div 
        className={`fixed right-0 top-0 w-64 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="flex flex-col p-4">
          <button 
            onClick={toggleMenu}
            className="self-end p-2 text-white hover:bg-gray-800 rounded-lg"
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
                    className="block px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

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
      image: parichit,
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
    <div className="min-h-screen bg-gray-50">
      <TitleBar />
      
      {/* Main content */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="w-full mb-16">
          <div className="w-full bg-gradient-to-r from-green-900 to-gray-900 text-white rounded-3xl p-6 sm:p-10 lg:p-16 shadow-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Revolutionizing Futsal in Nepal
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl max-w-3xl mx-auto text-emerald-50">
              Connecting players with the best futsal venues across Nepal through seamless digital booking
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <Card className="w-full mb-16 shadow-lg">
          <CardContent className="p-6 sm:p-10 bg-gradient-to-br from-white to-emerald-50">
            <h2 className="text-xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-emerald-800">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              To make futsal accessible to everyone in Nepal by providing a hassle-free booking platform
              that connects players with quality venues while helping venue owners maximize their potential.
            </p>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="transform hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6 sm:p-8 text-center bg-gradient-to-br from-white to-emerald-50">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-emerald-800">{stat.value}</div>
                <div className="text-emerald-600 text-base sm:text-lg">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center text-emerald-800">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* For Players */}
            <Card className="shadow-lg">
              <CardContent className="p-6 sm:p-8 bg-gradient-to-br from-white to-emerald-50">
                <h3 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-emerald-700">For Players</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.players.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* For Venue Owners */}
            <Card className="shadow-lg">
              <CardContent className="p-6 sm:p-8 bg-gradient-to-br from-white to-emerald-50">
                <h3 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-emerald-700">For Venue Owners</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.owners.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="pb-16">
          <h2 className="text-xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center text-green-800">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-4 sm:p-6 text-center bg-gradient-to-br from-white to-emerald-50">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-1">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-emerald-800">{member.name}</h3>
                  <p className="text-base sm:text-lg text-emerald-600 font-medium mb-4">{member.role}</p>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base text-gray-600">{member.college}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base text-gray-600">{member.address}</span>
                    </div>
                    <a 
                      href={`https://${member.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700"
                    >
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Connect</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;