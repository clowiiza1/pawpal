import React from 'react';

const CustomButton = ({ onClick, children, className = '', isActive = false }) => {
  return (
    <button
      className={`p-2 text-xs rounded-full shadow-sm transition-all duration-300 ease-in-out 
                  hover:scale-105 ${isActive ? 'bg-st text-white' : 'bg-sc text-pr'} ${className}`}
      onClick={onClick}
    >
      {isActive ? (
        <span className="flex items-center justify-center">
          <span className="mr-2">{children}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
