  import React from 'react';
  import {useState} from 'react';
  import subscriptionImage from '../assets/subscriptions.jpg';
  import mapOfNepal from '../assets/mapOfNepal.png';
  import searchicon from '../assets/searchIcon.png';
  import bookicon from '../assets/bookIcon.png';
  import playicon from '../assets/playIcon.png';
  import heroimage from '../assets/bg.jpg';
  import logo from '../assets/logo.png';
  import profileIcon from '../assets/profileIcon.png';
  

  import { X, Menu } from 'lucide-react';
  import { Facebook, Instagram, Mail } from 'lucide-react';
  import { Link } from 'react-router-dom'; 



  const TitleBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
  
    return (
      <div className="fixed top-0 left-0 w-full flex justify-between items-center p-1 z-50">
        <div className="flex items-center">
          <button className="felx items-center bg-transparent hover:bg-gray-00">
            <div className="relative h-10 w-auto p-0">
              {/* <a href ="/player/profile"> */}
              <a href ="/login">
                <img 
                  src={profileIcon} 
                  alt="profile" 
                  className="h-10 w-auto"
                  style={{
                    filter: 'brightness(1) contrast(1)',
                    backgroundColor: 'transparent'
                  }}
                />``
              </a>  
            </div>
          </button>
        </div>


        <div className="flex items-center">
          <button className="felx items-right bg-transparent hover:bg-gray-00">
            <div className="relative h-10 w-auto p-0">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-10 w-auto"
                style={{
                  filter: 'brightness(1) contrast(1)',
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          </button>
        </div>
        
        <div className="relative">
          <button
            className="p-2 text-black bg-transparent hover:bg-gray-400 rounded-lg transition-colors duration-200 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
  
          {/* Sliding Menu */}
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
        
        {/* Overlay when menu is open */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          />
        )}

                {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          />
        )}
      </div>
    );
  };
 
  



//featureTiles

