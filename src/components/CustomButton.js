import React from 'react';

const CustomButton = ({ onClick, children, className = '' }) => {
  return (
    <button
      className={`p-2 bg-sc text-pr text-xs rounded-full shadow-sm transition-all duration-300 ease-in-out 
                  hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
