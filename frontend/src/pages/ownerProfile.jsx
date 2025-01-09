import React from "react";
import { Settings } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const Profile = ({ data }) => {
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
    accountCreatedAt: "Loading..."
  };

  const displayData = data || defaultData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Decorative football pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-6 gap-8">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-green-600" />
              ))}
            </div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-4">
              <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-36 h-36 rounded-full border-4 border-green-500 p-1">
                        <img
                          src="/api/placeholder/144/144"
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition">
                        <Settings className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    
                    <h2 className="mt-6 text-3xl font-bold text-gray-800">{displayData.name}</h2>
                    <div className="flex items-center mt-2 text-gray-600">
                      <span className="text-sm">{displayData.location}</span>
                    </div>

                    <div className="flex gap-4 mt-8 w-full">
                      <button className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg">
                        Edit Profile
                      </button>
                      <button className="flex-1 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition">
                        Settings
                      </button>
                    </div>

                    <div className="flex justify-between w-full mt-8 p-6 bg-green-50 rounded-xl shadow-inner">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-800">{displayData.userStats.futsalCount}</div>
                        <div className="text-sm font-medium text-green-600">Futsals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-800">{displayData.userStats.locationCount}</div>
                        <div className="text-sm font-medium text-green-600">Locations</div>
                      </div>
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                      Member since {new Date(displayData.accountCreatedAt).toLocaleDateString()}
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
                    <p className="text-lg text-green-600 font-medium">{displayData.futsalName}</p>
                  </div>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Edit Details
                  </button>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
                    <img
                      src={displayData.futsalImage}
                      alt="Futsal Field"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                      <div className="text-green-600 font-medium">Opening Time</div>
                      <div className="text-2xl font-bold text-gray-800">{displayData.openingTime}</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                      <div className="text-green-600 font-medium">Closing Time</div>
                      <div className="text-2xl font-bold text-gray-800">{displayData.closingTime}</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                      <div className="text-green-600 font-medium">Price per Hour</div>
                      <div className="text-2xl font-bold text-gray-800">Rs. {displayData.pricePerHour}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                      <div className="text-green-600 font-medium">Pitch Count</div>
                      <div className="text-2xl font-bold text-gray-800">{displayData.pitchCount}</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                      <div className="text-green-600 font-medium">Dimension</div>
                      <div className="text-2xl font-bold text-gray-800">{displayData.pitchDimension}</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                      <div className="text-green-600 font-medium">Location</div>
                      <div className="text-lg font-medium text-gray-800">{displayData.futsalAddress}</div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl shadow-inner">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Facilities</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full ${displayData.hasChangingRoom ? 'bg-green-500' : 'bg-red-500'} shadow-lg`} />
                        <span className="text-lg text-gray-700">Changing Room</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full ${displayData.hasWaterAvailability ? 'bg-green-500' : 'bg-red-500'} shadow-lg`} />
                        <span className="text-lg text-gray-700">Water Availability</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;