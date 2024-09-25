import React from 'react';

const Popup = ({ isOpen, onClose, dog }) => {
  if (!isOpen || !dog) return null; // Only render when the popup is open and dog is defined

  // Safely access dog fields with fallback values
  const imageUrl = dog.image || 'placeholder-image-url'; // Fallback image URL if no image
  const dogName = dog.name || 'Unknown Dog';
  const description = dog.description || 'No description available';
  const gender = dog.gender || 'Unknown';
  const age = dog.age || 'Unknown';
  const breed = dog.breed || 'Unknown';
  const weight = dog.weight || 'Unknown';

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

        {/* Dog Image and Name */}
        <div className="w-1/2 p-4">
          <img src={imageUrl} alt={dogName} className="w-full h-auto rounded-lg" />
          <h2 className="text-4xl font-bold">{dogName}</h2>
        </div>

        {/* Dog Info Section */}
        <div className="w-1/2 p-6 bg-pr rounded-lg flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-4">Description</h3>
            <p className="text-gray-700 mb-4">{description}</p>

            {/* Dog Attributes */}
            <ul className="text-lg">
              <li><strong>Gender:</strong> {gender}</li>
              <li><strong>Age:</strong> {age}</li>
              <li><strong>Breed:</strong> {breed}</li>
              <li><strong>Weight:</strong> {weight}</li>
            </ul>

            {/* Health Status Indicators */}
            <div className="mt-4 flex space-x-4">
              {dog.isVaccinated && (
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
              )}
              {dog.isSterilized && (
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
              )}
            </div>
          </div>

          {/* Adoption Button */}
          <button 
            onClick={onClose} 
            className="mt-6 bg-sc text-pr px-6 py-3 rounded-lg text-lg hover:bg-brown-700"
          >
            I Want To Adopt!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
