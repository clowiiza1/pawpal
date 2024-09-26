import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/AnimalCard';
import CustomButton from '../components/CustomButton';
import Popup from '../components/Popup';
import { getAnimals, filterAnimals } from '../apis/api';

const AdoptDog = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]); // State for active filters

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
      const dogAnimals = fetchedAnimals.filter(
        (animal) => animal.species.toLowerCase() === 'dog' && animal.status.toLowerCase() === 'available'
      );
      setAnimals(dogAnimals);
      setFilteredAnimals(dogAnimals);
    };
    fetchAnimals();
  }, []);

  // Update the filter list whenever activeFilters state changes
  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredAnimals(animals); // Show all animals if no filters are selected
    } else {
      applyFilter(); // Apply filters
    }
  }, [activeFilters]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Apply filters and update the filteredAnimals state
  const applyFilter = async () => {
    const filterData = {
      species: 'dog',
      categories: activeFilters,
    };

    const filtered = await filterAnimals(filterData);
    setFilteredAnimals(filtered);
  };

  // Toggle filter state and update the activeFilters array
  const handleFilterClick = (option) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(option)
        ? prevFilters.filter((filter) => filter !== option)
        : [...prevFilters, option]
    );
  };

  const handleCardClick = (dog) => {
    setSelectedDog(dog);
  };

  const handleClosePopup = () => {
    setSelectedDog(null);
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
                  onClick={() => handleFilterClick(option)}
                  isActive={activeFilters.includes(option)} // Pass isActive prop
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
                onClick={() => handleCardClick(animal)}
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-lg text-br">No dogs available for adoption at the moment.</p>
          )}
        </div>

        <Popup
          isOpen={selectedDog !== null}
          onClose={handleClosePopup}
          animal={selectedDog}
        />
      </div>
    </div>
  );
};

export default AdoptDog;
