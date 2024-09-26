import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdoptBookings() {
  const [selectedAnimal, setSelectedAnimal] = useState({
    name: 'Whiskers',
    image: 'path/to/animal-image.jpg',
    breed: 'Labrador Retriever',
    age: '3 years',
  }); // Replace with your actual state management
  const [selectedDate, setSelectedDate] = useState(''); // State for date selection
  const [error, setError] = useState(''); // State for error handling
  const navigate = useNavigate();

  // Function to handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setError(''); // Clear error when a date is selected
  };

  // Function to handle continue button click
  const handleContinue = () => {
    if (!selectedDate) {
      setError('Please select a date to continue.');
    } else {
      // Proceed to the next step
      navigate('/next-step'); // Replace with the correct path
    }
  };

  return (
    <div className="min-h-screen bg-pr flex flex-col items-center p-6">
      <div className="w-full max-w-5xl flex justify-between items-start">
        {/* Animal Mini Profile Section */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center mr-4">
          {selectedAnimal ? (
            <>
              <img src={selectedAnimal.image} alt={selectedAnimal.name} className="w-40 h-40 rounded-full mb-4" />
              <h3 className="text-xl font-quicksand text-br mb-2">{selectedAnimal.name}</h3>
              <p className="font-poppins text-md text-sc mb-1">Breed: {selectedAnimal.breed}</p>
              <p className="font-poppins text-md text-sc">Age: {selectedAnimal.age}</p>
            </>
          ) : (
            <p className="text-sc">No animal selected yet.</p>
          )}
        </div>

        {/* Date Selection and Continue Button Section */}
        <div className="w-1/2 bg-sc p-6 rounded-lg shadow-lg flex flex-col items-center">
          {/* Heading Above Date Picker */}
          <h1 className="text-3xl font-poppins font-bold text-pr mb-4 text-center">
            Please select a date to go see {selectedAnimal ? selectedAnimal.name : 'an animal'}
          </h1>

          {/* Date Selection Input */}
          <div className="w-full mb-4">
            <input
              id="datepicker-actions"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-white border border-st text-sc rounded-lg focus:ring-st focus:border-sc block w-full p-2.5"
              placeholder="Select date"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Continue Button */}
          <button
            className="w-full mt-6 py-3 bg-st text-white text-lg font-poppins rounded-lg hover:bg-br transition-all duration-300"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdoptBookings;
