import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { Mail, Lock } from 'lucide-react';
import { loginUser } from '../../api/auth';

const LoginForm = ({ isOwner }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    try {
      await loginUser(formData);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="loginEmail">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            id="loginEmail" 
            name="email" 
            type="email" 
            placeholder="Enter your email" 
            className="pl-10 h-12" 
            onChange={handleInputChange} 
            required 
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="loginPassword">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            id="loginPassword" 
            name="password" 
            type="password" 
            placeholder="Enter your password" 
            className="pl-10 h-12" 
            onChange={handleInputChange} 
            required 
          />
        </div>
      </div>

      {error && <Alert variant="destructive">{error}</Alert>}
      <Button type="submit" className="w-full bg-green-900 hover:bg-green-700 h-12 text-lg font-medium">
        {isOwner ? "Sign In as Venue Owner" : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;