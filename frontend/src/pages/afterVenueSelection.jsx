import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ArrowLeft, Clock, MapPin, Users, Ruler } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {Facebook, Instagram, Mail} from 'lucide-react';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideIn = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
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

const FutsalDetail = () => {
  const [date, setDate] = useState(new Date());
  const [showSlots, setShowSlots] = useState(false);
  const [startTime, setStartTime] = useState(6); // Default start time
  const [endTime, setEndTime] = useState(7); // Default end time
  const [selectedSlots, setSelectedSlots] = useState([]); // Track selected slots
  const [bookingInfo, setBookingInfo] = useState(null); // Booking information
  const navigate = useNavigate();

  // Mock data - replace with your API data
  const futsalData = {
    name: "Green Field Futsal",
    location: "Kathmandu, Nepal",
    image: "/api/placeholder/800/400",
    openingTime: "6:00 AM",
    closingTime: "9:00 PM",
    pricePerHour: 1000,
    pitchCount: 2,
    dimensions: "30m x 15m",
    facilities: [
      { name: "Changing Room", available: true },
      { name: "Water Supply", available: true },
      { name: "Parking", available: true },
      { name: "First Aid", available: true }
    ]
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setShowSlots(true);
  };

  const handleSlotToggle = (slot) => {
    const updatedSlots = selectedSlots.includes(slot) 
      ? selectedSlots.filter(s => s !== slot) 
      : [...selectedSlots, slot];
    setSelectedSlots(updatedSlots);
  };

  const handleSubmit = () => {
    const totalHours = selectedSlots.length;
    const totalPrice = totalHours * futsalData.pricePerHour;
    setBookingInfo({
      date: date.toDateString(),
      timeSlots: selectedSlots.join(', '),
      futsalName: futsalData.name,
      totalPrice,
    });
    setShowSlots(false);
    setSelectedSlots([]); // Reset selected slots after booking
  };

  // Get current hour
  const currentHour = new Date().getHours();

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <TitleBar />
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {/* Main Info Section */}
          <motion.div 
            className="lg:col-span-2" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-xl p-6">
              <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 mb-6 bg-transparent text-gray-800 hover:text-gray-900 transition"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
                <span></span>
              </button>
              {/* Hero Image */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6">
                <img
                  src={futsalData.image}
                  alt={futsalData.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Futsal Name and Location */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{futsalData.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{futsalData.location}</span>
                </div>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Operating Hours</span>
                  </div>
                  <div className="text-gray-800">
                    {futsalData.openingTime} - {futsalData.closingTime}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Available Pitches</span>
                  </div>
                  <div className="text-gray-800">{futsalData.pitchCount} Pitches</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Pitch Size</span>
                  </div>
                  <div className="text-gray-800">{futsalData.dimensions}</div>
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Available Facilities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {futsalData.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${facility.available ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-gray-700">{facility.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Calendar Section */}
          <motion.div 
            className="flex items-center justify-center lg:col-span-1" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Select Date</h2>
              <div className="calendar-container">
                <Calendar
                  onChange={handleDateSelect}
                  value={date}
                  minDate={new Date()}
                  className="w-full rounded-lg border border-gray-200"
                  tileClassName={({ date }) => {
                    const today = new Date();
                    return date.toDateString() === today.toDateString() ? 'bg-gray-300' : '';
                  }}
                />
              </div>
              <div className="mt-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Hourly Rate</div>
                <div className="text-2xl font-bold text-gray-600">
                  Rs. {futsalData.pricePerHour}/hour
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Slots Popup */}
        {showSlots && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-lg p-6 w-80">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{date.toDateString()}</h3>

              {/* Slot Selection */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {Array.from({ length: 15 }, (_, i) => {
                  const slotStart = 6 + i; // Slots from 6 AM to 9 PM
                  const slotEnd = slotStart + 1;
                  const isSelected = selectedSlots.includes(`${slotStart}-${slotEnd}`);
                  const isPastSlot = slotStart < currentHour; // Check if the slot is in the past

                  return (
                    <div 
                      key={i} 
                      className={`border border-gray-300 rounded-lg text-center py-3 cursor-pointer transition ${
                        isSelected ? 'bg-blue-500 text-white' : 
                        isPastSlot ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 
                        'bg-gray-100 hover:bg-gray-300'
                      }`}
                      onClick={() => !isPastSlot && handleSlotToggle(`${slotStart}-${slotEnd}`)} // Prevent booking if the slot is in the past
                    >
                      {`${slotStart}-${slotEnd}`}
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleSubmit} 
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg transition hover:bg-green-700"
              >
                Book Slot
              </button>
              
              <button 
                onClick={() => setShowSlots(false)} 
                className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg transition hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}

        {/* Booking Information Modal */}
        {bookingInfo && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-lg p-6 w-80">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Information</h3>
              <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">Date:</p>
                <p className="text-lg font-semibold text-gray-800">{bookingInfo.date}</p>
              </div>
              <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">Time Slots:</p>
                <p className="text-lg font-semibold text-gray-800">{bookingInfo.timeSlots}</p>
              </div>
              <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">Futsal Name:</p>
                <p className="text-lg font-semibold text-gray-800">{bookingInfo.futsalName}</p>
              </div>
              <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">Total Price:</p>
                <p className="text-lg font-semibold text-gray-800">Rs. {bookingInfo.totalPrice}</p>
              </div>

              <button 
                onClick={() => alert("Payment processing...")} 
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg transition hover:bg-blue-700"
              >
                Pay
              </button>
              
              <button 
                onClick={() => setBookingInfo(null)} 
                className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg transition hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
        <Footer />
      </div>
    </motion.div>
  );
};

export default FutsalDetail;