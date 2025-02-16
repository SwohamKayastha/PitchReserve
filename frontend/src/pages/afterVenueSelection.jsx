

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
import { getFutsalFieldById } from "@/api/facilities";
import { MessageSquarePlus, Star } from 'lucide-react';

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
    <footer className="bg-[#0a0d14] text-white py-12 w-full mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    
              <nav>
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
                  <a
                    href="https://facebook.com/pitchreserve"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-500 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/pitchreserve"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-500 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:info@pitchreserve.com.np"
                    className="hover:text-green-500 transition-colors"
                  >
                    <Mail size={24} />
                  </a>
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
        const data = await response.json();
        // console.log(data)
        setFutsalData(data);
      } catch (error) {
        console.error("Error fetching futsal data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFutsalData();
  }, [id]);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
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
      className="min-h-screen bg-white flex flex-col"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <TitleBar />
      <div className="max-w-7xl mx-auto flex flex-col items-center mt-20 px-4 sm:px-6 lg:px-8 flex-grow">
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
                src={futsalData.imageUrl} 
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
                {/* {futsalData.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${facility.available ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-gray-700">{facility.name}</span>
                  </div>
                ))} */}
                {futsalData.facilities?.map((facility, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${facility.available ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-gray-700">{facility.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 mt-6"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Reviews</h3>
              <button
                onClick={() => setShowReviewModal(true)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <MessageSquarePlus className="w-5 h-5" />
                <span>Write a Review</span>
              </button>
            </div>

            {showReviewModal && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              >
                <div className="bg-white rounded-lg p-6 w-96">
                  <h4 className="text-xl font-bold mb-4">Write a Review</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 cursor-pointer ${
                              rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                      <textarea
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Share your experience..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => {
                          // Handle review submission
                          setShowReviewModal(false);
                          setRating(0);
                          setReviewText('');
                        }}
                      >
                        Submit
                      </button>
                      <button
                        className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                        onClick={() => setShowReviewModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              /* Sample reviews - replace with actual reviews data */
                      {[
                      { id: 1, author: "John Doe", rating: 5, date: "2024-01-15", text: "Great facilities and excellent service!" },
                      { id: 2, author: "Jane Smith", rating: 4, date: "2024-01-10", text: "Good experience overall, but parking could be better." }
                      ].map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                            index < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          by {review.author} • {new Date(review.date).toLocaleDateString()}
                        </span>
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                      ))}
                    </div>
                    </motion.div>

                    <motion.div 
                    className="fixed right-0 top-10 transform -translate-y-1/2 my-6 mr-6"
                    initial={{ opacity: 0, x: 100 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                    >
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">Select Date</h2>
                      <div className="calendar-container">
                      <Calendar
                        onChange={handleDateSelect}
                        value={date}
                        minDate={new Date()}
                        className="rounded-lg border border-gray-200"
                        tileClassName={({ date }) => {    const today = new Date();
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
        
        
      </div>
      <Footer />  
    </motion.div>
  );
};

export default FutsalDetail;