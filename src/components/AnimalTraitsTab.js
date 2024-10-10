import React, { useState, useEffect } from 'react';
import AnimalCard from './AnimalCard';
import Popup from './TraitsPopup'; // Import the Popup component
import Toast from './Toast'; 
import { getAnimals, getCategoriesByAnimalId, getCategoriesBySpecies, updateAnimalCategories  } from '../apis/api'; 
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

const AnimalTraitsTab = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [animalCategories, setAnimalCategories] = useState([]);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // Filter for species
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order for animal names
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchAnimals();
  }, []); // Fetch animals only on component mount

  useEffect(() => {
    applyFilters();
  }, [filter, searchQuery, animals, sortOrder]); 
  // Fetch animals
  const fetchAnimals = async () => {
    try {
      setLoading(true); // Start loading
      const fetchedAnimals = await getAnimals(); // Fetch data from the API
      setAnimals(fetchedAnimals); // Set all animals
      setFilteredAnimals(fetchedAnimals); // Initially display all fetched animals
    } catch (error) {
      console.error('Error fetching animals:', error);
      setError('Failed to load animals'); // Set an error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Apply filters and search
  useEffect(() => {
    applyFilters();
  }, [filter, searchQuery, animals]); // Run on filter, search query, or animals change

  const applyFilters = () => {
    let updatedAnimals = animals;

    // Apply species filter
    if (filter !== 'all') {
      updatedAnimals = updatedAnimals.filter(animal => animal.species.toLowerCase() === filter.toLowerCase());
    }

    // Apply search filter
    if (searchQuery) {
      updatedAnimals = updatedAnimals.filter(animal =>
        animal.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting using localeCompare for string comparison
    updatedAnimals.sort((a, b) => {
      return sortOrder === 'desc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    // Log sorted animals for debugging
    console.log('Sorted Animals:', updatedAnimals);

    setFilteredAnimals(updatedAnimals);
  };

  const getSpeciesCounts = () => {
    const speciesCounts = {
      all: animals.length,
      dog: animals.filter(animal => animal.species.toLowerCase() === 'dog').length,
      cat: animals.filter(animal => animal.species.toLowerCase() === 'cat').length,
    };
    return speciesCounts;
  };

  const speciesCounts = getSpeciesCounts();

  // Function to open the popup when an animal card is clicked
  const handleAnimalClick = async (animal) => {
    setSelectedAnimal(animal);
    setIsPopupOpen(true); // Open popup

    try {
      const animalCategories = await getCategoriesByAnimalId(animal.id);
      setAnimalCategories(animalCategories.map(category => category.id)); // Extract category IDs
    } catch (error) {
      console.error('Error fetching animal categories:', error);
    }
    
    const categoriesBySpecies = await getCategoriesBySpecies(animal.species);
    setAllCategories(categoriesBySpecies);
  };

  // Close the popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAnimal(null);
  };

  // Toggle categories for the selected animal
  const handleCategoryToggle = (categoryId) => {
    setAnimalCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  // Handle saving edited categories (Currently placeholder)
  const handleSaveCategories = async () => {
    try {
      await updateAnimalCategories(selectedAnimal.id, animalCategories);
      setToastMessage('Animal categories updated successfully!'); // Set success message
      handleClosePopup();
    } catch (error) {
      console.error('Error updating animal categories:', error);
    }
  };
  const closeToast = () => {
    setToastMessage(''); // Clear the toast message after 3 seconds
  };


  if (loading) {
    return <p>Loading animals...</p>;
  }

  // Show an error message if something went wrong
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-sc mb-4">Manage the Animal's Traits</h2>
      
      <div className="flex space-x-4 mb-6 items-center">
        {/* Filter by Species */}
        <button
          className={`px-2 py-2 rounded-lg ${filter === 'all' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('all')}
        >
          All ({speciesCounts.all})
        </button>
        <button
          className={`px-2 py-2 rounded-lg ${filter === 'dog' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('dog')}
        >
          Dogs ({speciesCounts.dog})
        </button>
        <button
          className={`px-2 py-2 rounded-lg ${filter === 'cat' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('cat')}
        >
          Cats ({speciesCounts.cat})
        </button>

        {/* Search Input */}
        <div className="flex items-center border border-sc rounded-lg">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-1 py-2 outline-none bg-pr text-sc rounded-lg"
          />
          <FaSearch className="text-sc  cursor-pointer" />
        </div>

        {/* Sort Button */}
       <button
          className="px-2 py-2 bg-sc text-pr rounded-lg hover:bg-st flex items-center"
          onClick={() => setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))}
        >
          Sort by Name {sortOrder === 'asc' ? <FaSortAlphaDown className="ml-2" /> : <FaSortAlphaUp className="ml-2" />}
        </button>
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} onClick={() => handleAnimalClick(animal)} />
          ))
        ) : (
          <p>No animals available.</p>
        )}
      </div>

      {/* Popup for Editing Categories */}
      {selectedAnimal && (
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          animal={selectedAnimal}
          allCategories={allCategories}
          animalCategories={animalCategories}
          handleCategoryToggle={handleCategoryToggle}
          handleSaveCategories={handleSaveCategories}
        />
      )}
      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </div>
  );
};

export default AnimalTraitsTab;
