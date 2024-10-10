import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { checkIfAdopterSuitabilityExists,getCategoriesBySpecies, getCategoriesByAnimalId } from '../apis/api'; // Import the API function
import dogImg from '../components/dog.jpg';
import catImg from '../components/cat.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyringe, faNeuter, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const Popup = ({ isOpen, onClose, animal, onDelete, onSave, mode }) => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [isEditing, setIsEditing] = useState(false);
  const [editableAnimal, setEditableAnimal] = useState(animal);
  const [allCategories, setAllCategories] = useState([]);
  const [animalCategories, setAnimalCategories] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const species = animal?.species || ''; 

  useEffect(() => {
    if (isOpen) {
      fetchAnimalCategories();
      fetchAllCategories();
    }
  }, [isOpen]);
  if (!isOpen || !animal) return null; // Only render when the popup is open and animal is defined

  // Safely access animal fields with fallback values
  const imageUrl = animal.imageUrl || (animal.species.toLowerCase() === 'dog' ? dogImg : catImg); // Fallback image URL if no image
  const animalName = animal.name || 'Unknown Animal';
  const description = animal.description || 'No description available';
  const gender = animal.gender || 'Unknown';
  const age = animal.age || 'Unknown';
  const breed = animal.breed || 'Unknown';
  const weight = animal.weight || 'Unknown';

 

  const fetchAnimalCategories = async () => {
    try {
      const categories = await getCategoriesByAnimalId(animal.id);
      setAnimalCategories(categories.map((cat) => cat.name));
    } catch (error) {
      console.error('Error fetching animal categories:', error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const categories = await getCategoriesBySpecies(species);
      setAllCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryToggle = (categoryName) => {
    setAnimalCategories((prevCategories) =>
      prevCategories.includes(categoryName)
        ? prevCategories.filter((cat) => cat !== categoryName)
        : [...prevCategories, categoryName]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(editableAnimal);
    setIsEditing(false);
  };

  const handleAdoptClick = async () => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Animal ID:', animal.id);
      navigate('/login'); // Redirect to login if not logged in
      return;
    }


    try {
      // Extract username from the token (assuming JWT with username payload)
      const username = extractUsernameFromToken(token);

      // Call the API function from api.js
      const suitabilityExists = await checkIfAdopterSuitabilityExists(username);
     
      if (suitabilityExists) {
        // If suitability exists, navigate to the adoption booking page
      
        navigate('/adoptbooking', { state: { animalId: animal.id } });
      } else {
        navigate('/adopterinfo', { state: { animalId: animal.id } });
      }
    } catch (error) {
      console.error('Error checking adopter suitability:', error);
    }
  };

  const confirmDeleteAnimal = () => {
    onDelete(); // Confirm delete
    setShowDeleteConfirm(false); // Close delete confirmation
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false); // Close delete confirmation
  };
  

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true); // Show delete confirmation
  };

  const extractUsernameFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub; // Adjust based on your token structure, usually 'sub' for username
    } catch (error) {
      console.error('Error extracting username from token:', error);
      return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-pr p-8 rounded-lg shadow-lg w-3/4 max-w-5xl flex relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-200 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Animal Image */}
        <div className="w-1/2 p-4">
        <img src={imageUrl} alt={animalName} className="w-96 h-80 object-cover rounded-lg" />
        {/* Display the categories below the image */}
        <div className="mt-4">
          <h4 className="text-xl font-semibold mb-2">{animal.name}'s Traits:</h4>
          <div className="flex flex-wrap">
            {animalCategories.length > 0 ? (
              animalCategories.map((category, index) => (
                <span key={index} className="px-4 py-2 m-1 bg-st text-pr rounded-full">
                  {category}
                </span>
              ))
            ) : (
              <p>No categories available for this animal.</p>
            )}
          </div>
        </div>
      </div>

        {/* Animal Info Section */}
        <div className="w-2/3 p-6 bg-pr rounded-lg flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editableAnimal.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1"
                />
              ) : (
                `Meet ${animalName}`
              )}
            </h3>
            <p className="text-black mb-4 text-l">
              {isEditing ? (
                <textarea
                  name="description"
                  value={editableAnimal.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1"
                />
              ) : (
                description
              )}
            </p>

            

            {/* Animal Attributes */}
            <ul className="text-m">
              <li>
                <strong>Gender:</strong> {isEditing ? (
                  <input
                    type="text"
                    name="gender"
                    value={editableAnimal.gender}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender
                )}
              </li>
              <li>
                <strong>Age:</strong> {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={editableAnimal.age}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  age
                )}
              </li>
              <li>
                <strong>Breed:</strong> {isEditing ? (
                  <input
                    type="text"
                    name="breed"
                    value={editableAnimal.breed}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  breed
                )}
              </li>
              <li>
                <strong>Weight (kg):</strong> {isEditing ? (
                  <input
                    type="number"
                    name="weight"
                    value={editableAnimal.weight}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  weight
                )}
              </li>
            </ul>

            {/* Health Status Indicators */}
            <div className="mt-4 flex space-x-4 pb-6 pt-2">
              {animal.vaccinated && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-st rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faSyringe} className="text-white text-xl" />
                  </div>
                  <span className="mt-2 text-sm text-center text-br">Vaccinated</span>
                </div>
              )}
              {animal.sterile && (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-st rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faNeuter} className="text-white text-xl" />
                  </div>
                  <span className="mt-2 text-sm text-center text-br">Neutered</span>
                </div>
              )}
            </div>
          </div>

          {/* Conditional Rendering for Buttons */}
          {mode === 'adopt' ? (
            <button
              className="px-6 py-3 mr-auto font-poppins text-m rounded-lg bg-sc text-pr shadow-lg hover:bg-st transition duration-300"
              onClick={handleAdoptClick}
            >
              I Want To Adopt!
            </button>
          ) : (
            <div className="flex justify-end space-x-4 mt-6">
              {!isEditing ? (
                <>
                  <button
                    className="px-6 py-3 font-poppins text-m rounded-lg bg-blue-500 text-white shadow-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => setIsEditing(true)} // Enter edit mode
                  >
                    <FontAwesomeIcon icon={faPen} /> Edit
                  </button>
                  <button
                    className="px-6 py-3 font-poppins text-m rounded-lg bg-red-500 text-white shadow-lg hover:bg-red-700 transition duration-300"
                    onClick={handleDeleteClick}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </>
              ) : (
                <button
                  className="px-6 py-3 font-poppins text-m rounded-lg bg-green-500 text-white shadow-lg hover:bg-green-700 transition duration-300"
                  onClick={handleSaveClick} // Save the edited info
                >
                  Save
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-sc mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete{' '}
              <span className="font-semibold text-sc">{`${animal.name}`}</span>?
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={confirmDeleteAnimal}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-st text-pr rounded-lg hover:bg-sc"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
