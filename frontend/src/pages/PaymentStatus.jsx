import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/playerProfile'); // Or wherever you want to redirect after success
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p>Your booking has been confirmed.</p>
        <p className="text-sm text-gray-500 mt-2">Redirecting to your profile...</p>
      </div>
    </div>
  );
};

export const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/toBook'); // Or wherever you want to redirect after failure
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p>Something went wrong with your payment.</p>
        <p className="text-sm text-gray-500 mt-2">Redirecting to booking page...</p>
      </div>
    </div>
  );
};