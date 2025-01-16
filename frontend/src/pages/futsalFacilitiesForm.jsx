import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { X, Upload, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FutsalUploadForm = ({ onClose }) => {
  const [futsalData, setFutsalData] = useState({
    name: '',
    location: '',
    pitchCount: '',
    openingTime: '',
    closingTime: '',
    pricePerHour: '',
    facilities: {
      water: false,
      changingRoom: false,
      parking: false,
      floodlights: false,
      cafeteria: false,
      equipment: false
    }
  });

  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFutsalData(prev => ({ ...prev, [name]: value }));
  };

  const handleFacilityChange = (facility) => {
    setFutsalData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility]
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    
    if (validImages.length + images.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    setImages(prevImages => [...prevImages, ...validImages]);
    const urls = validImages.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...urls]);
  };

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Futsal Data:', futsalData);
    console.log('Images:', images);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="max-w-3xl w-full">
        <Card className="bg-white shadow-xl relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-red-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
          
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-4 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">Add Your Futsal Facility</h2>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={futsalData.name}
                  onChange={handleInputChange}
                  className="px-4 py-2 rounded-lg border focus:border-blue-500 bg-white focus:ring-2 focus:ring-blue-200"
                  placeholder="Facility Name *"
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={futsalData.location}
                  onChange={handleInputChange}
                  className="px-4 py-2 rounded-lg border focus:border-blue-500 bg-white focus:ring-2 focus:ring-blue-200"
                  placeholder="Location *"
                  required
                />
                <input
                  type="number"
                  name="pitchCount"
                  value={futsalData.pitchCount}
                  onChange={handleInputChange}
                  min="1"
                  className="px-4 py-2 rounded-lg border focus:border-blue-500 bg-white focus:ring-2 focus:ring-blue-200"
                  placeholder="Number of Pitches *"
                  required
                />
                <input
                  type="number"
                  name="pricePerHour"
                  value={futsalData.pricePerHour}
                  onChange={handleInputChange}
                  min="0"
                  className="px-4 py-2 rounded-lg border focus:border-blue-500 focus:ring-2 bg-white focus:ring-blue-200"
                  placeholder="Price per Hour (Rs) *"
                  required
                />
                <input
                  type="time"
                  name="openingTime"
                  value={futsalData.openingTime}
                  onChange={handleInputChange}
                  className="px-4 py-2 rounded-lg border focus:border-blue-500 bg-white focus:ring-2 focus:ring-blue-200"
                  required
                />
                <input
                  type="time"
                  name="closingTime"
                  value={futsalData.closingTime}
                  onChange={handleInputChange}
                  className="px-4 py-2 rounded-lg border focus:border-blue-500 bg-white focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries({
                    water: '💧 Water',
                    changingRoom: '🚿 Changing Room',
                    parking: '🅿️ Parking',
                    floodlights: '💡 Lights',
                    cafeteria: '☕ Cafeteria',
                    equipment: '⚽ Equipment'
                  }).map(([key, label]) => (
                    <label 
                      key={key} 
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition ${
                        futsalData.facilities[key] 
                          ? 'bg-blue-50 border-blue-500 border-2' 
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={futsalData.facilities[key]}
                        onChange={() => handleFacilityChange(key)}
                        className="hidden"
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">Facility Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {previewUrls.length < 10 && (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-2">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        multiple
                      />
                    </label>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FutsalUploadForm;