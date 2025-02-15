import React, { useState, useEffect } from 'react';
import { Users, Trophy, MapPin, Linkedin, GraduationCap, MapPinIcon, X, Menu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import aayush from '../assets/aayush.jpg';
import parichit from '../assets/parichit.jpg';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';
import {Facebook, Instagram, Mail } from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 }
};
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


const AboutUs = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-emerald-600" />, value: "1000+", label: "Active Players" },
    { icon: <Trophy className="w-8 h-8 text-emerald-600" />, value: "5000+", label: "Bookings" },
    { icon: <MapPin className="w-8 h-8 text-emerald-600" />, value: "50+", label: "Venues" }
  ];

  const teamMembers = [
    {
      name: "Ayush Dahal",
      role: "Member",
      image: aayush,
      college: "Computer Science, KU",
      address: "Banepa, Nepal",
      linkedin: "linkedin.com/in/aayush-dahal-a80ab9279"
    },
    {
      name: "Swoham Kayastha",
      role: "Member",
      image: "/api/placeholder/400/400",
      college: "Computer Science, KU",
      address: "Banepa, Nepal",
      linkedin: "linkedin.com/in/swohamkayastha/"
    },
    {
      name: "Roshish Sainju",
      role: "Member",
      image: "/api/placeholder/400/400",
      college: "Computer Science, KU",
      address: "Bhaktapur, Nepal",
      linkedin: "linkedin.com/in/roshis-sainju-a74877328/"
    },
    {
      name: "Parichit Giri",
      role: "Member",
      image: parichit,
      college: "Computer Science, KU",
      address: "Kathmandu, Nepal",
      linkedin: "linkedin.com/in/parichit-giri-467218343/"
    },
    {
      name: "Elvis Vaidhya",
      role: "Member",
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
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="w-full mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full bg-gradient-to-r from-green-900 to-gray-900 text-white rounded-3xl p-6 sm:p-10 lg:p-16 shadow-xl">
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Revolutionizing Futsal in Nepal
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg lg:text-2xl max-w-3xl mx-auto text-emerald-100 text-center"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Connecting players with the best futsal venues across Nepal through seamless digital booking
            </motion.p>
          </div>
        </motion.div> 

        {/* Mission Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Card className="w-full mb-16 shadow-lg">
            <CardContent className="p-6 sm:p-10 bg-gradient-to-br from-white to-emerald-50">
              <h2 className="text-xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-emerald-800">Our Mission</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                To make futsal accessible to everyone in Nepal by providing a hassle-free booking platform
                that connects players with quality venues while helping venue owners maximize their potential.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="transform transition-all duration-300">
                <CardContent className="p-6 sm:p-8 text-center bg-gradient-to-br from-white to-emerald-50">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-emerald-800">{stat.value}</div>
                  <div className="text-emerald-600 text-base sm:text-lg">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          className="mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center text-emerald-800">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* For Players */}
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="shadow-lg h-full">
                <CardContent className="p-6 sm:p-8 bg-gradient-to-br from-white to-emerald-50">
                  <h3 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-emerald-700">For Players</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.players.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* For Venue Owners */}
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="shadow-lg h-full">
                <CardContent className="p-6 sm:p-8 bg-gradient-to-br from-white to-emerald-50">
                  <h3 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-emerald-700">For Venue Owners</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.owners.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="pb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center text-green-800">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="shadow-lg">
                  <CardContent className="p-4 sm:p-6 text-center bg-gradient-to-br from-white to-emerald-50 ">
                    <motion.div 
                      className="mb-4 sm:mb-6"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.7 }}
                    >
                      <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-1">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-emerald-800">{member.name}</h3>
                    <p className="text-base sm:text-lg text-emerald-600 font-medium mb-4">{member.role}</p>
                    <div className="space-y-2 sm:space-y-3">
                      <motion.div 
                        className="flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base text-gray-600">{member.college}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base text-gray-600">{member.address}</span>
                      </motion.div>
                      <motion.a 
                        href={`https://${member.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Connect</span>
                      </motion.a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;