import React from 'react';
import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="flex flex-col items-center">
        <Loader className="animate-spin h-10 w-10 text-blue-600" />
        <p className="mt-4 text-lg text-gray-600">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;