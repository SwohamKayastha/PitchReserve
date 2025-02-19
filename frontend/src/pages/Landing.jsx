import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Menu, Facebook, Instagram, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { handleProfileClick } from '../utils/auth';
import subscriptionImage from '../assets/subscriptions.jpg';
import mapOfNepal from '../assets/mapOfNepal.png';
import searchicon from '../assets/searchIcon.png';
import bookicon from '../assets/bookIcon.png';
import playicon from '../assets/playIcon.png';
import heroimage from '../assets/bg.jpg';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';

const TitleBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center p-4">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
          <button 
            onClick={() => handleProfileClick(navigate)}
            className="relative"
          >
            <img
              src={profileIcon}
              alt="profile"
              className="h-12 w-auto transition-transform duration-200 hover:brightness-110"
            />
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </motion.div>

        <div className="relative flex items-center">
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
                    { name: 'Login/ Partnership', path: '/login' }, // Updated path from '/Partnership' to '/login'dated path from '/Partnership' to '/login'
                    { name: 'Subscriptions', path: '/subscriptions' },
                    { name: 'Blogs', path: '/newFeatures' }
                  ].map((item) => (
                    <motion.li key={item.name} whileHover={{ x: 10 }}>
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


const HeroSection = () => {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <motion.img
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        src={heroimage}
        alt="lander"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 flex flex-col justify-center items-center text-white"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight">
          YOUR NEAREST SPORTS COMMUNITY
        </h1>
        <p className="text-lg md:text-2xl mb-8">IS JUST A TAP AWAY</p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/toBook">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Book Now
            </motion.button>
          </Link>
          <Link to="/ownerProfile">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              List Your Venue
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const MapSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row"
    >
      <div className="w-full md:w-1/2 bg-green-500 p-8 flex flex-col">
        <motion.div
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          className="flex flex-col"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-black">PitchReserve.</h2>
          <h2 className="text-white mt-4">AVAILABLE IN MAJOR CITIES OF NEPAL</h2>
        </motion.div>
        <div className="mt-4">
          <h6 className="text-black">JOIN THE COMMUNITY & GUIDE YOUR WAY THROUGH THE PITCH</h6>
        </div>
      </div>
      <motion.div
        initial={{ x: 50 }}
        whileInView={{ x: 0 }}
        className="w-full md:w-1/2 bg-green-950 p-8"
      >
        <img src={mapOfNepal} alt="Map of Nepal" className="w-full h-full object-cover" />
      </motion.div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: searchicon,
      title: "Search",
      description: "Explore the network of sports facilities throughout Nepal."
    },
    {
      icon: bookicon,
      title: "Book",
      description: "Make online bookings & secure payments with ease."
    },
    {
      icon: playicon,
      title: "Play",
      description: "You're all set for your epic match!"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 w-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-6"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="mx-auto w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SubscriptionSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row bg-pink-100"
    >
      <motion.div
        initial={{ x: -50 }}
        whileInView={{ x: 0 }}
        className="w-full md:w-1/2 p-8 flex items-center justify-center"
      >
        <img src={subscriptionImage} alt="Subscription" className="max-w-md rounded-lg shadow-xl" />
      </motion.div>
      <motion.div
        initial={{ x: 50 }}
        whileInView={{ x: 0 }}
        className="w-full md:w-1/2 p-8 flex flex-col justify-center items-end"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">SUBSCRIPTIONS</h2>
        <p className="text-lg md:text-xl mb-6">PLAY REGULAR, PAY LESS</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/subscriptions'}
          className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors"
        >
          View Subscriptions
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0a0d14] text-white py-12 flex w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex items-center space-x-4">
            <Link to="/" className="relative">
              <img
                src={logo}
                alt="logo"
                className="h-20 w-auto transition-transform duration-200 hover:brightness-110"
              />
            </Link>
            <p className="text-m">Nepal's Only<br />Futsal Venue<br />Booking System</p>
          </div>

          <nav className="">
            <ul className="space-y-0">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/aboutUs' },
                { name: 'Book Venue', path: '/toBook' },
                { name: 'Login/ Partnership', path: '/login' }, // Updated path from '/Partnership' to '/login'
                { name: 'Subscriptions', path: '/subscriptions' },
                { name: 'Blogs', path: '/newFeatures' }
              ].map((item) => (
                <motion.li key={item.name} whileHover={{ x: 10 }}>
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

const Landing = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <TitleBar />
      <HeroSection />
      <MapSection />
      <FeaturesSection />
      <SubscriptionSection />
      <Footer />
    </div>
  );
};

export default Landing;