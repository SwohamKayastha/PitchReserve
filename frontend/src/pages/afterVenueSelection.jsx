import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ArrowLeft, Clock, MapPin, Users, Ruler } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Facebook, Instagram, Mail } from 'lucide-react';
import Loading from './loading';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
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
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
          <Link to="/login" className="relative">
            <img 
              src={profileIcon}
              alt="profile"
              className="h-12 w-auto transition-transform duration-200 hover:brightness-110"
            />
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
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
    <footer className="bg-[#0a0d14] text-white py-12 flex w-screen justify-bottom">
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
                { name: 'Login/ Partnership', path: '/Partnership' },
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
const FutsalDetail = () => {
  const [date, setDate] = useState(new Date());
  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [futsalData, setFutsalData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const { id } = useParams(); // Get futsal ID from URL

  useEffect(() => {
    const fetchFutsalData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(`http://localhost:8000/futsal-facilities/facilities/${id}/`);
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        setFutsalData(data);
      } catch (error) {
        console.error("Error fetching futsal data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFutsalData();
  }, [id]);

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
    setSelectedSlots([]);
  };

  const currentHour = new Date().getHours();

  if (loading) {
    return <Loading />; // Show loading component while data is being fetched
  }

  if (!futsalData) {
    return <div>No futsal data available.</div>; // Fallback if data is still null
  }


  return (
    <motion.div 
      className="min-h-screen bg-white p-6" // Changed background to white
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <TitleBar />
      <div className="max-w-7xl mx-auto flex flex-col items-center mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <motion.div 
            className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 mb-6 bg-transparent text-gray-800 hover:text-gray-900 transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6">
              <img
                src={futsalData.imageUrl} // Adjust according to your API response
                alt={futsalData.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{futsalData.name}</h1>
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <MapPin className="w-4 h-4" />
                <span>{futsalData.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Operating Hours</span>
                </div>
                <div className="text-gray-800">
                  {futsalData.openingTime} - {futsalData.closingTime}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Available Pitches</span>
                </div>
                <div className="text-gray-800">{futsalData.pitchCount} Pitches</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Pitch Size</span>
                </div>
                <div className="text-gray-800">{futsalData.dimensions}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6 shadow-md">
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
          </motion.div>

          <motion.div 
            className="flex items-center justify-center lg:col-span-1" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
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

        {showSlots && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-lg p-6 w-80">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{date.toDateString()}</h3>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {Array.from({ length: 15 }, (_, i) => {
                  const slotStart = 6 + i; // Slots from 6 AM to 9 PM
                  const slotEnd = slotStart + 1;
                  const isSelected = selectedSlots.includes(`${slotStart}-${slotEnd}`);
                  const isPastSlot = slotStart < currentHour;

                  return (
                    <div 
                      key={i} 
                      className={`border border-gray-300 rounded-lg text-center py-3 cursor-pointer transition ${
                        isSelected ? 'bg-blue-500 text-white' : 
                        isPastSlot ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 
                        'bg-gray-100 hover:bg-gray-300'
                      }`}
                      onClick={() => !isPastSlot && handleSlotToggle(`${slotStart}-${slotEnd}`)}
                    >
                      {`${slotStart}-${slotEnd}`}
                    </div>
                  );
                })}
              </div>

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