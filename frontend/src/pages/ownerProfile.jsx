<<<<<<< HEAD
import React, { useState } from "react";
import { Settings, Calendar, SortDesc, SortAsc } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const Profile = ({ data }) => {
  const [isSortAscending, setIsSortAscending] = useState(true);
  
  const defaultData = {
    name: "Loading...",
    location: "Loading...",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    futsalName: "Loading...",
    futsalAddress: "Loading...",
    pitchCount: 0,
    pitchDimension: "Loading...",
    openingTime: "--:--",
    closingTime: "--:--",
    pricePerHour: 0,
    hasChangingRoom: false,
    hasWaterAvailability: false,
    futsalImage: "/api/placeholder/800/400",
    userStats: {
      futsalCount: 0,
      locationCount: 0,
    },
    accountCreatedAt: "Loading...",
    bookings: [
      {
        customerName: "ma aafai",
        date: "2025-01-15",
        timeSlot: "19:00 - 20:00",
        status: "confirmed"
      },
      {
        customerName: "koju bhau",
        date: "2025-01-15",
        timeSlot: "18:00 - 19:00",
        status: "confirmed"
      },
      {
        customerName: "umanga rayamajhi bhau",
        date: "2025-01-16",
        timeSlot: "19:00 - 20:00",
        status: "pending"
      }
    ]
  };
=======
import React, { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchOwnerProfile } from "@/api/auth";

const Profile = () => {
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
>>>>>>> 56506946de520b7b3be6b34987356d905b45d100

  useEffect(() => {
    const getOwnerProfile = async () => {
      try {
        const data = await fetchOwnerProfile();
        setOwnerData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getOwnerProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const sortedBookings = [...(displayData.bookings || [])].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return isSortAscending ? dateA - dateB : dateB - dateA;
  });

  const toggleSort = () => {
    setIsSortAscending(!isSortAscending);
  };

  // [Previous code remains the same until the Bookings Section]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-3">
            {/* [Profile card content remains the same] */}
            <Card className="sticky top-8 backdrop-blur-sm bg-white/90 shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-square max-w-[144px]">
                    <div className="absolute inset-0 rounded-full border-4 border-green-500 p-1">
                      <img
                        src="/api/placeholder/144/144"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 shadow-lg hover:bg-green-600 transition">
                      <Settings className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">{displayData.name}</h2>
                  <div className="text-sm text-gray-600 text-center">{displayData.location}</div>

                  <div className="grid grid-cols-2 gap-3 w-full mt-6">
                    <button className="py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition shadow-lg">
                      Edit Profile
                    </button>
                    <button className="py-2 border-2 border-green-600 text-green-600 text-sm rounded-lg hover:bg-green-50 transition">
                      Settings
                    </button>
                  </div>

                  <div className="grid grid-cols-2 w-full mt-6 p-4 bg-green-50 rounded-xl shadow-inner gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-800">{displayData.userStats.futsalCount}</div>
                      <div className="text-xs font-medium text-green-600">Futsals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-800">{displayData.userStats.locationCount}</div>
                      <div className="text-xs font-medium text-green-600">Locations</div>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Member since {new Date(displayData.accountCreatedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

<<<<<<< HEAD
          {/* Futsal Information Section */}
          <div className="lg:col-span-6">
            <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Futsal Information</h3>
                  <p className="text-lg text-green-600 font-medium">{displayData.futsalName}</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Edit Details
                </button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 shadow-lg">
                  <img
                    src={displayData.futsalImage}
                    alt="Futsal Field"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
=======
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-4">
              <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-36 h-36 rounded-full border-4 border-green-500 p-1">
                        <img
                          src={ownerData.image_url || "/api/placeholder/144/144"}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition">
                        <Settings className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    
                    <h2 className="mt-6 text-3xl font-bold text-gray-800">{ownerData.user.first_name} {ownerData.user.last_name}</h2>
                    <div className="flex items-center mt-2 text-gray-600">
                      <span className="text-sm">{ownerData.location}</span>
                    </div>
>>>>>>> 56506946de520b7b3be6b34987356d905b45d100

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                    <div className="text-green-600 text-sm font-medium">Opening Time</div>
                    <div className="text-xl font-bold text-gray-800">{displayData.openingTime}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                    <div className="text-green-600 text-sm font-medium">Closing Time</div>
                    <div className="text-xl font-bold text-gray-800">{displayData.closingTime}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                    <div className="text-green-600 text-sm font-medium">Price per Hour</div>
                    <div className="text-xl font-bold text-gray-800">Rs. {displayData.pricePerHour}</div>
                  </div>
                </div>

<<<<<<< HEAD
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                    <div className="text-green-600 text-sm font-medium">Pitch Count</div>
                    <div className="text-xl font-bold text-gray-800">{displayData.pitchCount}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                    <div className="text-green-600 text-sm font-medium">Dimension</div>
                    <div className="text-xl font-bold text-gray-800">{displayData.pitchDimension}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                    <div className="text-green-600 text-sm font-medium">Location</div>
                    <div className="text-sm font-medium text-gray-800">{displayData.futsalAddress}</div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Facilities</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${displayData.hasChangingRoom ? 'bg-green-500' : 'bg-red-500'} shadow-lg`} />
                      <span className="text-sm text-gray-700">Changing Room</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${displayData.hasWaterAvailability ? 'bg-green-500' : 'bg-red-500'} shadow-lg`} />
                      <span className="text-sm text-gray-700">Water Availability</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-3">
            <Card className="sticky top-8 backdrop-blur-sm bg-white/90 shadow-xl">
              <CardHeader className="flex justify-between items-center p-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
                </div>
                <button 
                  onClick={toggleSort} 
                  className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200 flex items-center gap-1"
                  title={`Sort by date ${isSortAscending ? 'descending' : 'ascending'}`}
                >
                  {isSortAscending ? 
                    <SortAsc className="w-5 h-5 text-green-600" /> : 
                    <SortDesc className="w-5 h-5 text-green-600" />
                  }
                </button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {sortedBookings.map((booking, index) => (
                    <div key={index} className="bg-green-50 p-4 rounded-xl shadow-inner">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-800">{booking.customerName}</div>
                          <div className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</div>
                          <div className="text-sm font-medium text-green-600">{booking.timeSlot}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
=======
                    <div className="flex justify-between w-full mt-8 p-6 bg-green-50 rounded-xl shadow-inner">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-800">{ownerData.number_of_venues}</div>
                        <div className="text-sm font-medium text-green-600">Venues</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-800">{ownerData.user.username}</div>
                        <div className="text-sm font-medium text-green-600">Username</div>
                      </div>
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                      Member since {new Date(ownerData.user.date_joined).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Futsal Information Section */}
            <div className="lg:col-span-8">
              <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
                <CardHeader className="flex justify-between items-center p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Futsal Information</h3>
                    <p className="text-lg text-green-600 font-medium">{ownerData.field_name}</p>
                  </div>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Edit Details
                  </button>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
                    <img
                      src={ownerData.image_url || "/api/placeholder/800/400"}
                      alt="Futsal Field"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                      <div className="text-green-600 font-medium">Phone Number</div>
                      <div className="text-2xl font-bold text-gray-800">{ownerData.phone_number}</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                      <div className="text-green-600 font-medium">Location</div>
                      <div className="text-2xl font-bold text-gray-800">{ownerData.location}</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                      <div className="text-green-600 font-medium">Additional Info</div>
                      <div className="text-2xl font-bold text-gray-800">{ownerData.additional_info}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
>>>>>>> 56506946de520b7b3be6b34987356d905b45d100
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import React from "react";
// import { Settings } from "lucide-react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";

// const Profile = ({ data }) => {
//   const defaultData = {
//     name: "Loading...",
//     location: "Loading...",
//     coordinates: {
//       latitude: 0,
//       longitude: 0,
//     },
//     futsalName: "Loading...",
//     futsalAddress: "Loading...",
//     pitchCount: 0,
//     pitchDimension: "Loading...",
//     openingTime: "--:--",
//     closingTime: "--:--",
//     pricePerHour: 0,
//     hasChangingRoom: false,
//     hasWaterAvailability: false,
//     futsalImage: "/api/placeholder/800/400",
//     userStats: {
//       futsalCount: 0,
//       locationCount: 0,
//     },
//     accountCreatedAt: "Loading..."
//   };

//   const displayData = data || defaultData;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative">
//           {/* Decorative football pattern */}
//           <div className="absolute inset-0 opacity-5">
//             <div className="grid grid-cols-6 gap-8">
//               {[...Array(24)].map((_, i) => (
//                 <div key={i} className="w-12 h-12 rounded-full border-2 border-green-600" />
//               ))}
//             </div>
//           </div>

//           <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {/* Profile Section */}
//             <div className="lg:col-span-4">
//               <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
//                 <CardContent className="p-8">
//                   <div className="flex flex-col items-center">
//                     <div className="relative">
//                       <div className="w-36 h-36 rounded-full border-4 border-green-500 p-1">
//                         <img
//                           src="/api/placeholder/144/144"
//                           alt="Profile"
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       </div>
//                       <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition">
//                         <Settings className="w-5 h-5 text-white" />
//                       </button>
//                     </div>
                    
//                     <h2 className="mt-6 text-3xl font-bold text-gray-800">{displayData.name}</h2>
//                     <div className="flex items-center mt-2 text-gray-600">
//                       <span className="text-sm">{displayData.location}</span>
//                     </div>

//                     <div className="flex gap-4 mt-8 w-full">
//                       <button className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg">
//                         Edit Profile
//                       </button>
//                       <button className="flex-1 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition">
//                         Settings
//                       </button>
//                     </div>

//                     <div className="flex justify-between w-full mt-8 p-6 bg-green-50 rounded-xl shadow-inner">
//                       <div className="text-center">
//                         <div className="text-3xl font-bold text-green-800">{displayData.userStats.futsalCount}</div>
//                         <div className="text-sm font-medium text-green-600">Futsals</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-3xl font-bold text-green-800">{displayData.userStats.locationCount}</div>
//                         <div className="text-sm font-medium text-green-600">Locations</div>
//                       </div>
//                     </div>

//                     <div className="mt-6 text-sm text-gray-500">
//                       Member since {new Date(displayData.accountCreatedAt).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Futsal Information Section */}
//             <div className="lg:col-span-8">
//               <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
//                 <CardHeader className="flex justify-between items-center p-8">
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-800">Futsal Information</h3>
//                     <p className="text-lg text-green-600 font-medium">{displayData.futsalName}</p>
//                   </div>
//                   <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg flex items-center gap-2">
//                     <Settings className="w-5 h-5" />
//                     Edit Details
//                   </button>
//                 </CardHeader>
//                 <CardContent className="p-8">
//                   <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
//                     <img
//                       src={displayData.futsalImage}
//                       alt="Futsal Field"
//                       className="w-full h-80 object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                     <div className="bg-green-50 p-6 rounded-xl shadow-inner">
//                       <div className="text-green-600 font-medium">Opening Time</div>
//                       <div className="text-2xl font-bold text-gray-800">{displayData.openingTime}</div>
//                     </div>
//                     <div className="bg-green-50 p-6 rounded-xl shadow-inner">
//                       <div className="text-green-600 font-medium">Closing Time</div>
//                       <div className="text-2xl font-bold text-gray-800">{displayData.closingTime}</div>
//                     </div>
//                     <div className="bg-green-50 p-6 rounded-xl shadow-inner">
//                       <div className="text-green-600 font-medium">Price per Hour</div>
//                       <div className="text-2xl font-bold text-gray-800">Rs. {displayData.pricePerHour}</div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                     <div className="bg-green-50 p-6 rounded-xl shadow-inner">
//                       <div className="text-green-600 font-medium">Pitch Count</div>
//                       <div className="text-2xl font-bold text-gray-800">{displayData.pitchCount}</div>
//                     </div>
//                     <div className="bg-green-50 p-6 rounded-xl shadow-inner">
//                       <div className="text-green-600 font-medium">Dimension</div>
//                       <div className="text-2xl font-bold text-gray-800">{displayData.pitchDimension}</div>
//                     </div>
//                     <div className="bg-green-50 p-6 rounded-xl shadow-inner">
//                       <div className="text-green-600 font-medium">Location</div>
//                       <div className="text-lg font-medium text-gray-800">{displayData.futsalAddress}</div>
//                     </div>
//                   </div>

//                   <div className="bg-green-50 p-6 rounded-xl shadow-inner">
//                     <h4 className="text-xl font-bold text-gray-800 mb-4">Facilities</h4>
//                     <div className="grid grid-cols-2 gap-6">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-5 h-5 rounded-full ${displayData.hasChangingRoom ? 'bg-green-500' : 'bg-red-500'} shadow-lg`} />
//                         <span className="text-lg text-gray-700">Changing Room</span>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className={`w-5 h-5 rounded-full ${displayData.hasWaterAvailability ? 'bg-green-500' : 'bg-red-500'} shadow-lg`} />
//                         <span className="text-lg text-gray-700">Water Availability</span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;