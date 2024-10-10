import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/AnimalCard';
import CustomButton from '../components/CustomButton';
import Popup from '../components/Popup'; // Import the Popup component
import { getAnimals, filterAnimals, getCategoriesBySpecies } from '../apis/api'; // Import getCategoriesBySpecies

const AdoptCat = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]); // State for active filters
  const [filterOptions, setFilterOptions] = useState([]); // State for filter options

  // Fetch filter options from API based on species
  useEffect(() => {
    const fetchFilterOptions = async () => {
      const options = await getCategoriesBySpecies('cat'); // Fetch categories for cats
      setFilterOptions(options.map(option => option.name)); // Assuming options are in the format {id, name}
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchAnimals = async () => {
      const fetchedAnimals = await getAnimals();
      const catAnimals = fetchedAnimals.filter(
        (animal) => animal.species.toLowerCase() === 'cat' && animal.status.toLowerCase() === 'available'
      );
      setAnimals(catAnimals);
      setFilteredAnimals(catAnimals);
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
      species: 'cat',
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
              {filterOptions.map((option, index) => (
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
          mode="adopt"
        />
      </div>
    </div>
  );
};

export default AdoptCat;
