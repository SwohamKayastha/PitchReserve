import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { User, Lock, AlertCircle } from 'lucide-react';
import { loginUser } from '../../../api/auth';
import { motion } from 'framer-motion';

const LoginUserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      alert('Login successful!');
      navigate('/playerProfile');
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="shadow-xl bg-green-50/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Customer Login
          </CardTitle>
          <CardDescription className="text-gray-600">
            Book your favorite futsal venues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginUsername" className="text-gray-700">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    id="loginUsername" 
                    name="username" 
                    placeholder="Enter your username" 
                    className="pl-10 h-12 bg-white border-gray-300 focus:ring-green-500 focus:border-green-500" 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loginPassword" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    id="loginPassword" 
                    name="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    className="pl-10 h-12 bg-white border-gray-300 focus:ring-green-500 focus:border-green-500" 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-green-900 hover:bg-green-700 h-12 text-lg font-medium transition-colors duration-300"
            >
              Sign In as Customer
            </Button>

            <div className="text-center mt-4">
              <a href="/forgotPassword" className="text-green-900 hover:underline text-sm">
                Forgot Password?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoginUserForm;