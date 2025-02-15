import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import { Link } from 'react-router-dom';
import { Search, Clock, MapPin, Calendar, Trophy, AlertCircle, Settings, X, Upload } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchPlayerProfile } from '@/api/auth';
import { fetchUserBookings } from '@/api/user-booking';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';
import { Building2, Menu } from 'lucide-react';


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

const PlayerProfile = () => {
  const [playerData, setPlayerData] = useState({
    username: 'Loading...',
    email: 'Loading...',
    first_name: 'Loading...',
    last_name: 'Loading...',
    date_joined: 'Loading...',
    avatar_url: '/api/placeholder/144/144',
    location: 'Loading...',
    stats: {
      totalMatches: 0,
      cancellation: 0,
    },
    upcomingBookings: [],
    recentFutsals: [],
    playingHistory: [],
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPlayerProfile();
        const bookings = await fetchUserBookings();

        const now = new Date();
        const upcomingBookings = [];
        const playingHistory = [];

        bookings.forEach((booking) => {
          const bookingDate = new Date(booking.scheduled_date);
          const [startHour, startMinute] = booking.scheduled_time.split('-')[0].split(':');
          bookingDate.setHours(startHour, startMinute);

          if (bookingDate > now) {
            upcomingBookings.push(booking);
          } else {
            playingHistory.push(booking);
          }
        });

        setPlayerData((prevData) => ({
          ...prevData,
          username: data.username,
          email: data.email,
          upcomingBookings,
          playingHistory,
        }));

        const userBookings = await fetchUserBookings();
        setBookings(userBookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 const handleCancelBooking = async (bookingId) => {
  try {
    await cancelBookingAPI(bookingId);
    setPlayerData((prevData) => ({
      ...prevData,
      stats: {
        ...prevData.stats,
        cancellation: prevData.stats.cancellation + 1, //cancellation count of the profile section
      },
      upcomingBookings: prevData.upcomingBookings.filter(booking => booking.booking_id !== bookingId),
    }));
  } catch (err) {
    console.error(err);
  }
};

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-12 py-24" 
      initial={{ opacity: 0 }} // Initial state
      animate={{ opacity: 1 }} // Animate to this state
      transition={{ duration: 0.5 }} // Animation duration
    >
      <TitleBar />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-36 h-36 rounded-full border-4 border-blue-500 p-1">
                      <img
                        src={playerData.avatar_url}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    {/* <button
                      onClick={() => setShowSettings(true)}
                      className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
                    >
                      <Settings className="w-5 h-5 text-white" />
                    </button> */}
                  </div>

                  <h2 className="mt-6 text-3xl font-bold text-gray-800">{playerData.username}</h2>
                  <div className="flex items-center mt-2 text-gray-600">
                    <span className="text-sm">{playerData.location}</span>
                  </div>

                  <div className="flex justify-between w-full mt-8 p-6 bg-blue-50 rounded-xl shadow-inner">
                    <div className="text-center border-l border-r border-blue-200">
                      <div className="text-3xl font-bold text-blue-800">{playerData.stats.totalMatches}</div>
                      <div className="text-sm font-medium text-blue-600">Total Matches</div>
                    </div>
                    <div className="text-center border-l border-r border-blue-200">
                      <div className="text-3xl font-bold text-blue-800">{playerData.stats.cancellation}</div>
                      <div className="text-sm font-medium text-blue-600">Cancellations</div>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-gray-500">
                    Member since {new Date(playerData.date_joined).toLocaleDateString()}
                  </div>
                  </div>
                  </CardContent>
                  </Card>
                  </div>

                  {/* Main Content */}
          <div className="lg:col-span-6 space-y-8">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader className="p-6">
                <CardTitle>Upcoming Bookings</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {playerData.upcomingBookings.length === 0 ? (
                    <p>No upcoming bookings.</p>
                  ) : (
                    playerData.upcomingBookings.map((booking) => (
                      <div key={booking.booking_id} className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-800">
                            {booking.futsal_name || 'Unknown Futsal'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {booking.scheduled_time}
                          </div>
                        </div>
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {booking.payment_status}
                        </span>
                        <button
                          onClick={() => handleCancelBooking(booking.booking_id)} // Replace with your cancellation logic
                          className="ml-4 text-red-600 hover:text-red-800"
                          aria-label="Cancel Booking"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recently Visited */}
            <Card>
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Recently Visited
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid gap-6">
                  {playerData.recentFutsals.map((futsal) => (
                    <div key={futsal.id} className="bg-blue-50 rounded-xl overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={futsal.image}
                          alt={futsal.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-bold text-lg">{futsal.name}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4" />
                            {futsal.location}
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-lg text-sm font-medium">
                          ⭐ {futsal.rating}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Last visited: {new Date(futsal.lastVisited).toLocaleDateString()}
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                            Book Again
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & History */}
          <div className="lg:col-span-3 space-y-6">
                    <Card>
            <CardHeader className="p-6 h-16">
              <CardTitle>Quick Action</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Link to="/toBook" className="w-full">
                <div className="flex items-center justify-center w-full py-3 bg-gradient-to-b from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition">
                  <Search className="w-4 h-4 mr-2" />
                  <span>Find Futsal & Book Now</span>
                </div>
              </Link>
            </CardContent>
          </Card>

            {/* Playing History */}
            <Card className="mt-8">
              <CardHeader className="p-6">
                <CardTitle>Playing History</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {playerData.playingHistory.length === 0 ? (
                    <p>No playing history.</p>
                  ) : (
                    playerData.playingHistory.map((booking) => (
                      <div key={booking.booking_id} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">
                              {booking.futsal_name || 'Unknown Futsal'}
                            </div>
                            <div className="text-sm text-gray-600">
                              {booking.scheduled_time}
                            </div>
                          </div>
                          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                            {booking.payment_status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerProfile;