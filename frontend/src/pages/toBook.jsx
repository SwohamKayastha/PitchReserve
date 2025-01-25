import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // Adjust import paths as necessary
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react'; // Import Lucide icon


import { motion } from "framer-motion";
import profileIcon from "../assets/profileIcon.png";
import logo from "../assets/logo.png";
import { X , Menu } from "lucide-react";
import { useEffect } from "react";

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
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <Link to="/login" className="relative">
            <img 
              src={profileIcon}
              alt="profile"
              className="h-12 w-auto transition-transform duration-200 hover:brightness-110"
            />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
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
                <X size={24}  />
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
const dummyData = [
  {
    id: 1,
    name: "Green Futsal Arena",
    image: "/placeholder.svg",
    distance: 2.5,
    location: "123 Main St, City Center",
    water: true,
    parking: true,
    changingRoom: true,
  },
  {
    id: 2,
    name: "Turf Champions",
    image: "/placeholder.svg",
    distance: 3.8,
    location: "456 Park Ave, Suburb",
    water: false,
    parking: true,
    changingRoom: false,
  },
  {
    id: 3,
    name: "Indoor Soccer Hub",
    image: "/placeholder.svg",
    distance: 1.2,
    location: "789 Sports Blvd, Downtown",
    water: true,
    parking: false,
    changingRoom: true,
  },
  {
    id: 4,
    name: "Futsal Pro Center",
    image: "/placeholder.svg",
    distance: 4.5,
    location: "101 Goal St, Uptown",
    water: true,
    parking: true,
    changingRoom: false,
  },
];

const FutsalBookingPage = () => {
  const [futsals, setFutsals] = useState(dummyData); // Use dummy data
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filters, setFilters] = useState({
    water: false,
    parking: false,
    changingRoom: false,
    nearMe: false,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const filteredFutsals = futsals.filter(futsal => {
    const matchesSearch = searchTerm === "" || futsal.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWater = !filters.water || futsal.water;
    const matchesParking = !filters.parking || futsal.parking;
    const matchesChangingRoom = !filters.changingRoom || futsal.changingRoom;
    const matchesNearMe = !filters.nearMe || futsal.distance <= 2;
    return matchesSearch && matchesWater && matchesParking && matchesChangingRoom && matchesNearMe;
  });

  return (
    <div className="w-auto mx-auto py-8 px-4">
      <TitleBar />
      <h1 className="text-4xl font-bold mt-10 mb-6 text-green-800 text-center">Book your favourite Futsal</h1>
      
      {/* Enhanced Search Bar */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-3/4 md:w-1/2">
          <input
            type="text"
            placeholder="Search Futsal..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-green-300 rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-4 flex justify-center space-x-2">
        <Button 
          className={`px-4 py-2 rounded-full ${filters.water ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`} 
          onClick={() => handleFilterChange('water')}
        >
          Water
        </Button>
        <Button 
          className={`px-4 py-2 rounded-full ${filters.parking ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`} 
          onClick={() => handleFilterChange('parking')}
        >
          Parking
        </Button>
        <Button 
          className={`px-4 py-2 rounded-full ${filters.changingRoom ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`} 
          onClick={() => handleFilterChange('changingRoom')}
        >
          Changing Room
        </Button>
        <Button 
          className={`px-4 py-2 rounded-full ${filters.nearMe ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`} 
          onClick={() => handleFilterChange('nearMe')}
        >
          Near Me
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFutsals.map((futsal) => (
          <div key={futsal.id} className="block">
            <Card className="h-full transition-shadow hover:shadow-xl border border-green-200 rounded-lg cursor-pointer">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <img
                    src={futsal.image || "/placeholder.svg"}
                    alt={futsal.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-green-800">{futsal.name}</h3>
                  <p className="text-sm text-green-600">{futsal.distance} km away</p>
                  <p className="text-sm text-gray-700">{futsal.location}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/venueSelection/${futsal.id}`} className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition duration-200 ease-in-out">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FutsalBookingPage;