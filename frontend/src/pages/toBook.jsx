import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // Adjust import paths as necessary
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react'; // Import Lucide icon

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
    const matchesNearMe = !filters.nearMe || futsal.distance <= 5; // Assuming 'near me' means within 5 km
    return matchesSearch && matchesWater && matchesParking && matchesChangingRoom && matchesNearMe;
  });

  return (
    <div className="w-full mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-green-800 text-center">Futsal Booking</h1>
      
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