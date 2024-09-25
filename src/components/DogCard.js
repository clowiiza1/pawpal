import React from 'react';
import dogImg from './dog.jpg';

const DogCard = ({ dog, onClick }) => {
  const determineType = (age) => {
    if (age <= 1) return 'Puppy';
    if (age <= 7) return 'Adult';
    return 'Senior';
  };

  const dogType = determineType(dog.age);

  return (
    <div onClick={onClick} className="bg-sc rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between cursor-pointer">
      <img src={dogImg} alt={dog.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h2 className="text-2xl font-semibold text-pr mb-2 h-10 overflow-hidden text-center">{dog.name}</h2>
        <p className="text-pr text-l mb-4 h-16 overflow-hidden text-center">{dog.description || 'No description available'}</p>
        <div className="flex justify-center mt-auto">
          <span className={`inline-block px-3 py-1 rounded-full text-m font-medium ${dogType === 'Puppy' ? 'bg-c1 text-sc' : dogType === 'Adult' ? 'bg-c2 text-sc' : 'bg-c3 text-sc'}`}>
            {dogType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
