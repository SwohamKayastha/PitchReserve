import React, { useState } from "react";
import { Settings, User, Mail, Phone, Camera, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ProfileSettings = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1234567890",
    avatarUrl: "/api/placeholder/144/144",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      weeklyDigest: true,
      darkMode: false
    }
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    const formData = new FormData(e.target);
    const updatedData = {
      ...profileData,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };
    setProfileData(updatedData);
    setIsEditProfileOpen(false);
  };

  const handleSettingsUpdate = (setting) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [setting]: !prev.preferences[setting]
      }
    }));
  };

  // Edit Profile Modal
  const EditProfileModal = () => (
    <AlertDialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>Edit Profile</span>
            <button 
              onClick={() => setIsEditProfileOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleProfileUpdate} className="space-y-6 mt-4">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={profileData.avatarUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button 
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                defaultValue={profileData.name}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                defaultValue={profileData.email}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                defaultValue={profileData.phone}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );

  // Settings Modal
  const SettingsModal = () => (
    <AlertDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>Settings</span>
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-medium mb-4">Notifications</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  checked={profileData.preferences.emailNotifications}
                  onChange={() => handleSettingsUpdate('emailNotifications')}
                  className="w-4 h-4 text-blue-600"
                />
              </label>
              
              <label className="flex items-center justify-between">
                <span>SMS Notifications</span>
                <input
                  type="checkbox"
                  checked={profileData.preferences.smsNotifications}
                  onChange={() => handleSettingsUpdate('smsNotifications')}
                  className="w-4 h-4 text-blue-600"
                />
              </label>
              
              <label className="flex items-center justify-between">
                <span>Weekly Digest</span>
                <input
                  type="checkbox"
                  checked={profileData.preferences.weeklyDigest}
                  onChange={() => handleSettingsUpdate('weeklyDigest')}
                  className="w-4 h-4 text-blue-600"
                />
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Appearance</h3>
            <label className="flex items-center justify-between">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                checked={profileData.preferences.darkMode}
                onChange={() => handleSettingsUpdate('darkMode')}
                className="w-4 h-4 text-blue-600"
              />
            </label>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <>
      {/* Profile Actions */}
      <div className="flex gap-4 w-full">
        <button
          onClick={() => setIsEditProfileOpen(true)}
          className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg"
        >
          Edit Profile
        </button>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex-1 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
        >
          Settings
        </button>
      </div>

      {/* Modals */}
      <EditProfileModal />
      <SettingsModal />
    </>
  );
};

export default ProfileSettings;