import React, { useEffect, useState } from "react";
import { Settings, Calendar, SortDesc, SortAsc, X, Upload } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { fetchOwnerProfile, updateOwnerProfile } from "@/api/auth";
import { getFutsalFields, getFutsalFieldById } from "@/api/facilities";
import { getOwnerFutsalFields, getOwnerFutsalFieldById } from "@/api/facilities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FutsalUploadForm from "./futsalFacilitiesForm";
import {Select } from "@/components/ui/select";
import {Navigate} from 'react-router-dom';

const Profile = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFacilitiesForm, setShowFacilitiesForm] = useState(false);
  const [isSortAscending, setIsSortAscending] = useState(true);
  const [ownerData, setOwnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    location: '',
    avatarUrl: '',
  });

  // Added state for fields and selectedField
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [totalVenues, setTotalVenues] = useState(0);
  
  // useEffect(() => {
  //   const getOwnerProfile = async () => {
  //     try {
  //       const data = await fetchOwnerProfile();
  //       setOwnerData(data);
  //       setProfileData({
  //         name: `${data.user.first_name} ${data.user.last_name}`,
  //         email: data.user.email,
  //         location: data.location,
  //         avatarUrl: data.image_url || "/api/placeholder/144/144",
  //       });
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // Fetch all fields
  //   const fetchFieldsData = async () => {
  //     try {
  //       const data = await getFutsalFields();
  //       console.log("Fetched fields:", data); // Check what's returned
  //       setFields(data);
  //     } catch (err) {
  //       console.error("Error fetching fields:", err);
  //     }
  //   };
    
  //   getOwnerProfile();
  //   fetchFieldsData();
  // }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch owner profile
        const ownerProfile = await fetchOwnerProfile();
        setOwnerData(ownerProfile);
        setProfileData({
          name: `${ownerProfile.user.first_name} ${ownerProfile.user.last_name}`,
          email: ownerProfile.user.email,
          // location: ownerProfile.location,
          // avatarUrl: ownerProfile.image_url || "/api/placeholder/144/144",
          phone_number: ownerProfile.phone_number,
          location: ownerProfile.location,
          additional_info: ownerProfile.additional_info,
          image_url: ownerProfile.image_url || "/api/placeholder/144/144",
        });

        // Fetch all fields for this owner
        const fetchedFields = await getOwnerFutsalFields();
        setFields(fetchedFields);
        // Calculating the total venues of the certain owner
        setTotalVenues(fetchedFields.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle the selection of a single facility by ID
  const handleFieldSelect = async (e) => {
    const fieldId = e.target.value;
    if (!fieldId) {
      setSelectedField(null);
      return;
    }
    try {
      const fieldData = await getOwnerFutsalFieldById(fieldId);
      console.log("Selected field data:", fieldData);
      setSelectedField(fieldData);
    } catch (err) {
      console.error("Error fetching facility by ID:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (error) return <Navigate to="/error" state={{ error: error }} />;

  const sortedBookings = [...(ownerData.bookings || [])].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return isSortAscending ? dateA - dateB : dateB - dateA;
  });

  const toggleSort = () => setIsSortAscending(!isSortAscending);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOwnerProfile(profileData);
      alert('Profile updated successfully');
      setShowEditProfile(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message);
    }

  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
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
                src={profileData.image_url}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone No.</label>
              <Input
                type="text"
                value={profileData.phone_number}
                onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Info</label>
              <Input
                type="text"
                value={profileData.additional_info}
                onChange={(e) => setProfileData({ ...profileData, additional_info: e.target.value })}
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-3">
            <Card className="sticky top-8 backdrop-blur-sm bg-white/90 shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-square max-w-[144px]">
                    <div className="absolute inset-0 rounded-full border-4 border-green-500 p-1">
                      <img
                        src={ownerData.image_url || "https://placehold.co/100x200?text=Profile"}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 shadow-lg hover:bg-green-600 transition"
                    >
                      <Settings className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">
                    {ownerData.user.first_name} {ownerData.user.last_name}
                  </h2>
                  <div className="text-sm text-gray-600 text-center">
                    {ownerData.location}
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
                  <div className="grid grid-cols-2 w-full mt-6 p-4 bg-green-50 rounded-xl shadow-inner gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-800">
                        {totalVenues}
                      </div>
                      <div className="text-xs font-medium text-green-600">
                        Venues
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-800">
                        {ownerData.user.username}
                      </div>
                      <div className="text-xs font-medium text-green-600">
                        Username
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Member since{" "}
                    {new Date(ownerData.user.date_joined).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Futsal Information Section */}
          <div className="lg:col-span-6">
            <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Futsal Information
                  </h3>
                  <p className="text-lg text-green-600 font-medium">
                    {ownerData.field_name}
                  </p>
                </div>
                {/* Replacing static select with dynamic fields */}
                {/* <select
                  className="bg-blue-50 text-blue-900 border border-blue-300 rounded-md shadow-sm px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Venue</option>
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select> */}

                <select
                  className="bg-blue-50 text-blue-900 border border-blue-300 rounded-md shadow-sm px-2 py-1"
                  onChange={handleFieldSelect}
                >
                  <option value="">Select Venue</option>
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShowFacilitiesForm(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Edit Details
                </button>
              </CardHeader>

              <CardContent className="p-6">
                {/* If a specific field is selected, show its data, otherwise show the existing layout */}
                {selectedField ? (
                  <>
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 shadow-lg">
                    <img
                      src={
                        selectedField.images && selectedField.images.length > 0
                          ? selectedField.images[0]
                          : `https://placehold.co/600x400?text=${selectedField.name}`
                      }
                      alt="Futsal Field"
                      className="w-full h-full object-cover"
                    />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                        <div className="text-green-600 text-sm font-medium">
                          Opening Time
                        </div>
                        <div className="text-xl font-bold text-gray-800">
                          {selectedField.availability_start_time}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                        <div className="text-green-600 text-sm font-medium">
                          Closing Time
                        </div>
                        <div className="text-xl font-bold text-gray-800">
                          {selectedField.availability_end_time}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                        <div className="text-green-600 text-sm font-medium">
                          Price per Hour
                        </div>
                        <div className="text-xl font-bold text-gray-800">
                          Rs. {selectedField.price_per_hour}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                        <div className="text-green-600 text-sm font-medium">
                          Pitch Count
                        </div>
                        <div className="text-xl font-bold text-gray-800">
                          {selectedField.number_of_pitches}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                        <div className="text-green-600 text-sm font-medium">
                          Event Capacity
                        </div>
                        <div className="text-xl font-bold text-gray-800">
                          {selectedField.number_of_pitches}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                        <div className="text-green-600 text-sm font-medium">
                          Location
                        </div>
                        <div className="text-sm font-medium text-gray-800">
                          {selectedField.location}
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl shadow-inner">
                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        Facilities
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              selectedField.has_changing_room
                                ? "bg-green-500"
                                : "bg-red-500"
                            } shadow-lg`}
                          />
                          <span className="text-sm text-gray-700">
                            Changing Room
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              selectedField.water_availability
                                ? "bg-green-500"
                                : "bg-red-500"
                            } shadow-lg`}
                          />
                          <span className="text-sm text-gray-700">
                            Water Availability
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              selectedField.lights
                                ? "bg-green-500"
                                : "bg-red-500"
                            } shadow-lg`}
                          />
                          <span className="text-sm text-gray-700">
                          lights
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              selectedField.parking_facilities
                                ? "bg-green-500"
                                : "bg-red-500"
                            } shadow-lg`}
                          />
                          <span className="text-sm text-gray-700">
                            parking_facilities
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              selectedField.cafeteria
                                ? "bg-green-500"
                                : "bg-red-500"
                            } shadow-lg`}
                          />
                          <span className="text-sm text-gray-700">
                              cafeteria
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              selectedField.equipment
                                ? "bg-green-500"
                                : "bg-red-500"
                            } shadow-lg`}
                          />
                          <span className="text-sm text-gray-700">
                              equipment
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Existing layout if no field is selected:
                  <>
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 shadow-lg">
                      <img
                        src={ownerData.image_url || "/api/placeholder/800/400"}
                        alt="Futsal Field"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    {/* ...existing code for facility info placeholders... */}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-3">
            <Card className="sticky top-8 backdrop-blur-sm bg-white/90 shadow-xl">
              <CardHeader className="flex justify-between items-center p-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Recent Bookings
                  </h3>
                </div>
                <button
                  onClick={toggleSort}
                  className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200 flex items-center gap-1"
                  title={`Sort by date ${isSortAscending ? "descending" : "ascending"}`}
                >
                  {isSortAscending ? (
                    <SortAsc className="w-5 h-5 text-green-600" />
                  ) : (
                    <SortDesc className="w-5 h-5 text-green-600" />
                  )}
                </button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {sortedBookings.map((booking, index) => (
                    <div
                      key={index}
                      className="bg-green-50 p-4 rounded-xl shadow-inner"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-800">
                            {booking.customerName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm font-medium text-green-600">
                            {booking.timeSlot}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Forms */}
      {showEditProfile && <ProfileEditForm />}
      {showSettings && <SettingsForm />}
      {showFacilitiesForm && (
        <FutsalUploadForm
          isOpen={showFacilitiesForm}
          onClose={() => setShowFacilitiesForm(false)}
          facilityData={ownerData}
          onSubmit={(updatedData) => {
            console.log('Updated facility data:', updatedData);
            setShowFacilitiesForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Profile;


// import React, { useEffect, useState } from "react";
// import { Settings, Calendar, SortDesc, SortAsc, X, Upload } from "lucide-react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { fetchOwnerProfile } from "@/api/auth";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import FutsalUploadForm from "./futsalFacilitiesForm";
// import {Select } from "@/components/ui/select";

// const Profile = () => {
//   const [showEditProfile, setShowEditProfile] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showFacilitiesForm, setShowFacilitiesForm] = useState(false);
//   const [isSortAscending, setIsSortAscending] = useState(true);
//   const [ownerData, setOwnerData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [profileData, setProfileData] = useState({
//     name: '',
//     email: '',
//     location: '',
//     avatarUrl: '',
//   });

//   useEffect(() => {
//     const getOwnerProfile = async () => {
//       try {
//         const data = await fetchOwnerProfile();
//         setOwnerData(data);
//         setProfileData({
//           name: `${data.user.first_name} ${data.user.last_name}`,
//           email: data.user.email,
//           location: data.location,
//           avatarUrl: data.image_url || "/api/placeholder/144/144",
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getOwnerProfile();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const sortedBookings = [...(ownerData.bookings || [])].sort((a, b) => {
//     const dateA = new Date(a.date);
//     const dateB = new Date(b.date);
//     return isSortAscending ? dateA - dateB : dateB - dateA;
//   });

//   const toggleSort = () => setIsSortAscending(!isSortAscending);

//   const handleProfileSubmit = (e) => {
//     e.preventDefault();
//     setShowEditProfile(false);
//   };

//   const handleSettingsSubmit = (e) => {
//     e.preventDefault();
//     setShowSettings(false);
//   };

//   const ProfileEditForm = () => (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold">Edit Profile</h3>
//           <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-700">
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         <form onSubmit={handleProfileSubmit} className="space-y-4">
//           <div className="flex flex-col items-center mb-6">
//             <div className="relative">
//               <img
//                 src={profileData.avatarUrl}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover"
//               />
//               <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg hover:bg-blue-600 transition">
//                 <Upload className="w-4 h-4 text-white" />
//               </button>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//               <Input
//                 type="text"
//                 value={profileData.name}
//                 onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//                 className="w-full"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <Input
//                 type="email"
//                 value={profileData.email}
//                 onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
//                 className="w-full"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//               <Input
//                 type="text"
//                 value={profileData.location}
//                 onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
//                 className="w-full"
//               />
//             </div>
//           </div>
//           <div className="flex gap-3 mt-6">
//             <Button
//               type="submit"
//               className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Save Changes
//             </Button>
//             <Button
//               type="button"
//               onClick={() => setShowEditProfile(false)}
//               className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

//   const SettingsForm = () => (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold">Settings</h3>
//           <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700">
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         <form onSubmit={handleSettingsSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
//             <Input type="password" className="w-full" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//             <Input type="password" className="w-full" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
//             <Input type="password" className="w-full" />
//           </div>
//           <div className="flex gap-3 mt-6">
//             <Button
//               type="submit"
//               className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Update Password
//             </Button>
//             <Button
//               type="button"
//               onClick={() => setShowSettings(false)}
//               className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Profile Section */}
//           <div className="lg:col-span-3">
//             <Card className="sticky top-8 backdrop-blur-sm bg-white/90 shadow-xl">
//               <CardContent className="p-6">
//                 <div className="flex flex-col items-center">
//                   <div className="relative w-full aspect-square max-w-[144px]">
//                     <div className="absolute inset-0 rounded-full border-4 border-green-500 p-1">
//                       <img
//                         src={ownerData.image_url || "/api/placeholder/144/144"}
//                         alt="Profile"
//                         className="w-full h-full rounded-full object-cover"
//                       />
//                     </div>
//                     <button
//                       onClick={() => setShowSettings(true)}
//                       className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 shadow-lg hover:bg-green-600 transition"
//                     >
//                       <Settings className="w-4 h-4 text-white" />
//                     </button>
//                   </div>
//                   <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">
//                     {ownerData.user.first_name} {ownerData.user.last_name}
//                   </h2>
//                   <div className="text-sm text-gray-600 text-center">
//                     {ownerData.location}
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
//                   <div className="grid grid-cols-2 w-full mt-6 p-4 bg-green-50 rounded-xl shadow-inner gap-4">
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-green-800">
//                         {ownerData.number_of_venues}
//                       </div>
//                       <div className="text-xs font-medium text-green-600">
//                         Venues
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-green-800">
//                         {ownerData.user.username}
//                       </div>
//                       <div className="text-xs font-medium text-green-600">
//                         Username
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-4 text-xs text-gray-500 text-center">
//                     Member since{" "}
//                     {new Date(ownerData.user.date_joined).toLocaleDateString()}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Futsal Information Section */}
//           <div className="lg:col-span-6">
//             <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
//               <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-4">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     Futsal Information
//                   </h3>
//                   <p className="text-lg text-green-600 font-medium">
//                     {ownerData.field_name}
//                   </p>
//                 </div>
//                 <select
//                    className="bg-blue-50 text-blue-900 border border-blue-300 rounded-md shadow-sm px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     >
//                     <option value="all">Select Venue</option>
//                     <option value="venue1">Venue 1</option>
//                     <option value="venue2">Venue 2</option>
  
//                 </select> 
//                 <button 
//                   onClick={() => setShowFacilitiesForm(true)}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg flex items-center gap-2"
//                 >
//                   <Settings className="w-4 h-4" />
//                   Edit Details
//                 </button>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 shadow-lg">
//                   <img
//                     src={ownerData.image_url || "/api/placeholder/800/400"}
//                     alt="Futsal Field"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//                   <div className="bg-green-50 p-4 rounded-xl shadow-inner">
//                     <div className="text-green-600 text-sm font-medium">
//                       Opening Time
//                     </div>
//                     <div className="text-xl font-bold text-gray-800">
//                       {ownerData.availability_start_time}
//                     </div>
//                   </div>
//                   <div className="bg-green-50 p-4 rounded-xl shadow-inner">
//                     <div className="text-green-600 text-sm font-medium">
//                       Closing Time
//                     </div>
//                     <div className="text-xl font-bold text-gray-800">
//                       {ownerData.availability_end_time}
//                     </div>
//                   </div>
//                   <div className="bg-green-50 p-4 rounded-xl shadow-inner">
//                     <div className="text-green-600 text-sm font-medium">
//                       Price per Hour
//                     </div>
//                     <div className="text-xl font-bold text-gray-800">
//                       Rs. {ownerData.price_per_hour}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//                   <div className="bg-green-50 p-4 rounded-xl shadow-inner">
//                     <div className="text-green-600 text-sm font-medium">
//                       Pitch Count
//                     </div>
//                     <div className="text-xl font-bold text-gray-800">
//                       {ownerData.number_of_pitches}
//                     </div>
//                   </div>
//                   <div className="bg-green-50 p-4 rounded-xl shadow-inner">
//                     <div className="text-green-600 text-sm font-medium">
//                       Dimension
//                     </div>
//                     <div className="text-xl font-bold text-gray-800">
//                       {ownerData.pitch_dimensions}
//                     </div>
//                   </div>
//                   <div className="bg-green-50 p-4 rounded-xl shadow-inner">
//                     <div className="text-green-600 text-sm font-medium">
//                       Location
//                     </div>
//                     <div className="text-sm font-medium text-gray-800">
//                       {ownerData.location}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-xl shadow-inner">
//                   <h4 className="text-lg font-bold text-gray-800 mb-3">
//                     Facilities
//                   </h4>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`w-4 h-4 rounded-full ${
//                           ownerData.has_changing_room
//                             ? "bg-green-500"
//                             : "bg-red-500"
//                         } shadow-lg`}
//                       />
//                       <span className="text-sm text-gray-700">
//                         Changing Room
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`w-4 h-4 rounded-full ${
//                           ownerData.water_availability
//                             ? "bg-green-500"
//                             : "bg-red-500"
//                         } shadow-lg`}
//                       />
//                       <span className="text-sm text-gray-700">
//                         Water Availability
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Bookings Section */}
//           <div className="lg:col-span-3">
//             <Card className="sticky top-8 backdrop-blur-sm bg-white/90 shadow-xl">
//               <CardHeader className="flex justify-between items-center p-6">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-5 h-5 text-green-600" />
//                   <h3 className="text-xl font-bold text-gray-800">
//                     Recent Bookings
//                   </h3>
//                 </div>
//                 <button
//                   onClick={toggleSort}
//                   className="p-2 hover:bg-green-50 rounded-lg transition-colors duration-200 flex items-center gap-1"
//                   title={`Sort by date ${isSortAscending ? "descending" : "ascending"}`}
//                 >
//                   {isSortAscending ? (
//                     <SortAsc className="w-5 h-5 text-green-600" />
//                   ) : (
//                     <SortDesc className="w-5 h-5 text-green-600" />
//                   )}
//                 </button>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   {sortedBookings.map((booking, index) => (
//                     <div
//                       key={index}
//                       className="bg-green-50 p-4 rounded-xl shadow-inner"
//                     >
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <div className="font-medium text-gray-800">
//                             {booking.customerName}
//                           </div>
//                           <div className="text-sm text-gray-600">
//                             {new Date(booking.date).toLocaleDateString()}
//                           </div>
//                           <div className="text-sm font-medium text-green-600">
//                             {booking.timeSlot}
//                           </div>
//                         </div>
//                         <span
//                           className={`px-2 py-1 text-xs rounded-full ${
//                             booking.status === "confirmed"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {booking.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Modal Forms */}
//       {showEditProfile && <ProfileEditForm />}
//       {showSettings && <SettingsForm />}
//       {showFacilitiesForm && (
//         <FutsalUploadForm
//           isOpen={showFacilitiesForm}
//           onClose={() => setShowFacilitiesForm(false)}
//           facilityData={ownerData}
//           onSubmit={(updatedData) => {
//             console.log('Updated facility data:', updatedData);
//             setShowFacilitiesForm(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Profile;