const FeaturesSection = () => {
  return (
    <div className="bg-green-900 py-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">STREAMLINE, MANAGE AND GROW</h2>
        <br></br>
        <h4 className="text-white">All With PitchReserve</h4>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6 px-4">
        <div className="text-center">
          <div className="bg-teal-800 p-14 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={logo} alt="logo" className="mx-auto mb-4 w-15 h-auto" />
            <p className="text-white">Venue Booking</p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-teal-700 p-14 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={logo} alt="Venue Management" className="mx-auto mb-4 w-15 h-auto" />
            <p className="text-white">Venue Management</p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-emerald-700 p-14 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={logo} alt="PS" className="mx-auto mb-4 w-15 h-auto" />
            <p className="text-white">Membership </p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-emerald-600 p-14 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={logo} alt="M-Pay" className="mx-auto mb-4 w-15 h-auto" />
            <p className="text-white">New Features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="bg-[#0a0d14] text-white py-8 justify-center items-center" >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          
          {/* Logo and Tagline Section */}
          <div className="flex flex-row mx-auto my-10 w-1/16 h-auto relative">
            <div>
              <img src={logo} alt="Logo" className="w-40 h -20768"/>
            </div>
            <div className="mb-4 text-start">
              <p>Nepal's Only<br></br> Futsal Venue<br></br> Booking System</p>
            </div>
            {/* Vertical Divider */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-40 bg-gray-600" />
          </div>

          {/* Navigation Links Column */}
          <div className="col-span-1 text-center relative">
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="/aboutUs" className="hover:text-gray-300">About us</a></li>
              <li><a href="/Partnership" className="hover:text-gray-300">Partner With Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Membership/Subscriptions</a></li>
              <li><a href="#" className="hover:text-gray-300">Book Now</a></li>
              <li><a href="#" className="hover:text-gray-300">Updates</a></li>
              <li><a href="#" className="hover:text-gray-300">Blogs</a></li>
            </ul>
            {/* Vertical Divider */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-40 bg-gray-600" />
          </div>

          {/* Contact Info Column */}
          <div className="col-span-1 text-center">
            <ul className="space-y-2">
              <li>Pitch Reserve</li>
              <li>CS</li>
              <li>Kathmandu University</li>
              <li>+977 9741740551</li>
              <li>info@pitchreserve.com.np</li>
              {/* Social Media Links */}
              <li className="pt-4">
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://facebook.com/pitchreserve" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-blue-600 rounded-full transition-colors duration-300"
                  >
                    <Facebook size={24} />
                  </a>
                  <a 
                    href="https://instagram.com/pitchreserve" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-pink-600 rounded-full transition-colors duration-300"
                  >
                    <Instagram size={24} />
                  </a>
                  <a 
                    href="mailto:aayush7723@student.ku.edu.np"
                    className="p-2 hover:bg-red-600 rounded-full transition-colors duration-300"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};





  const Landing = () => {
    return (
      <div className="w-full pt-16">
        <TitleBar />
        {/* Main landing Section */}
        <div className="relative h-[600px] bg-black">
          <img
            src={heroimage}
            alt="lander"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold">YOUR NEAREST SPORTS COMMUNITY</h1>
            <p className="text-xl">IS JUST A TAP AWAY</p>
            <div className="mt-4">
              <button className="bg-green-500 px-4 py-2 rounded-full mr-2">To Book</button>
              <button className="bg-black-900 px-4 py-2 rounded-full">To Get Listed</button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex">
        <div className="w-1/2 bg-green-500 p-8  flex align-left">
          <div className="w-3/4 bg-green-500 p-8 justify-center items-center flex flex-col align-left">
            <h2 className="text-7xl font-bold text-black">PitchReserve.</h2>
            <h2 className="text-white">AVAILABLE IN MAJOR CITIES OF NEPAL</h2>
          </div>
          <div className="w-1/4 bg-green-500 p-12  flex items-center justify-center">
            <h6 className="text-black text-start">JOIN THE COMMUNITY & GUIDE YOUR WAY THROUGH THE PITCH</h6>
          </div>
        </div>

        <div className="w-1/2 bg-green-950 p-8">
          <img src={mapOfNepal} alt="Map of Nepal" className="w-full h-full object-cover" />
        </div>
        </div>
        

        {/* Features Section */}
        <div className="flex justify-around py-16 bg-white">
          <div className="text-center">
            
            <img src={searchicon} alt="search" className="mx-auto my-1 w-1/4 h-auto" />
              <h3 className="text-xl font-bold">Search</h3>
              <p>Are you looking to play after work, organize your Sunday Five's football match?
              Explore the network of sports facilities whole over the Nepal.</p>
            
          </div>
          <div className="text-center">
           
            <img src={bookicon} alt="book" className="mx-auto my-1 w-1/4 h-auto" />
              <h3 className="text-xl font-bold">Book</h3>
              <p>Once you’ve found the perfect futsal turf, Connect with the venue
              through the Book Now Button to make online booking & easy, secure payment</p>
          
          </div>
          <div className="text-center">
            <img src={playicon} alt="Play" className="mx-auto my-3 w-1/4 h-auto" />
              <h3 className="text-xl font-bold">Play</h3>
              <p>You’re the hero, you’ve found a stunning turf, booked with ease and now
              its time to play. The scene is set for your epic match.</p>
            </div>
        </div>

        {/* Subscription Section */}
  <div className="flex bg-pink-100">
    <div className="w-1/2 p-8 flex flex-col items-center justify-center">
      <img src={subscriptionImage} alt="Subscription" className="mx-auto my-4" />
    </div>
    <div className="w-1/2 p-8 flex flex-col items-end justify-center">
      <h2 className="text-5xl  font-bold text-black">SUBSCRIPTIONS</h2>
      <p className="text-xl mt-2">PLAY REGULAR, PAY LESS</p>
      <button className="bg-transparent py-2 px-4 rounded-full hover:bg-green-600 mt-4">
          View Subscriptions
        </button>
    </div>
  </div>
  <FeaturesSection/>
  <Footer/>

        </div>
    )
  };



export default Landing;



