import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/AnimalCard';
import CustomButton from '../components/CustomButton';
import Popup from '../components/Popup'; // Import the Popup component
import { getAnimals } from '../apis/api';

const AdoptCat = () => {
  const [animals, setAnimals] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null); // Define selectedAnimal state

  const options = [
    "Is energetic and playful",
    "Is easy going",
    "Has special needs",
    "Doesn't shed too much",
    "Is dog friendly",
    "Is good with other cats",
    "Is kid friendly",
    "Can be left alone"
  ];

  useEffect(() => {
    const fetchAnimals = async () => {
      // Fetch all animals from the API
      const fetchedAnimals = await getAnimals();

      // Filter out only the cats
      const catAnimals = fetchedAnimals.filter(animal => 
        animal.species.toLowerCase() === 'cat' && 
        animal.status.toLowerCase() === 'available'
      );

      // Update state with the filtered list
      setAnimals(catAnimals);
      setFilteredAnimals(catAnimals);
    };

    fetchAnimals();
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const filterAnimals = (option) => {
    const filtered = animals.filter(animal => animal.attributes.includes(option));
    setFilteredAnimals(filtered);
    setDropdownOpen(false);
  };

  const handleCardClick = (animal) => {
    setSelectedAnimal(animal); // Set selected animal for the popup
  };

  const handleClosePopup = () => {
    setSelectedAnimal(null); // Close the popup
  };

  return (
    <div className="min-h-screen bg-pr py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-sc mb-8">Cute Kittens & Cats</h1>

        {/* Dropdown Filter */}
        <div className="w-full max-w-xl mx-auto mb-8 pb-4">
          <button
            className="w-full p-3 rounded-xl border border-st shadow-md bg-white text-sc text-left cursor-pointer flex justify-between items-center"
            onClick={handleDropdownToggle}
          >
            {"I'm looking for a cat that..."}
            <svg
              className={`w-6 h-6 text-brown-800 transform ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div
            className={`transition-all duration-500 ease-out ${dropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
          >
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2 py-2">
              {options.map((option, index) => (
                <CustomButton
                  key={index}
                  onClick={() => filterAnimals(option)}
                  className={`transition-delay-${index * 50}ms`}
                  style={{
                    opacity: dropdownOpen ? '1' : '0',
                    transform: dropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
                    pointerEvents: dropdownOpen ? 'auto' : 'none',
                  }}
                >
                  {option}
                </CustomButton>
              ))}
            </div>
          </div>
        </div>

        {/* Cat Profiles */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                onClick={() => handleCardClick(animal)} // Add onClick handler to open popup
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-lg text-br">No cats available for adoption at the moment.</p>
          )}
        </div>

        {/* Popup for Cat Details */}
        <Popup
          isOpen={selectedAnimal !== null} // Open popup if an animal is selected
          onClose={handleClosePopup} // Close the popup
          animal={selectedAnimal} // Pass the selected animal to the popup
        />
      </div>
    </div>
  );
};

export default AdoptCat;
