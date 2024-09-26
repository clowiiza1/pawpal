import React from 'react';
import { Link } from 'react-router-dom'; 
import dogImage from '../components/dog.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyringe , faNeuter } from '@fortawesome/free-solid-svg-icons';

const Popup = ({ isOpen, onClose, animal }) => {
  if (!isOpen || !animal) return null; // Only render when the popup is open and animal is defined

  // Safely access animal fields with fallback values
  const imageUrl = animal.imageUrl || dogImage; // Fallback image URL if no image
  const animalName = animal.name || 'Unknown Animal';
  const description = animal.description || 'No description available';
  const gender = animal.gender || 'Unknown';
  const age = animal.age || 'Unknown';
  const breed = animal.breed || 'Unknown';
  const weight = animal.weight || 'Unknown';

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
              <li><strong>Gender:</strong> {gender}</li>
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
          <Link to="/adoptbooking">
            <button className="px-6 py-3 mr-auto font-poppins text-m rounded-lg bg-sc text-pr shadow-lg hover:bg-st transition duration-300">
              I Want To Adopt!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;
