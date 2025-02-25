import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';


import { Link } from 'react-router-dom';
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
                    { name: 'Login/ Partnership', path: '/login' },
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

const Subscriptions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-6">
      <TitleBar />
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 flex items-center gap-1 text-gray-800 hover:text-gray-900 transition p-1 rounded"
          aria-label="Go back"
          style={{ fontSize: '0.8rem' }}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-3xl font-bold text-white mb-4">No Subscription Plans Available</h1>
        <p className="text-lg text-white">Please check back later for updates.</p>
      </div>
    </div>
  );
};

export default Subscriptions;