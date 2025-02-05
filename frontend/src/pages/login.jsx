import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Link, useLocation } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Building2, X, Menu } from "lucide-react";
import logo from "../assets/logo.png"
import RegisterUserForm from "../components/LoginPage/User/RegisterForm";
import LoginUserForm from "../components/LoginPage/User/LoginUserForm";
import RegisterOwnerForm from "../components/LoginPage/Owner/RegisterOwnerForm";
import LoginOwnerForm from "../components/LoginPage/Owner/LoginOwnerForm";

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
        {/* <motion.div
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
        </motion.div> */}

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
                <X size={24} />
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

const LoginPage = () => {
  const location = useLocation();
  const fromPartnership = location.state?.fromPartnership || false;

  const [activeTab, setActiveTab] = useState("register");
  const [isOwner, setIsOwner] = useState(fromPartnership || false);

  const handleSwitchChange = (checked) => {
    setIsOwner(checked);
  };

  return (
    <div className="flex flex-col  bg-gradient-to-b from-green-50/80 to-green-100/80 ">
      <TitleBar />
      <div className="inset-0 flex items-center justify-center scroll mt-20 w-full min-h-screen">
        <div className="w-full max-w-md px-0">
          <Card className="shadow-xl bg-green-50/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome to Pitch Reserve
              </h2>
              <p className="text-gray-600">
                {activeTab !== "login"
                  ? "Create your account"
                  : "Sign in to your account"}
              </p>
              <div className="flex items-center justify-center space-x-4 p-4 bg-green-100 rounded-lg">
                <span
                  className={`text-sm font-medium ${
                    !isOwner ? "text-green-900" : "text-gray-500"
                  }`}
                >
                  <b>Customer</b>
                </span>
                <Switch
                  id="user-type"
                  checked={isOwner}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-green-900"
                />
                <span
                  className={`text-sm font-medium ${
                    isOwner ? "text-green-900" : "text-gray-500"
                  }`}
                >
                  <b>Venue Owner</b>
                </span>
                <Building2
                  className={`h-5 w-5 ${
                    isOwner ? "text-green-900" : "text-gray-400"
                  }`}
                />
              </div>
              <p className="text-gray-600">
                {isOwner
                  ? "Access your venue management dashboard"
                  : "Book your favorite futsal venues"}
              </p>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-green-100 rounded-lg">
                  <TabsTrigger value="register">Register</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                {/* <TabsContent value="register">
                  <RegisterForm isOwner={isOwner} />
                </TabsContent> */}

                <TabsContent value="register">
                  {isOwner ? <RegisterOwnerForm /> : <RegisterUserForm />}
                </TabsContent>

                {/* <TabsContent value="login">
                  <LoginForm isOwner={isOwner} />
                </TabsContent> */}

                <TabsContent value="login">
                  {isOwner ? <LoginOwnerForm /> : <LoginUserForm />}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;