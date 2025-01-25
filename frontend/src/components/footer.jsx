const Footer = () => {
    return (
      <footer className="bg-[#0a0d14] text-white py-12 flex">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex items-center space-x-4">
            <Link to="/login" className="relative">
              <img 
                src={logo}
                alt="logo"
                className="h-100 w-auto transition-transform duration-200 hover:brightness-110"
              />
            </Link>
              <p className="text-m">Nepal's Only<br/>Futsal Venue<br/>Booking System</p>
            </div>
            
            <nav className="">
                  <ul className="space-y-0">
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
            
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Contact Us</h3>
              <ul className="space-y-2">
                <li>Pitch Reserve</li>
                <li>Kathmandu University</li>
                <li>+977 9741740551</li>
                <li>info@pitchreserve.com.np</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                {[
                  { Icon: Facebook, href: 'https://facebook.com/pitchreserve' },
                  { Icon: Instagram, href: 'https://instagram.com/pitchreserve' },
                  { Icon: Mail, href: 'mailto:info@pitchreserve.com.np' }
                ].map(({ Icon, href }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="hover:text-green-500 transition-colors"
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;
  