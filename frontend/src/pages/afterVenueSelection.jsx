import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ArrowLeft, Clock, MapPin, Users, Ruler } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FutsalDetail = () => {
  const [date, setDate] = useState(new Date());
  const [showSlots, setShowSlots] = useState(false);
  const [useSlider, setUseSlider] = useState(true);
  const [startTime, setStartTime] = useState(6); // Default start time
  const [endTime, setEndTime] = useState(7); // Default end time
  const [selectedSlot, setSelectedSlot] = useState(null); // Track selected slot
  const navigate = useNavigate();

  // Mock data - replace with your API data
  const futsalData = {
    name: "Green Field Futsal",
    location: "Kathmandu, Nepal",
    image: "/api/placeholder/800/400",
    openingTime: "6:00 AM",
    closingTime: "9:00 PM",
    pricePerHour: 1500,
    pitchCount: 2,
    dimensions: "30m x 15m",
    facilities: [
      { name: "Changing Room", available: true },
      { name: "Water Supply", available: true },
      { name: "Parking", available: true },
      { name: "First Aid", available: true }
    ]
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setShowSlots(true);
  };

  const handleSubmit = () => {
    alert(`Booking from ${startTime}:00 to ${endTime}:00 on ${date.toDateString()}`);
    setShowSlots(false);
    setSelectedSlot(null); // Reset selected slot after booking
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {/* Main Info Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-xl p-6">
              {/* Hero Image */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6">
                <img
                  src={futsalData.image}
                  alt={futsalData.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Futsal Name and Location */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{futsalData.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>{futsalData.location}</span>
                </div>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Operating Hours</span>
                  </div>
                  <div className="text-gray-800">
                    {futsalData.openingTime} - {futsalData.closingTime}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Available Pitches</span>
                  </div>
                  <div className="text-gray-800">{futsalData.pitchCount} Pitches</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Pitch Size</span>
                  </div>
                  <div className="text-gray-800">{futsalData.dimensions}</div>
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Available Facilities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {futsalData.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${facility.available ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-gray-700">{facility.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="flex items-center justify-center lg:col-span-1">
            <div className="bg-white rounded-lg shadow-xl p-6">
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
                  Rs. {futsalData.pricePerHour}/hour
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slots Popup */}
        {showSlots && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-80">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{date.toDateString()}</h3>
              
              {/* Toggle Switch */}
              <div className="flex items-center mb-4">
                <label className="mr-2 text-sm font-medium text-gray-700">Use:</label>
                <input 
                  type="checkbox" 
                  checked={useSlider} 
                  onChange={() => setUseSlider(prev => !prev)}
                  className="toggle-checkbox" 
                />
                <span className="ml-2 text-sm font-medium">{useSlider ? 'Slider' : 'Slots'}</span>
              </div>

              {useSlider ? (
                <>
                  {/* Slider for Start Time */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time: {startTime}:00</label>
                    <input 
                      type="range" 
                      min="6" 
                      max={endTime - 1} // Ensure start time is less than end time
                      step="1" 
                      value={startTime} 
                      onChange={(e) => {
                        const newStartTime = Number(e.target.value);
                        setStartTime(newStartTime);
                        // Automatically adjust end time to maintain an hour interval
                        if (newStartTime >= endTime) {
                          setEndTime(newStartTime + 1);
                        }
                      }}
                      className="w-full"
                    />
                  </div>

                  {/* Slider for End Time */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time: {endTime}:00</label>
                    <input 
                      type="range" 
                      min={startTime + 1} // End time must be at least 1 hour after start time
                      max="21" 
                      step="1" 
                      value={endTime} 
                      onChange={(e) => {
                        const newEndTime = Number(e.target.value);
                        setEndTime(newEndTime);
                        // If end time is moved, adjust start time accordingly
                        if (newEndTime <= startTime) {
                          setStartTime(newEndTime - 1);
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 15 }, (_, i) => {
                    const slotStart = 6 + i;
                    const slotEnd = slotStart + 1;
                    const isSelected = selectedSlot === `${slotStart}-${slotEnd}`;
                    return (
                      <div 
                        key={i} 
                        className={`border border-gray-300 rounded-lg text-center py-3 cursor-pointer transition ${isSelected ? 'bg-blue-400 text-white' : 'bg-gray-100 hover:bg-gray-300'}`}
                        onClick={() => {
                          setSelectedSlot(`${slotStart}-${slotEnd}`);
                          setStartTime(slotStart);
                          setEndTime(slotEnd);
                        }}
                      >
                        {`${slotStart}-${slotEnd}`}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Submit Button */}
              <button 
                onClick={handleSubmit} 
                className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg transition hover:bg-gray-700"
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
          </div>
        )}
      </div>

      {/* Custom styles for the calendar and toggle */}
      <style>{`
        .calendar-container .react-calendar {
          border: none;
          background-color: transparent;
          width: 100%;
        }
        .react-calendar__tile {
          transition: background 0.2s ease;
        }
        .react-calendar__tile--active {
          background: #ccc !important;
        }
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: #bbb !important;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #e0e0e0;
        }
        .react-calendar__tile--now {
          background: #d0d0d0 !important;
        }
        .toggle-checkbox {
          width: 40px;
          height: 20px;
          cursor: pointer;
          appearance: none;
          background-color: #ccc;
          border-radius: 20px;
          position: relative;
          outline: none;
        }
        .toggle-checkbox:checked {
          background-color: #4CAF50;
        }
        .toggle-checkbox:checked::before {
          left: 20px;
        }
        .toggle-checkbox::before {
          content: '';
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          position: absolute;
          transition: left 0.2s;
        }
      `}</style>
    </div>
  );
};

export default FutsalDetail;