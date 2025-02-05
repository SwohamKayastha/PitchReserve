import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Clock, MapPin, Calendar, Trophy, AlertCircle, Settings, X, Upload } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchPlayerProfile } from '@/api/auth';
import { fetchUserBookings } from '@/api/user-booking';
import logo from '../assets/logo.png';
import { Building2, Menu } from 'lucide-react';

const TitleBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-1 z-50 bg-transparent shadow-md">
      <div className="flex items-center">
        <button className="flex items-center bg-transparent hover:bg-gray-100 rounded-lg">
          <div className="relative h-10 w-auto p-0">
            <a href="/">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto"
                style={{
                  filter: 'brightness(1) contrast(1)',
                  backgroundColor: 'transparent',
                }}
              />
            </a>
          </div>
        </button>
      </div>
      <div className="relative">
        <button
          className="p-2 text-black bg-transparent hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
                  { name: 'About Us', path: '/about' },
                  { name: 'Book Venue', path: '/book' },
                  { name: 'Login/ Partnership', path: '/Partnership' },
                  { name: 'Subscriptions', path: '/subscriptions' },
                  { name: 'Blogs', path: '/blogs' },
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
    </div>
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
      winRate: 0,
    },
    upcomingBookings: [],
    recentFutsals: [],
    playingHistory: [],
  });
  // const [playerData, setPlayerData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPlayerProfile();

        const bookings = await fetchUserBookings();

        // Code to check whether the booking is upcoming or not
        const now = new Date();
        const upcomingBookings = [];
        const playingHistory = [];

        bookings.forEach((booking) => {
          const bookingDate = new Date(booking.scheduled_date);
          const [startHour, startMinute] = booking.scheduled_time.split('-')[0].split(':');
          bookingDate.setHours(startHour, startMinute);

          if (bookingDate > now) {
            upcomingBookings.push(booking);
            console.log('Upcoming:', bookingDate);
          } else {
            playingHistory.push(booking);
            console.log('History:', bookingDate);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-12">
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
                    <button
                      onClick={() => setShowSettings(true)}
                      className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
                    >
                      <Settings className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <h2 className="mt-6 text-3xl font-bold text-gray-800">{playerData.username}</h2>
                  <div className="flex items-center mt-2 text-gray-600">
                    <span className="text-sm">{playerData.location}</span>
                  </div>

                  <div className="flex gap-4 mt-8 w-full">
                    <button
                      onClick={() => setShowEditProfile(true)}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex-1 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
                    >
                      Settings
                    </button>
                  </div>

                  <div className="flex justify-between w-full mt-8 p-6 bg-blue-50 rounded-xl shadow-inner">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-800">{playerData.stats.totalMatches}</div>
                      <div className="text-sm font-medium text-blue-600">Total Matches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-800">{playerData.stats.winRate}%</div>
                      <div className="text-sm font-medium text-blue-600">Win Rate</div>
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
                        <div key={booking.booking_id} className="bg-blue-50 p-4 rounded-xl">
                          <div className="flex items-center justify-between">
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
                          </div>
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
              <CardHeader className="p-6">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-3">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <Search className="w-4 h-4" />
                    Find Futsal
                  </button>
                  <button className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </button>
                </div>
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
    </div>
  );
};

export default PlayerProfile;