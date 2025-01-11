import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Building2, X, Menu } from 'lucide-react';
import logo from '../assets/logo.png';
import RegisterUserForm from '../components/LoginPage/User/RegisterForm';
import LoginUserForm from '../components/LoginPage/User/LoginUserForm';
import RegisterOwnerForm from '../components/LoginPage/Owner/RegisterOwnerForm';
import LoginOwnerForm from '../components/LoginPage/Owner/LoginOwnerForm';

const TitleBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-1 z-50 bg-white shadow-md">
      <div className="flex items-center">
        <button className="flex items-center bg-transparent hover:bg-gray-100 rounded-lg">
          <div className="relative h-10 w-auto p-0">
            <a href='/'>
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto"
                style={{
                  filter: 'brightness(1) contrast(1)',
                  backgroundColor: 'transparent'
                }}
              />
            </a>
          </div>
        </button>
      </div>
      <div className="relative">
        <button 
          className="p-2 text-black bg-transparent hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
                  { name: 'About Us', path: '/aboutUs' },
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
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

const LoginPage = () => {
  const location = useLocation();
  const fromPartnership = location.state?.fromPartnership || false;

  const [activeTab, setActiveTab] = useState('register');
  const [isOwner, setIsOwner] = useState(fromPartnership || false);

  const handleSwitchChange = (checked) => {
    setIsOwner(checked);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-green-50/80 to-green-100/80 relative"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <TitleBar />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-full max-w-md px-0 py-8 mt-16">
          <Card className="shadow-xl bg-green-50/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome to Pitch Reserve</h2>
              <p className="text-gray-600">
                {activeTab !== 'login' ? 'Create your account' : 'Sign in to your account'}
              </p>
              <div className="flex items-center justify-center space-x-4 p-4 bg-green-100 rounded-lg">
                <span className={`text-sm font-medium ${!isOwner ? 'text-green-900' : 'text-gray-500'}`}>
                  Customer
                </span>
                <Switch
                  id="user-type"
                  checked={isOwner}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-green-900"
                />
                <span className={`text-sm font-medium ${isOwner ? 'text-green-900' : 'text-gray-500'}`}>
                  Venue Owner
                </span>
                <Building2 className={`h-5 w-5 ${isOwner ? 'text-green-900' : 'text-gray-400'}`} />
              </div>
              <p className="text-gray-600">
                {isOwner 
                  ? "Access your venue management dashboard" 
                  : "Book your favorite futsal venues"}
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom'
// import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {Checkbox } from '@/components/ui/checkbox';
// import { Alert } from '@/components/ui/alert';
// import { Lock, Mail, User, X, Menu } from 'lucide-react';
// import { Switch } from '@/components/ui/switch';

// import logo from '../assets/logo.png';
// import loginBg from '../assets/loginBg.jpg';

// import { Building2 } from 'lucide-react';

// const TitleBar = () => {
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => setMenuOpen(!isMenuOpen);

//   return (
//     <div className="fixed top-0 left-0 w-full flex justify-between items-center p-1 z-50 bg-white shadow-md">
//       <div className="flex items-center">
//         <button className="flex items-center bg-transparent hover:bg-gray-100 rounded-lg">
//           <div className="relative h-10 w-auto p-0">
//             <a href='/'>
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className="h-10 w-auto"
//                 style={{
//                   filter: 'brightness(1) contrast(1)',
//                   backgroundColor: 'transparent'
//                 }}
//               />
//             </a>
//           </div>
//         </button>
//       </div>
//       <div className="relative">
//         <button 
//           className="p-2 text-black bg-transparent hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none" 
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>

//         <div 
//           className={`fixed right-0 top-0 w-64 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
//             isMenuOpen ? 'translate-x-0' : 'translate-x-full'
//           } z-50`}
//         >
//           <div className="flex flex-col p-4">
//             <button 
//               onClick={toggleMenu}
//               className="self-end p-2 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
//               aria-label="Close menu"
//             >
//               <X size={24} />
//             </button>
//             <nav className="mt-8">
//               <ul className="space-y-4">
//                 {[
//                   { name: 'Home', path: '/' },
//                   { name: 'About Us', path: '/about' },
//                   { name: 'Book Venue', path: '/book' },
//                   { name: 'Login/ Partnership', path: '/Partnership' },
//                   { name: 'Subscriptions', path: '/subscriptions' },
//                   { name: 'Blogs', path: '/blogs' }
//                 ].map((item) => (
//                   <li key={item.name}>
//                     <Link
//                       to={item.path}
//                       className="block px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
//                     >
//                       {item.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//       {isMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={toggleMenu}
//         />
//       )}
//     </div>
//   );
// };

// const LoginPage = () => {

//   const location = useLocation();

//   const fromPartnership = location.state?.fromPartnership || false; // Check if coming from Partnership

//   const [activeTab, setActiveTab] = useState('register');
//   // const [isOwner, setIsOwner] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     isOwner: fromPartnership || false,
//   });
//   const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//     if (e.target.name === 'isOwner') {
//       setIsOwner(e.target.checked);
//     }
//     setError('');
//   };

//   const handleSwitchChange = (checked) => {
//     setFormData(prev => ({
//       ...prev,
//       isOwner: checked
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (activeTab === 'register' && formData.password !== formData.confirmPassword) {
//       setError("Passwords don't match");
//       return;
//     }
//     else {
//       alert('Form submitted successfully!');

//     }
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-b from-green-50/80 to-green-100/80 relative"
//       style={{
//         //backgroundImage: `url(${loginBg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         minHeight: '100vh',
//         width: '100vw',
//       }}
//     >
//       <TitleBar />
//       <div className="fixed inset-0 flex items-center justify-center">
//         <div className="w-full max-w-md px-0 py-8 mt-16">
//           <Card className="shadow-xl bg-green-50/80 backdrop-blur-sm">
//             <CardHeader className="text-center space-y-4 pb-8">
//               <h2 className="text-3xl font-bold text-gray-900">Welcome to Pitch Reserve</h2>
//               <p className="text-gray-600">
//                 {activeTab != 'login' ? 'Create your account' : 'Sign in to your '}
//               </p>
//               <div className="flex items-center justify-center space-x-4 p-4 bg-green-100 rounded-lg">
//                 <span className={`text-sm font-medium ${!formData.isOwner ? 'text-green-900' : 'text-gray-500'}`}>
//                   Customer
//                 </span>
//                 <Switch
//                   id="user-type"
//                   checked={formData.isOwner}
//                   onCheckedChange={handleSwitchChange}
//                   className="data-[state=checked]:bg-green-900"
//                 />
//                 <span className={`text-sm font-medium ${formData.isOwner ? 'text-green-900' : 'text-gray-500'}`}>
//                   Venue Owner
//                 </span>
//                 <Building2 className={`h-5 w-5 ${formData.isOwner ? 'text-green-900' : 'text-gray-400'}`} />
//               </div>
//               <p className="text-gray-600">
//                 {formData.isOwner 
//                   ? "Access your venue management dashboard" 
//                   : "Book your favorite futsal venues"}
//               </p>
//             </CardHeader>
//             <CardContent>
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                 <TabsList className="grid w-full grid-cols-2 mb-8 bg-green-100 rounded-lg">
                  
//                   <TabsTrigger value="register">Register</TabsTrigger>
//                   <TabsTrigger value="login">Login</TabsTrigger>
                  
//                 </TabsList>
                
//                 <TabsContent value="register">
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="space-y-3">
//                       <Label htmlFor="registerEmail">Email</Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         <Input id="registerEmail" name="email" type="email" placeholder="Enter your email" className="pl-10 h-12" onChange={handleInputChange} required />
//                       </div>
//                     </div>
//                     <div className="space-y-3">
//                       <Label htmlFor="registerUsername">Username</Label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         <Input id="registerUsername" name="username" placeholder="Choose a username" className="pl-10 h-12" onChange={handleInputChange} required />
//                       </div>
//                     </div>
//                     <div className="space-y-3">
//                       <Label htmlFor="registerPassword">Password</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         <Input id="registerPassword" name="password" type="password" placeholder="Create a password" className="pl-10 h-12" onChange={handleInputChange} required />
//                       </div>
//                     </div>
//                     <div className="space-y-3">
//                       <Label htmlFor="confirmPassword">Confirm Password</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" className="pl-10 h-12" onChange={handleInputChange} required />
//                       </div>
//                     </div>
//                     {error && <Alert variant="destructive">{error}</Alert>}
//                     {/* <div className="p-4 bg-green-100 rounded-lg border border-green-200 hover:bg-green-50 transition-colors duration-200">
//                       <div className="flex items-start space-x-3">
//                         <div className="flex items-center h-6">
//                           <Input
//                             id="isOwner"
//                             name="isOwner"
//                             type="checkbox"
//                             checked={formData.isOwner}
//                             className="w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-500"
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <Label htmlFor="isOwner" className="font-medium text-gray-900 block">
//                             Futsal Venue Owner
//                           </Label>
//                           <p className="text-sm text-gray-500">
//                             Register as a venue owner to list your facilities, manage bookings, and grow your business with our platform.
//                           </p>
//                         </div>
//                         <Building2 className="h-6 w-6 text-green-600 flex-shrink-0" />
//                       </div>
//                     </div> */}

//                     <Button type="submit" className="w-full bg-green-900 hover:bg-green-700 h-12 text-lg font-medium">
//                       Create Account
//                     </Button>
//                   </form>
//                 </TabsContent>

//                 <TabsContent value="login">
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="space-y-3">
//                       <Label htmlFor="loginEmail">Email</Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         <Input 
//                           id="loginEmail" 
//                           name="email" 
//                           type="email" 
//                           placeholder="Enter your email" 
//                           className="pl-10 h-12" 
//                           onChange={handleInputChange} 
//                           required 
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <Label htmlFor="loginPassword">Password</Label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                         <Input 
//                           id="loginPassword" 
//                           name="password" 
//                           type="password" 
//                           placeholder="Enter your password" 
//                           className="pl-10 h-12" 
//                           onChange={handleInputChange} 
//                           required 
//                         />
//                       </div>
//                     </div>

//                     <Button type="submit" className="w-full bg-green-900 hover:bg-green-700 h-12 text-lg font-medium">
//                       {formData.isOwner ? "Sign In as Venue Owner" : "Sign In"}
//                     </Button>
//                   </form>
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage; 