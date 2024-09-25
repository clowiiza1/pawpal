import React from 'react';
import catImg from '../pages/header2.jpg';

const CatCard = ({ cat }) => {
  // Determine dog type based on age
  const determineType = (age) => {
    if (age <= 1) {
      return 'Kitten';
    } else if (age <= 7) {
      return 'Adult';
    } else {
      return 'Senior';
    }
  };

  const catType = determineType(cat.age);

  return (
    <div className="bg-sc rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      {/* Replace with actual image if available or a placeholder */}
      <img src={catImg} alt={cat.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow justify-between">
        {/* Fixed height for name to maintain alignment */}
        <h2 className="text-2xl font-semibold text-pr mb-2 h-10 overflow-hidden text-center">{cat.name}</h2>
        
        {/* Fixed height for description to maintain alignment */}
        <p className="text-pr text-l mb-4 h-16 overflow-hidden text-center">{cat.description || 'No description available'}</p>
        
        {/* Type Badge aligned at the bottom */}
        <div className="flex justify-center mt-auto">
          <span
            className={`inline-block px-3 py-1 rounded-full text-m font-medium ${
              catType === 'Puppy'
                ? 'bg-c1 text-sc' // Custom class for Puppy
                : catType === 'Adult'
                ? 'bg-c2 text-sc' // Custom class for Adult
                : 'bg-c3 text-sc' // Custom class for Senior
            }`}
          >
            {catType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
