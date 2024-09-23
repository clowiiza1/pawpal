import React from 'react';
import dogImg from './dog.jpg';

const DogCard = ({ dog }) => {
  // Determine dog type based on age
  const determineType = (age) => {
    if (age <= 1) {
      return 'Puppy';
    } else if (age <= 7) {
      return 'Adult';
    } else {
      return 'Senior';
    }
  };

  const dogType = determineType(dog.age);

  return (
    <div className="bg-sc rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      {/* Replace with actual image if available or a placeholder */}
      <img src={dogImg} alt={dog.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow justify-between">
        {/* Fixed height for name to maintain alignment */}
        <h2 className="text-2xl font-semibold text-pr mb-2 h-10 overflow-hidden text-center">{dog.name}</h2>
        
        {/* Fixed height for description to maintain alignment */}
        <p className="text-pr text-l mb-4 h-16 overflow-hidden text-center">{dog.description || 'No description available'}</p>
        
        {/* Type Badge aligned at the bottom */}
        <div className="flex justify-center mt-auto">
          <span
            className={`inline-block px-3 py-1 rounded-full text-m font-medium ${
              dogType === 'Puppy'
                ? 'bg-c1 text-sc' // Custom class for Puppy
                : dogType === 'Adult'
                ? 'bg-c2 text-sc' // Custom class for Adult
                : 'bg-c3 text-sc' // Custom class for Senior
            }`}
          >
            {dogType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
