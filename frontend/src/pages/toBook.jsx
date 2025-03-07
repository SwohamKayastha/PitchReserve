import { useEffect, useState, } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Search } from 'lucide-react';
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import profileIcon from "../assets/profileIcon.png";
import { Menu, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Loading from './loading';
import { getFutsalFields, getFutsalFieldById } from "@/api/facilities";
import { handleProfileClick } from '../utils/auth';


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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-4">
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
          <Link to="/" className="relative">
            <img
              src={logo}
              alt="logo"
              className="h-12 w-auto"
            />
          </Link>
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
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FutsalBookingPage = () => {
  const [futsals, setFutsals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    facilities: {
      water: false,
      parking: false,
      changingRoom: false,
      bathroom: false,
      cafeteria: false,
      floodlights: false,
    },
    pitches: 'any',
    location: 'all',
    priceRange: [0, 2000],
    image_url: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const API_URL = process.env.API_URL;

  useEffect(() => {
    const fetchFutsals = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(`${API_URL}/futsal-facilities/list/`);
        console.log(response.data); 
        // const response = await getFutsalFields();
        setFutsals(response.data);
      } catch (error) {
        console.error("Error fetching futsals:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFutsals();
  }, []);

  const handleFacilityChange = (facility) => {
    setFilters(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility]
      }
    }));
  };

  const handlePitchesChange = (value) => {
    setFilters(prev => ({ ...prev, pitches: value }));
  };

  const handleLocationChange = (value) => {
    setFilters(prev => ({ ...prev, location: value }));
  };

  const handlePriceRangeChange = (value) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  };

  const filteredFutsals = futsals.filter(futsal => {
    console.log(futsal.images, futsal.name);
    const matchesSearch = searchTerm === "" || 
      futsal.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFacilities = Object.entries(filters.facilities)
      .every(([key, value]) => !value || futsal[key]);
    const matchesPitches = filters.pitches === 'any' || 
      futsal.number_of_pitches.toString() === filters.pitches;
    const matchesLocation = filters.location === 'all' || 
      futsal.location === filters.location;
    const matchesPrice = futsal.price_per_hour >= filters.priceRange[0] && 
      futsal.price_per_hour <= filters.priceRange[1];
    
    return matchesSearch && matchesFacilities && matchesPitches && 
      matchesLocation && matchesPrice;
  });

    if (loading) {
      return <Loading />; 
    }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
      <TitleBar />
      <div className="container mx-auto py-8">
        <h1 className="text-5xl font-bold mb-8 text-green-800 text-center">
          Book Your Favourite Futsal
        </h1>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0 bg-gradient-to-r from-aqua-800 to-gray-300 p-6 rounded-xl shadow-2xl space-y-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Futsal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <Search className="absolute right-2 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Facilities Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-green-800">Facilities</h3>
              <div className="space-y-2">
                {Object.keys(filters.facilities).map((facility) => (
                  <div key={facility} className="flex items-center">
                    <Checkbox
                      id={facility}
                      checked={filters.facilities[facility]}
                      onCheckedChange={() => handleFacilityChange(facility)}
                      className="border-green-500"
                    />
                    <label htmlFor={facility} className="ml-2 text-sm capitalize">
                      {facility.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Number of Pitches */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-green-800">Number of Pitches</h3>
              <Select value={filters.pitches} onValueChange={handlePitchesChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of pitches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1 Pitch</SelectItem>
                  <SelectItem value="2">2 Pitches</SelectItem>
                  <SelectItem value="3">3+ Pitches</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-green-800">Location</h3>
              <Select value={filters.location} onValueChange={handleLocationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {/* Add your locations dynamically */}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-green-800">Price Range</h3>
              <div className="px-2">
                <Slider
                  min={0}
                  max={2000}
                  step={100}
                  value={filters.priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Rs {filters.priceRange[0]}</span>
                  <span>Rs {filters.priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6 rounded-lg">
            {filteredFutsals.map((futsal, index) => (
              <motion.div
                key={futsal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/3 h-64 md:h-auto">
                      <img
                        src={futsal.images || "/api/placeholder/800/400"}
                        alt={futsal.name || "Futsal Facility"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-semibold text-green-800 mb-2">{futsal.name}</h3>
                          <p className="text-green-600 mb-4">{futsal.location}</p>
                        </div>
                        <div className="text-2xl font-bold text-green-700">
                          Rs {futsal.price_per_hour}/hr
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="block text-sm text-gray-600">Pitches</span>
                          <span className="font-semibold">{futsal.number_of_pitches}</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="block text-sm text-gray-600">Dimensions</span>
                          <span className="font-semibold">{futsal.pitch_dimensions}</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="block text-sm text-gray-600">Opening Time</span>
                          <span className="font-semibold">{futsal.availability_start_time}</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="block text-sm text-gray-600">Closing Time</span>
                          <span className="font-semibold">{futsal.availability_end_time}</span>
                        </div>
                      </div>
                      <Link to={`/futsalDetail/${futsal.id}`}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition duration-200 ease-in-out rounded-full h-12">
                          View Details & Book
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutsalBookingPage;