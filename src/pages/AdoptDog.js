import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/AnimalCard';
import CustomButton from '../components/CustomButton';
import Popup from '../components/Popup';
import { getAnimals } from '../apis/api';

const AdoptDog = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null); // State for selected dog

  const options = [
    "Needs a home-based owner",
    "Can be left alone",
    "Is fine alone sometimes",
    "Is lead trained",
    "Is energetic",
    "Is easy going",
    "Has special needs",
    "Is good for novice owners",
    "Can learn tricks",
    "Doesn't shed too much",
    "Is cat friendly",
    "Is suited to apartment life",
    "Is good with other dogs",
    "Is kid friendly",
  ];

  useEffect(() => {
    const fetchAnimals = async () => {
      // Fetch all animals from the API
      const fetchedAnimals = await getAnimals();

      // Filter out only the dogs
      const dogAnimals = fetchedAnimals.filter(
        (animal) => animal.species.toLowerCase() === 'dog' && animal.status.toLowerCase() === 'available'
      );

      // Update state with the filtered list
      setAnimals(dogAnimals);
      setFilteredAnimals(dogAnimals);
    };

    fetchAnimals();
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const filterAnimals = (option) => {
    const filtered = animals.filter((animal) => animal.attributes.includes(option));
    setFilteredAnimals(filtered);
    setDropdownOpen(false);
  };

  const handleCardClick = (dog) => {
    setSelectedDog(dog); // Set the selected dog for the popup
  };

  const handleClosePopup = () => {
    setSelectedDog(null); // Reset the selected dog to close the popup
  };

  return (
    <div className="min-h-screen bg-pr py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-sc mb-8">Loveable Puppies & Dogs</h1>

        {/* Dropdown Filter */}
        <div className="w-full max-w-xl mx-auto mb-8 pb-4">
          <button
            className="w-full p-3 rounded-xl border border-st shadow-md bg-white text-sc text-left cursor-pointer flex justify-between items-center"
            onClick={handleDropdownToggle}
          >
            {"I'm looking for a dog that..."}
            <svg className={`w-6 h-6 transform ${dropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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
                >
                  {option}
                </CustomButton>
              ))}
            </div>
          </div>
        </div>

        {/* Dog Profiles */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                onClick={() => handleCardClick(animal)} // Pass the clicked animal to the handler
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-lg text-br">No dogs available for adoption at the moment.</p>
          )}
        </div>

        {/* Popup for Dog Details */}
        <Popup
          isOpen={selectedDog !== null} // Show popup if a dog is selected
          onClose={handleClosePopup} // Handler to close the popup
          animal={selectedDog} // Pass the selected dog to the popup
        />
      </div>
    </div>
  );
};

export default AdoptDog;
