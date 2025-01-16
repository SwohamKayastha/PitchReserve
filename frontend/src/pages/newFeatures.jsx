import React, { useState } from 'react';
import { Star, Calendar, Users, Trophy, ArrowRight, Rocket, Bell } from 'lucide-react';

import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';
import { X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';    

const FeaturesAndBlog = () => {

    
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
                    { name: 'About Us', path: '/aboutUs' },
                    { name: 'Book Venue', path: '/book' },
                    { name: 'Login/ Partnership', path: '/Partnership' },
                    { name: 'Subscriptions', path: '/error' },
                    { name: 'Blogs', path: '/newFeatures' }
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


  const [activeTab, setActiveTab] = useState('current');

  // Sample feature data
  const currentFeatures = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Booking System",
      description: "Book your preferred futsal court with real-time availability checking and instant confirmation."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Owner Dashboard",
      description: "Easily manage your futsal venue, track bookings, and handle customer requests from one place."
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Player Dashboard",
        description: "Easily select your desired futsal venue, check slot availability, and book the futsal at a go."
      }
    
  ];

  const upcomingFeatures = [
    {
        
      icon: <Trophy className="w-6 h-6" />,
      title: "Tournament Organization",
      description: "Coming Soon: Create and manage tournaments with automatic fixture generation and live score updates.",
      eta: "Q2 2025"
    },
    {
      icon: <Bell className="w-10 h-6" />,
      title: "Push Notifications",
      description: "Instant alerts for booking confirmations, cancellations, and special offers.",
      eta: "Q1 2025"
    },
    
    {
      icon: <Star className="w-10 h-6" />,
      title: "Equipment Sharing",
      description: "Efficient use of equipment by sharing within the community.",
      eta: "Q3 2025"
    }
  ];

  // Sample blog posts
  const blogPosts = [
    {
      title: "How to Organize a Successful Futsal Tournament",
      excerpt: "Learn the key steps to organizing a memorable futsal tournament that players will love...",
      date: "Jan 15, 2025",
      readTime: "5 min read"
    },
    {
      title: "Maximizing Your Court's Booking Potential",
      excerpt: "Discover strategies to increase bookings and maintain a steady flow of players...",
      date: "Jan 14, 2025",
      readTime: "4 min read"
    },
    {
      title: "Latest Updates: New Payment Integration",
      excerpt: "We've added new payment options to make booking easier for players...",
      date: "Jan 13, 2025",
      readTime: "3 min read"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-white">
        <TitleBar />
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-green-900 to-green-200 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Futsal Court Bookings
            </h1>
            <p className="text-xl mb-8 text-black">
              Discover the latest features and updates that make managing and booking futsal courts easier than ever
            </p>
            <p className="text-s mb-8">
              -with PITCH RESERVE
            </p>
          </div>
        </div>
      </div>

      {/* Features Section with Tabs */}
      <div className="w-full bg-gradient-to-b from-green-200 to-green-100">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4 bg-green-200 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('current')}
                className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'current'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Current Features
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === 'upcoming'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Coming Soon
              </button>
            </div>
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeTab === 'current' 
              ? currentFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-green-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))
              : upcomingFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-dashed border-green-200"
                  >
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-green-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      Expected: {feature.eta}
                    </span>
                  </div>
                ))
            }
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="w-full bg-gradient-to-b from-green-100 to-green-300">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Updates & Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <button className="text-green-600 font-semibold inline-flex items-center hover:text-green-700">
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="w-full bg-gradient-to-b from-green-300 to-green-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive the latest updates and features directly in your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 md:w-96"
              />
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesAndBlog;