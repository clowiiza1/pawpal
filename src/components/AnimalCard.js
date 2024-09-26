import React from 'react';
import dogImg from './dog.jpg';
import catImg from './cat.jpg';

const AnimalCard = ({ animal, onClick }) => {
  // Determine the type based on species and age
  const determineType = (species, age) => {
    if (species.toLowerCase() === 'dog') {
      if (age <= 1) return 'Puppy';
      if (age <= 7) return 'Adult';
      return 'Senior';
    } else if (species.toLowerCase() === 'cat') {
      if (age <= 1) return 'Kitten';
      if (age <= 7) return 'Adult';
      return 'Senior';
    }
    return 'Unknown'; // Fallback in case species is neither dog nor cat
  };

  const animalType = determineType(animal.species, animal.age);
  const imageUrl = animal.imageUrl || (animal.species.toLowerCase() === 'dog' ? dogImg : catImg);

  // Determine background and text color based on animal type
  const bgColor =
    animalType === 'Puppy' || animalType === 'Kitten' ? 'bg-c1' :
    animalType === 'Adult' ? 'bg-c2' :
    animalType === 'Senior' ? 'bg-c3' : 'bg-gray-400'; // Fallback color

  const textColor = 'text-sc';

  return (
    <div
      onClick={() => onClick(animal)} // Pass the animal object to the onClick handler
      className="bg-sc rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={animal.name}
          className="w-full h-56 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105" // Apply zoom effect on hover
        />
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h2 className="text-2xl font-semibold text-pr mb-1 h-10 overflow-hidden text-center">{animal.name}</h2>
        <p className="text-pr text-l mb-4 h-24 overflow-hidden text-center">{animal.description || 'No description available'}</p>
        <div className="flex justify-center mt-auto">
          <span className={`inline-block px-3 py-1 rounded-full text-m font-medium ${bgColor} ${textColor}`}>
            {animalType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
