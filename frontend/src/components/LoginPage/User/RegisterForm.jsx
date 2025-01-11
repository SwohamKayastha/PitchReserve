import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { Mail, User, Lock } from 'lucide-react';
import { registerUser } from '../../../api/auth';

const RegisterUserForm = ({ isOwner }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isOwner: isOwner,
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await registerUser(formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="registerEmail">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input id="registerEmail" name="email" type="email" placeholder="Enter your email" className="pl-10 h-12" onChange={handleInputChange} required />
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="registerUsername">Username</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input id="registerUsername" name="username" placeholder="Choose a username" className="pl-10 h-12" onChange={handleInputChange} required />
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="registerPassword">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input id="registerPassword" name="password" type="password" placeholder="Create a password" className="pl-10 h-12" onChange={handleInputChange} required />
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" className="pl-10 h-12" onChange={handleInputChange} required />
        </div>
      </div>
      {error && <Alert variant="destructive">{error}</Alert>}
      <Button type="submit" className="w-full bg-green-900 hover:bg-green-700 h-12 text-lg font-medium">
        Create Account
      </Button>
    </form>
  );
};

export default RegisterUserForm;