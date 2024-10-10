import React, { useState, useEffect } from 'react';
import AnimalCard from './AnimalCard';
import Popup from './Popup'; // Import the Popup component
import { getAnimals, updateAnimal, deleteAnimal } from '../apis/api'; 
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaPlus } from 'react-icons/fa';
import Toast from './Toast'; 
import AddAnimalPopup from './AddAnimalPopup';

const AnimalsTab = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // Filter for animal species
  const [statusFilter, setStatusFilter] = useState('all'); // Filter for animal status
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order for animal names
  const [toastMessage, setToastMessage] = useState('');
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  useEffect(() => {
    fetchAnimals();
  }, []); // Fetch animals only on component mount

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
  }, [filter, statusFilter, searchQuery, sortOrder, animals]);  // Run on filter, status, search query, or animals change

  const applyFilters = () => {
    let updatedAnimals = animals;

    // Apply species filter
    if (filter !== 'all') {
      updatedAnimals = updatedAnimals.filter(animal => animal.species.toLowerCase() === filter.toLowerCase());
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      updatedAnimals = updatedAnimals.filter(animal => animal.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Apply search filter
    if (searchQuery) {
      updatedAnimals = updatedAnimals.filter(animal =>
        animal.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting using localeCompare for string comparison
    updatedAnimals.sort((a, b) => {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    setFilteredAnimals(updatedAnimals);
  };

  // Get the count of animals per filter category
  const getStatusCounts = () => {
    const statusCounts = {
      all: animals.length,
      available: animals.filter(animal => animal.status.toLowerCase() === 'available').length,
      adopted: animals.filter(animal => animal.status.toLowerCase() === 'adopted').length,
    };
    return statusCounts;
  };

  const getSpeciesCounts = () => {
    const speciesCounts = {
      all: animals.length,
      dog: animals.filter(animal => animal.species.toLowerCase() === 'dog').length,
      cat: animals.filter(animal => animal.species.toLowerCase() === 'cat').length,
    };
    return speciesCounts;
  };

  const statusCounts = getStatusCounts();
  const speciesCounts = getSpeciesCounts();

  // Function to open the popup when an animal card is clicked
  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
    setIsPopupOpen(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAnimal(null);
  };
  const openAddAnimalPopup = () => {
    setIsAddPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };


  const closeToast = () => {
    setToastMessage(''); // Clear the toast message after 3 seconds
  };
  // Handle saving edits to an animal
  const handleSaveAnimal = async (updatedAnimal) => {
    try {
      // Create a payload excluding the categories
      const formattedAnimal = {
        id: updatedAnimal.id,
        name: updatedAnimal.name,
        species: updatedAnimal.species,
        breed: updatedAnimal.breed,
        age: updatedAnimal.age,
        arrivalDate: updatedAnimal.arrivalDate, // Ensure it's properly formatted
        status: updatedAnimal.status,
        gender: updatedAnimal.gender,
        weight: updatedAnimal.weight,
        description: updatedAnimal.description,
        imageUrl: updatedAnimal.imageUrl,
        vaccinated: updatedAnimal.vaccinated,
        sterile: updatedAnimal.sterile,
        // Exclude categories here to avoid overwriting them
      };
  
      const savedAnimal = await updateAnimal(formattedAnimal);
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) => (animal.id === savedAnimal.id ? savedAnimal : animal))
      );
      applyFilters();
      handleClosePopup();
      setToastMessage('Animal details updated successfully!');
    } catch (error) {
      console.error('Error saving animal:', error);
    }
  };
  
  

  // Handle deleting an animal
  const handleDeleteAnimal = async () => {
    try {
      // Call the API to delete the animal by its ID
      await deleteAnimal(selectedAnimal.id);
  
      // Remove the deleted animal from the state
      setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal.id !== selectedAnimal.id));
      applyFilters(); // Apply filters again to update the displayed list
      handleClosePopup();
      setToastMessage('Animal deleted successfully!');
    } catch (error) {
      console.error('Error deleting animal:', error);
      setToastMessage('Failed to delete animal. Please try again.');
    }
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
      <h2 className="text-2xl font-bold text-sc mb-4">Animals</h2>
      
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

        {/* Filter by Status */}
        <button
          className={`px-2 py-2 rounded-lg ${statusFilter === 'available' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setStatusFilter('available')}
        >
          Available Animals ({statusCounts.available})
        </button>
        <button
          className={`px-2 py-2 rounded-lg ${statusFilter === 'adopted' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setStatusFilter('adopted')}
        >
          Adopted Animals ({statusCounts.adopted})
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
        {/* Add New Animal Card */}
        <div
          className="flex items-center justify-center border-2 border-dashed border-sc bg-pr text-sc h-full cursor-pointer rounded-lg"
          onClick={openAddAnimalPopup}
        >
          <FaPlus size={32} />
        </div>

        {/* Existing Animal Cards */}
        {filteredAnimals.length > 0 ? (
        filteredAnimals.map(animal => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onClick={() => handleAnimalClick(animal)}
          />
        ))
      ) : (
        <p>No animals available.</p>
      )}
      </div>
      {/* Popup for Editing/Deleting Animals */}
      {selectedAnimal && (
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          animal={selectedAnimal}
          onSave={handleSaveAnimal}
          onDelete={handleDeleteAnimal}
          mode="manage" // This makes it show edit and delete buttons instead of the adopt button
        />
      )}
      {isAddPopupOpen && (
        <AddAnimalPopup
          isOpen={isAddPopupOpen}
          onClose={handleCloseAddPopup}
          setAnimals={setAnimals} // Function to update the animal list after adding
        />
      )}
      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </div>
  );
};

export default AnimalsTab;
