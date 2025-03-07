import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ArrowLeft, Clock, MapPin, Users, Ruler } from 'lucide-react';
import { useNavigate, useParams , Link} from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';
import { Menu, X } from 'lucide-react';
import { Facebook, Instagram, Mail } from 'lucide-react';
import Loading from './loading';
import { getFutsalFieldById } from "@/api/facilities";
import { initiatePayment } from '@/api/payment';
import ReviewSection from "../components/ReviewSection"; // Adjust the path as needed
import { MessageSquarePlus, Star } from 'lucide-react';
import '../components/Calendar.css';

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
      <div className="w-full flex justify-between items-center px-8 py-4">
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

const Footer = () => {
  return (
    <footer className="bg-[#0a0d14] text-white py-6 w-full mt-auto">
      <div className="w-full px-8">
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
  const [bookingInfo, setBookingInfo] = useState(null);
  const [futsalData, setFutsalData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const { id } = useParams(); // Get futsal ID from URL
   const [availableSlots, setAvailableSlots] = useState([]); // new state for fetched schedule slots
  const [selectedSlot, setSelectedSlot] = useState(null);  // new state for the selected schedule id
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchFutsalData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(`${API_URL}/futsal-facilities/facilities/${id}/`);
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

// When a date is selected, fetch schedule slots for that date and facility.
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = formatLocalDate(selectedDate);
    console.log(formattedDate)
    fetch(`${API_URL}/booking/facility-schedule/${id}/${formattedDate}/`)
      .then((response) => response.json())
      .then((data) => {
        setAvailableSlots(data);
        setShowSlots(true);
      })
      .catch((error) =>
        console.error("Error fetching schedule for selected date:", error)
      );
  };

  const formatLocalDate = (date) => {
    // Adjust the date using the timezone offset.
    const offset = date.getTimezoneOffset() * 60000; // offset in ms
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().split("T")[0];
  };

  const formatTime = (timeStr) => {
    // Create a date using a dummy date so that timeStr (e.g. "08:30:00") is parsed.
    const dummyDate = new Date(`1970-01-01T${timeStr}`);
    // Format the time to "HH:mm" (localized format with 2-digit hour and minute)
    return dummyDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // updated code:(later)
  // const handleDateSelect = (selectedDate) => {
  //   setDate(selectedDate);
  // };
  
  // useEffect(() => {
  //   if (!date) return;
  //   const formattedDate = date.toISOString().split("T")[0];
  //   fetch(`http://localhost:8000/booking/facility-schedule/${id}/${formattedDate}/`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAvailableSlots(data);
  //       setShowSlots(true);
  //     })
  //     .catch((error) =>
  //       console.error("Error fetching schedule for selected date:", error)
  //     );
  // }, [date, id]);

  // When a slot is clicked, set it as the selected slot (if not already booked)
  const handleSlotSelect = (slot) => {
    if (slot.is_booked) return;
    setSelectedSlot(slot.schedule_id);
  };

  // On confirmation, send a POST request to create a booking for the selected schedule slot.
  const handleSubmit = async () => {
    if (!selectedSlot) return alert("Please select a valid slot.");
    try {
      const response = await fetch(`${API_URL}/booking/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
         },
        body: JSON.stringify({
          schedule_id: selectedSlot,
        }),
      });

      if (response.status === 401) {
        alert("Session expired. Please sign in.");
        navigate("/login");
        return;
      }

      if (!response.ok) throw new Error("Booking failed");
      const bookingData = await response.json();
      console.log(bookingData);
      setBookingInfo(bookingData);
      console.log(bookingData.scheduled_date)
    } catch (error) {
      console.error("Error booking slot:", error);
    }
    setShowSlots(false);
    setSelectedSlot(null);
  };

  // const handlePayment = async () => {
  //   try {
  //     const response = await initiatePayment(bookingInfo.booking_id);
  //     window.location.href = response.payment_url; // Redirect to eSewa payment page
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //     alert("Error initiating payment: " + error.message);
  //   }
  // };

  // const handlePayment = async () => {
  //   try {
  //     // Instead of an AJAX call, use a form submission or window.location.href
  //     // Assume you have the bookingInfo from your booking process:
  //     const paymentURL = `http://localhost:8000/payment/initiate/${bookingInfo.booking_id}/`;
  //     window.location.href = paymentURL; // navigate to the payment gateway
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //     alert("Error initiating payment: " + error.message);
  //   }
  // };

  // const handlePayment = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/payment/initiate/${bookingInfo.booking_id}/`);
  //     const html = await response.text();
      
  //     // Create a temporary div to hold the response HTML
  //     const div = document.createElement('div');
  //     div.innerHTML = html;
      
  //     // Append to document body and submit the form
  //     document.body.appendChild(div);
  //     document.forms['esewaForm'].submit();
      
  //     // Clean up
  //     document.body.removeChild(div);
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //     alert("Error initiating payment: " + error.message);
  //   }
  // };

  const handlePayment = async () => {
    try {
      const response = await fetch(`${API_URL}/payment/initiate/${bookingInfo.booking_id}/`);
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }
  
      const html = await response.text();
      
      // Create a temporary container and insert the HTML
      const container = document.createElement('div');
      container.innerHTML = html;
      document.body.appendChild(container);
  
      // Get the form
      const form = container.querySelector('form[name="esewaForm"]');
      if (!form) {
        throw new Error('Payment form not found');
      }
  
      // Submit the form
      form.submit();

      console.log(form)
  
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(container);
      }, 1000);
  
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Error initiating payment: " + error.message);
    }
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
      className="min-h-screen bg-white flex flex-col bg-gradient-to-b from-green-50 to-green-100"
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
                src={futsalData.images} 
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
                  {futsalData.availability_start_time} - {futsalData.availability_end_time}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Available Pitches</span>
                </div>
                <div className="text-gray-800">{futsalData.number_of_pitches} Pitches</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Owned by</span>
                </div>
                <div className="text-gray-800">{futsalData.owner.first_name}{futsalData.owner.last_name}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Available Facilities</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      futsalData.has_changing_room ? "bg-green-500" : "bg-red-500"
                    } shadow-lg`}
                  />
                  <span className="text-sm text-gray-700">Changing Room</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      futsalData.water_availability ? "bg-green-500" : "bg-red-500"
                    } shadow-lg`}
                  />
                  <span className="text-sm text-gray-700">Water Availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      futsalData.lights ? "bg-green-500" : "bg-red-500"
                    } shadow-lg`}
                  />
                  <span className="text-sm text-gray-700">Lights</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      futsalData.parking_facilities ? "bg-green-500" : "bg-red-500"
                    } shadow-lg`}
                  />
                  <span className="text-sm text-gray-700">Parking Facilities</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      futsalData.cafeteria ? "bg-green-500" : "bg-red-500"
                    } shadow-lg`}
                  />
                  <span className="text-sm text-gray-700">Cafeteria</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      futsalData.equipment ? "bg-green-500" : "bg-red-500"
                    } shadow-lg`}
                  />
                  <span className="text-sm text-gray-700">Equipment</span>
                </div>
                {futsalData.facilities?.map((facility, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${facility.available ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-gray-700">{facility.name}</span>
                  </div>
                ))}
              </div>
            </div>

          {/* <motion.div 
            className="flex items-center justify-center lg:col-span-1" 
            {/* Add the ReviewSection component here */}
            <ReviewSection venueId={id} />
          </motion.div>
          {/* Calender Model */}
              <motion.div 
                  className="flex items-center justify-center lg:col-span-1" 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-xl shadow-2xl p-6 w-full sticky top-24">
                  <motion.h2 
                    className="text-2xl font-bold text-gray-800 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Select Booking Date
                  </motion.h2>
                  
                  <motion.div 
                    className="calendar-container mb-6"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Calendar
                      onChange={handleDateSelect}
                      value={date}
                      minDate={new Date()}
                      className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                      tileClassName={({ date: tileDate, view }) => {
                        if (view === 'month') {
                          const today = new Date();
                          const isToday = tileDate.toDateString() === today.toDateString();
                          return `
                            ${isToday ? 'bg-blue-100 font-semibold' : ''}
                            hover:bg-blue-50 transition-colors duration-200
                            ${tileDate < today ? 'text-gray-400 cursor-not-allowed' : ''}
                          `;
                        }
                      }}
                      tileDisabled={({ date: tileDate }) => {
                        return tileDate < new Date().setHours(0, 0, 0, 0);
                      }}
                    />
                  </motion.div>

                  <motion.div 
                    className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="text-sm font-medium text-gray-700 mb-2">Hourly Rate</div>
                    <div className="text-3xl font-bold text-blue-900">
                      Rs. {futsalData.price_per_hour}
                      <span className="text-lg text-blue-600">/hour</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

            {/* Review Model Div */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 mt-6"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
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
              
              
            </div>
            </motion.div>
            {/* Select Slot div */}
                    {/* <motion.div 
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
          </motion.div> */}
          {/* <motion.div 
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
                  Rs. {futsalData.price_per_hour}/hour
                </div>
              </div>
            </div>
          </motion.div> */}
      
        </div>

        
        {/* {showSlots && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-lg p-6 w-80">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{date.toDateString()}</h3>

              <div className="grid grid-cols-3 gap-2 mb-4">
              {availableSlots.length > 0 ? (
          availableSlots.map((slot) => {
            // Update property names according to your API response
            // const slotLabel = `${slot.start_time}-${slot.end_time}`;
            const slotLabel = `${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`;
            const isSelected = selectedSlot === slot.schedule_id;
            return (
              <div 
                key={slot.schedule_id}
                className={`border border-gray-300 rounded-lg text-center py-3 cursor-pointer transition ${
                  isSelected 
                    ? 'bg-blue-500 text-white' 
                    : slot.is_booked 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-100 hover:bg-gray-300'
                }`}
                onClick={() => handleSlotSelect(slot)}
              >
                {slotLabel}
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center text-gray-600">
            No slots available for this date.
          </div>
        )}
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
        )} */}
        {showSlots && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4"
          >
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Select Time Slot</h3>
                  <p className="text-sm text-gray-600 mt-1">{date.toDateString()}</p>
                </div>
                <button 
                  onClick={() => setShowSlots(false)} 
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
              
              {/* Legend */}
              <div className="flex gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-100 border rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-200 rounded"></div>
                  <span>Booked</span>
                </div>
              </div>
              
              {/* Time Slots Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 max-h-[300px] overflow-y-auto py-2">
              {availableSlots.length > 0 ? (
  availableSlots.map((slot) => {
    const slotLabel = `${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`;
    const isSelected = selectedSlot === slot.schedule_id;
    return (
      <div 
        key={slot.schedule_id}
        onClick={() => !slot.is_booked && handleSlotSelect(slot)}
        className={`
          flex items-center justify-center
          p-4 rounded-lg cursor-pointer transition-all duration-200
          ${isSelected 
            ? 'bg-blue-500 text-white shadow-lg scale-105' 
            : slot.is_booked 
              ? 'bg-red-200 text-red-700 cursor-not-allowed' // Changed this line
              : 'bg-gray-100 hover:bg-blue-100 hover:shadow'
          }
          ${!slot.is_booked && !isSelected ? 'hover:scale-105' : ''}
        `}
      >
        <div className="text-center">
          <span className="font-medium">{slotLabel}</span>
          {slot.is_booked && (
            <span className="block text-xs mt-1 text-red-600">Booked</span> // Changed text color
          )}
        </div>
      </div>
    );
  })
) : (
  <div className="col-span-2 text-center py-8 text-gray-500">
    <div className="text-4xl mb-2">📅</div>
    <p>No slots available for this date.</p>
    <p className="text-sm text-gray-400 mt-1">Please select another date.</p>
  </div>
)}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowSlots(false)} 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit} 
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  disabled={!selectedSlot}
                >
                  Book Selected Slot
                </button>
              </div>
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
                <p className="text-lg font-semibold text-gray-800">{bookingInfo.scheduled_date}</p>
              </div>
              <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">Time Slots:</p>
                <p className="text-lg font-semibold text-gray-800">{bookingInfo.scheduled_time}</p>
              </div>
              <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">Futsal Name:</p>
                <p className="text-lg font-semibold text-gray-800">{bookingInfo.name}</p>
              </div>
              <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-sm text-gray-600">Total Price:</p>
                <p className="text-lg font-semibold text-gray-800">Rs. {bookingInfo.totalPrice}</p>
              </div>

              {/* <button 
                onClick={() => alert("Payment processing...")} 
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg transition hover:bg-blue-700"
              > */}
              <button 
                onClick={handlePayment} 
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