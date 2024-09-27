import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { checkIfAdopterSuitabilityExists } from '../apis/api'; // Import the API function
import dogImg from '../components/dog.jpg';
import catImg from '../components/cat.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyringe, faNeuter } from '@fortawesome/free-solid-svg-icons';

const Popup = ({ isOpen, onClose, animal }) => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  if (!isOpen || !animal) return null; // Only render when the popup is open and animal is defined

  // Safely access animal fields with fallback values
  const imageUrl = animal.imageUrl || (animal.species.toLowerCase() === 'dog' ? dogImg : catImg); // Fallback image URL if no image
  const animalName = animal.name || 'Unknown Animal';
  const description = animal.description || 'No description available';
  const gender = animal.gender || 'Unknown';
  const age = animal.age || 'Unknown';
  const breed = animal.breed || 'Unknown';
  const weight = animal.weight || 'Unknown';

  const handleAdoptClick = async () => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
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
        navigate('/adoptbooking');
      } else {
        // If suitability does not exist, show a popup or alert
        alert('Please fill in your adopter information before continuing');
        // You can also set a state to show a new popup with relevant information here
        navigate('/adopterinfo');
      }
    } catch (error) {
      console.error('Error checking adopter suitability:', error);
    }
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
          &times; {/* This represents the close icon (×) */}
        </button>

        {/* Animal Image and Name */}
        <div className="w-1/2 p-4">
          <img src={imageUrl} alt={animalName} className="w-96 h-80 object-cover rounded-lg" />
        </div>

        {/* Animal Info Section */}
        <div className="w-2/3 p-6 bg-pr rounded-lg flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-4">Meet {animalName}</h3>
            <p className="text-black mb-4 text-l">{description}</p>

            {/* Animal Attributes */}
            <ul className="text-m">

              <li><strong>Gender:</strong> {gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender}</li>
              <li><strong>Age:</strong> {age}</li>
              <li><strong>Breed:</strong> {breed}</li>
              <li><strong>Weight (kg):</strong> {weight}</li>
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

          {/* Adoption Button */}
          <button
            className="px-6 py-3 mr-auto font-poppins text-m rounded-lg bg-sc text-pr shadow-lg hover:bg-st transition duration-300"
            onClick={handleAdoptClick}
          >
            I Want To Adopt!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
