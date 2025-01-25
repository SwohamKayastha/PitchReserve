import React from 'react';
import { LogOut, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const SessionExpired = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <LogOut className="h-16 w-16 text-red-500" />
            <AlertCircle className="h-8 w-8 text-red-500 absolute -top-2 -right-2 bg-white rounded-full" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Session Expired</h1>
        
        <p className="text-gray-600 mb-8">
          Your login session has expired. Please sign in again to continue.
        </p>
        
        <button
          onClick={handleRedirect}
          className="inline-flex items-center justify-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700  transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign In Again
        </button>
      </div>
    </div>
  );
};

export default SessionExpired;