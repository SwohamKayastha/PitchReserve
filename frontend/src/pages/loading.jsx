import React from 'react';
import { FaFutbol } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="flex flex-col items-center">
        <div className="animate-bounce">
          <FaFutbol className="h-8 w-8 text-green-800 animate-[bounce-left-right_2s_linear_infinite]" />
        </div>
        <p className="mt-4 text-xl text-green-900">Loading ...</p>
      </div>
    </div>
  );
};

// Add custom animation using style tag
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce-left-right {
    0%, 100% {
      transform: translateX(-50px);
    }
    50% {
      transform: translateX(50px);
    }
  }
`;
document.head.appendChild(style);

export default Loading;