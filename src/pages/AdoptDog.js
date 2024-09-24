import React, { useEffect, useState } from 'react';
import DogCard from '../components/DogCard';
import CustomButton from '../components/CustomButton'; // Import the new CustomButton component
import { getAnimals } from '../apis/api';

const AdoptDog = () => {
  const [animals, setAnimals] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredAnimals, setFilteredAnimals] = useState([]);

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
      const fetchedAnimals = await getAnimals();
      setAnimals(fetchedAnimals);
      setFilteredAnimals(fetchedAnimals);
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

  return (
    <div className="min-h-screen bg-pr py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-sc mb-8">Loveable Puppies & Dogs</h1>
        
        {/* Dropdown Filter */}
        <div className="w-full max-w-xl mx-auto mb-8">
          <button
            className="w-full p-3 rounded-xl border border-gray-300 shadow-md bg-white text-gray-700 text-left cursor-pointer flex justify-between items-center"
            onClick={handleDropdownToggle}
          >
            {"I'm looking for a dog that..."}
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
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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

        {/* Dog Profiles */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal) => (
              <DogCard key={animal.id} dog={animal} />
            ))
          ) : (
            <p className="text-center col-span-3 text-lg text-br">No dogs available for adoption at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptDog;
