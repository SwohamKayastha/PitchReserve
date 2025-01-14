import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { User, Lock } from 'lucide-react';
import { loginOwner } from '../../../api/auth';

const LoginOwnerForm = () => {
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
      await loginOwner(formData);
      alert('Login successful!');
      navigate('/ownerProfile');
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="loginUsername">Username</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            id="loginUsername" 
            name="username" 
            placeholder="Enter your username" 
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
        Sign In as Owner
      </Button>
    </form>
  );
};

export default LoginOwnerForm;