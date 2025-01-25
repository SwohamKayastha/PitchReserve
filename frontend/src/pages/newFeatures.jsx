import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Users, Trophy, ArrowRight, Bell, X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';
import {Facebook, Instagram, Mail} from 'lucide-react';
// Title Bar Component
const TitleBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <Link to="/login" className="relative">
            <img 
              src={profileIcon}
              alt="profile"
              className="h-12 w-auto transition-transform duration-200 hover:brightness-110"
            />
          </Link>
        </motion.div>

        <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center"
                >
                  <button onClick={() => window.location.href = '/'} className="relative">
                  <img 
                    src={logo}
                    alt="Logo"
                    className="h-12 w-auto"
                  />
                  </button>
                </motion.div>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              scrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>

          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: isMenuOpen ? 0 : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 w-72 h-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl"
          >
            <div className="flex flex-col p-4">
              <button 
                onClick={() => setMenuOpen(false)}
                className="self-end p-2 text-white hover:bg-gray-800 rounded-lg"
              >
                <X size={24} />
              </button>

              <nav className="mt-8">
                <ul className="space-y-4">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About Us', path: '/aboutUs' },
                    { name: 'Book Venue', path: '/toBook' },
                    { name: 'Login/ Partnership', path: '/Partnership' },
                    { name: 'Subscriptions', path: '/subscriptions' },
                    { name: 'Blogs', path: '/newFeatures' }
                  ].map((item) => (
                    <motion.li 
                      key={item.name}
                      whileHover={{ x: 10 }}
                    >
                      <Link
                        to={item.path}
                        className="block px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


const Footer = () => {
  return (
    <footer className="bg-[#0a0d14] text-white py-12 flex">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="w-40" />
            <p className="text-sm">Nepal's Only<br/>Futsal Venue<br/>Booking System</p>
          </div>
          
          <nav className="space-y-4">
            <ul className="space-y-2">
              {['Home', 'About Us', 'Partner With Us', 'Membership', 'Book Now', 'Updates', 'Blogs'].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                >
                  <Link to="/" className="hover:text-green-500 transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact Us</h3>
            <ul className="space-y-2">
              <li>Pitch Reserve</li>
              <li>Kathmandu University</li>
              <li>+977 9741740551</li>
              <li>info@pitchreserve.com.np</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {[
                { Icon: Facebook, href: 'https://facebook.com/pitchreserve' },
                { Icon: Instagram, href: 'https://instagram.com/pitchreserve' },
                { Icon: Mail, href: 'mailto:info@pitchreserve.com.np' }
              ].map(({ Icon, href }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="hover:text-green-500 transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


const FeaturesAndBlog = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [isMenuOpen, setMenuOpen] = useState(false);

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
      icon: <Bell className="w-6 h-6" />,
      title: "Push Notifications",
      description: "Instant alerts for booking confirmations, cancellations, and special offers.",
      eta: "Q1 2025"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Equipment Sharing",
      description: "Efficient use of equipment by sharing within the community.",
      eta: "Q3 2025"
    }
  ];

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

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen max-w-screen">
      <TitleBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main className="pt-20 max-w-screen">
  {/* Hero Section */}
  <motion.div 
    className="max-w-full min-h-screen bg-gradient-to-b from-green-900 to-green-200 text-white pt-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <div className="container mx-auto px-4 py-16 md:py-32">
      <motion.div 
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Revolutionizing Futsal Court Bookings
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-black">
          Discover the latest features and updates that make managing and booking futsal courts easier than ever
        </p>
        <p className="text-lg mb-8">- with PITCH RESERVE</p>
      </motion.div>
    </div>
  </motion.div>

        {/* Features Section */}
        <div className="w-full min-h-screen bg-gradient-to-b from-green-200 to-green-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-12">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 bg-green-200 p-2 rounded-lg">
                {['current', 'upcoming'].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-3 rounded-md transition-colors duration-200 ${
                      activeTab === tab
                        ? 'bg-green-600 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab === 'current' ? 'Current Features' : 'Coming Soon'}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {(activeTab === 'current' ? currentFeatures : upcomingFeatures).map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-lg shadow-lg"
                >
                  <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-green-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                  {feature.eta && (
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full mt-4">
                      Expected: {feature.eta}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="w-full min-h-screen bg-gradient-to-b from-green-100 to-green-300 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Latest Updates & Guides
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {blogPosts.map((post, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="p-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
                    <p className="text-gray-600 text-lg mb-6">{post.excerpt}</p>
                    <motion.button 
                      className="text-green-600 font-semibold inline-flex items-center text-lg hover:text-green-700"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Read More <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full min-h-screen bg-gradient-to-b from-green-300 to-green-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-8">Stay Updated</h2>
              <p className="text-gray-600 text-xl mb-12">
                Subscribe to our newsletter to receive the latest updates and features directly in your inbox.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-4 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg w-full md:w-96"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 text-lg font-semibold transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesAndBlog;