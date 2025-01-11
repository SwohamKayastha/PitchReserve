// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from 'react-router-dom';
// import { Search, Clock, MapPin, Calendar, Trophy, AlertCircle, Settings, X, Upload } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { fetchPlayerProfile } from "@/api/auth";

// import logo from '../assets/logo.png';
// import { Building2, Menu } from 'lucide-react';

// const TitleBar = () => {
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => setMenuOpen(!isMenuOpen);

//   return (
//     <div className="fixed top-0 left-0 w-full flex justify-between items-center p-1 z-50 bg-transparent shadow-md">
//       <div className="flex items-center">
//         <button className="flex items-center bg-transparent hover:bg-gray-100 rounded-lg">
//           <div className="relative h-10 w-auto p-0">
//             <a href='/'>
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className="h-10 w-auto"
//                 style={{
//                   filter: 'brightness(1) contrast(1)',
//                   backgroundColor: 'transparent'
//                 }}
//               />
//             </a>
//           </div>
//         </button>
//       </div>
//       <div className="relative">
//         <button 
//           className="p-2 text-black bg-transparent hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none" 
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         <div 
//           className={`fixed right-0 top-0 w-64 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
//             isMenuOpen ? 'translate-x-0' : 'translate-x-full'
//           } z-50`}
//         >
//           <div className="flex flex-col p-4">
//             <button 
//               onClick={toggleMenu}
//               className="self-end p-2 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
//               aria-label="Close menu"
//             >
//               <X size={24} />
//             </button>
//             <nav className="mt-8">
//               <ul className="space-y-4">
//                 {[
//                   { name: 'Home', path: '/' },
//                   { name: 'About Us', path: '/about' },
//                   { name: 'Book Venue', path: '/book' },
//                   { name: 'Login/ Partnership', path: '/Partnership' },
//                   { name: 'Subscriptions', path: '/subscriptions' },
//                   { name: 'Blogs', path: '/blogs' }
//                 ].map((item) => (
//                   <li key={item.name}>
//                     <Link
//                       to={item.path}
//                       className="block px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
//                     >
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PlayerProfile = () => {
//   const [playerData, setPlayerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getPlayerProfile = async () => {
//       try {
//         const data = await fetchPlayerProfile();
//         setPlayerData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPlayerProfile();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-12">
//       <TitleBar />
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Profile Section */}
//           <div className="lg:col-span-3">
//             <Card>
//               <CardContent className="p-8">
//                 <div className="flex flex-col items-center">
//                   <div className="relative">
//                     <div className="w-36 h-36 rounded-full border-4 border-blue-500 p-1">
//                       <img
//                         src={playerData.avatarUrl || "/api/placeholder/144/144"}
//                         alt="Profile"
//                         className="w-full h-full rounded-full object-cover"
//                       />
//                     </div>
//                     <button 
//                       onClick={() => setShowSettings(true)}
//                       className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
//                     >
//                       <Settings className="w-5 h-5 text-white" />
//                     </button>
//                   </div>
                  
//                   <h2 className="mt-6 text-3xl font-bold text-gray-800">{playerData.name}</h2>
//                   <div className="flex items-center mt-2 text-gray-600">
//                     <span className="text-sm">{playerData.location}</span>
//                   </div>

//                   <div className="flex gap-4 mt-8 w-full">
//                     <button 
//                       onClick={() => setShowEditProfile(true)}
//                       className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg"
//                     >
//                       Edit Profile
//                     </button>
//                     <button 
//                       onClick={() => setShowSettings(true)}
//                       className="flex-1 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
//                     >
//                       Settings
//                     </button>
//                   </div>

//                   <div className="flex justify-between w-full mt-8 p-6 bg-blue-50 rounded-xl shadow-inner">
//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-blue-800">{playerData.stats.totalMatches}</div>
//                       <div className="text-sm font-medium text-blue-600">Total Matches</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-blue-800">{playerData.stats.winRate}%</div>
//                       <div className="text-sm font-medium text-blue-600">Win Rate</div>
//                     </div>
//                   </div>

//                   <div className="mt-6 text-sm text-gray-500">
//                     Member since {new Date(playerData.joinedDate).toLocaleDateString()}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-6 space-y-8">
//             {/* Upcoming Bookings */}
//             <Card>
//               <CardHeader className="p-6">
//                 <CardTitle className="flex items-center gap-2">
//                   <Calendar className="w-5 h-5 text-blue-600" />
//                   Upcoming Bookings
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 pt-0">
//                 <div className="space-y-4">
//                   {playerData.upcomingBookings.map((booking) => (
//                     <div key={booking.id} className="bg-blue-50 p-4 rounded-xl">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <div className="font-medium text-gray-800">{booking.futsalName}</div>
//                           <div className="text-sm text-gray-600">
//                             {new Date(booking.date).toLocaleDateString()} • {booking.time}
//                           </div>
//                         </div>
//                         <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
//                           {booking.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Recently Visited */}
//             <Card>
//               <CardHeader className="p-6">
//                 <CardTitle className="flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   Recently Visited
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 pt-0">
//                 <div className="grid gap-6">
//                   {playerData.recentFutsals.map((futsal) => (
//                     <div key={futsal.id} className="bg-blue-50 rounded-xl overflow-hidden">
//                       <div className="aspect-video relative">
//                         <img
//                           src={futsal.image}
//                           alt={futsal.name}
//                           className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                         <div className="absolute bottom-4 left-4 text-white">
//                           <h3 className="font-bold text-lg">{futsal.name}</h3>
//                           <div className="flex items-center gap-2 text-sm">
//                             <MapPin className="w-4 h-4" />
//                             {futsal.location}
//                           </div>
//                         </div>
//                         <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-lg text-sm font-medium">
//                           ⭐ {futsal.rating}
//                         </div>
//                       </div>
//                       <div className="p-4">
//                         <div className="flex justify-between items-center">
//                           <div className="text-sm text-gray-600">
//                             Last visited: {new Date(futsal.lastVisited).toLocaleDateString()}
//                           </div>
//                           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
//                             Book Again
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Quick Actions & History */}
//           <div className="lg:col-span-3 space-y-6">
//             <Card>
//               <CardHeader className="p-6">
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 pt-0">
//                 <div className="space-y-3">
//                   <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2">
//                     <Search className="w-4 h-4" />
//                     Find Futsal
//                   </button>
//                   <button className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2">
//                     <Calendar className="w-4 h-4" />
//                     Book Now
//                   </button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="p-6">
//                 <CardTitle>Playing History</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 pt-0">
//                 <div className="space-y-4">
//                   <div className="bg-blue-50 p-4 rounded-xl">
//                     <div className="text-sm font-medium text-gray-600">Most Played Venue</div>
//                     <div className="text-lg font-bold text-gray-800">RMS Turf Park</div>
//                     <div className="text-sm text-blue-600">39 matches</div>
//                   </div>
//                   <div className="bg-blue-50 p-4 rounded-xl">
//                     <div className="text-sm font-medium text-gray-600">Favorite Time Slot</div>
//                     <div className="text-lg font-bold text-gray-800">17:00 - 18:00</div>
//                     <div className="text-sm text-blue-600">52 bookings</div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlayerProfile;



import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Search, Clock, MapPin, Calendar, Trophy, AlertCircle, Settings, X, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
            <a href='/'>
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto"
                style={{
                  filter: 'brightness(1) contrast(1)',
                  backgroundColor: 'transparent'
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
                  { name: 'Blogs', path: '/blogs' }
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
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};


const PlayerDashboard = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Aayush Dahal",
    email: "ayush11dahal@gmail.com",
    location: "Banepa, Kavre",
    avatarUrl: "/api/placeholder/144/144",
  });

  
  const defaultData = {
    user: {
      name: profileData.name,
      avatarUrl: profileData.avatarUrl,
      joinedDate: "2024-06-15",
      stats: {
        totalMatches: 99,
        totalCancellations: 0,
        winRate: 80,
      }
    },
    recentFutsals: [
      {
        id: 1,
        name: "RMS Turf Park",
        location: "Banepa",
        lastVisited: "2025-01-10",
        rating: 4.5,
        image: "/api/placeholder/400/200"
      },
      {
        id: 2,
        name: "Banepa Futsal",
        location: "Pulbazar, Banepa",
        lastVisited: "2025-01-08",
        rating: 4.8,
        image: "/api/placeholder/400/200"
      }
    ],
    upcomingBookings: [
      {
        id: 1,
        futsalName: "SR Futsal",
        date: "2025-01-13",
        time: "16:00 - 18:00",
        status: "confirmed"
      }
    ]
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setShowEditProfile(false);
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    // Handle settings update logic here
    setShowSettings(false);
  };

  const ProfileEditForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Edit Profile</h3>
          <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={profileData.avatarUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg hover:bg-blue-600 transition">
                <Upload className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <Input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={() => setShowEditProfile(false)}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  const SettingsForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Settings</h3>
          <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSettingsSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <Input type="password" className="w-full" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <Input type="password" className="w-full" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <Input type="password" className="w-full" />
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
            >
              Update Password
            </Button>
            <Button
              type="button"
              onClick={() => setShowSettings(false)}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-12">
      <TitleBar />
      {showEditProfile && <ProfileEditForm />}
      {showSettings && <SettingsForm />}
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for futsal venues..."
              className="w-full px-6 py-4 rounded-2xl shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-14"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-36 h-36 rounded-full border-4 border-blue-500 p-1">
                      <img
                        src={defaultData.user.avatarUrl}
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
                  
                  <h2 className="mt-6 text-3xl font-bold text-gray-800">{defaultData.user.name}</h2>
                  
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
                {/* Stats */}
                <div className="flex flex-col w-full mt-8 space-y-4">
                    {/* Total Matches */}
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-sm font-medium text-blue-600">Total Matches</div>
                          <div className="text-2xl font-bold text-gray-800">
                            {defaultData.user.stats.totalMatches}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Other stats... */}
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <div>
                          <div className="text-sm font-medium text-yellow-600">Cancellations</div>
                          <div className="text-2xl font-bold text-gray-800">
                            {defaultData.user.stats.totalCancellations}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-sm font-medium text-green-600">Win Rate</div>
                          <div className="text-2xl font-bold text-gray-800">
                            {defaultData.user.stats.winRate}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-gray-500">
                    Member since {new Date(defaultData.user.joinedDate).toLocaleDateString()}
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
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Upcoming Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {defaultData.upcomingBookings.map((booking) => (
                    <div key={booking.id} className="bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{booking.futsalName}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(booking.date).toLocaleDateString()} • {booking.time}
                          </div>
                        </div>
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
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
                  {defaultData.recentFutsals.map((futsal) => (
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

            <Card>
              <CardHeader className="p-6">
                <CardTitle>Playing History</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-sm font-medium text-gray-600">Most Played Venue</div>
                    <div className="text-lg font-bold text-gray-800">RMS Turf Park</div>
                    <div className="text-sm text-blue-600">39 matches</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-sm font-medium text-gray-600">Favorite Time Slot</div>
                    <div className="text-lg font-bold text-gray-800">17:00 - 18:00</div>
                    <div className="text-sm text-blue-600">52 bookings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;