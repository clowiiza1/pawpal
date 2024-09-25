import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdoptBookings() {
  const [selectedAnimal, setSelectedAnimal] = useState(null); // Replace with your actual state management
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
      <h1 className="text-3xl font-poppins font-bold text-sc mb-6">Please select a date to go see {selectedAnimal ? selectedAnimal.name : 'an animal'}</h1>
      <div className="w-full max-w-md bg-sc p-6 rounded-lg shadow-lg"> 
        {/* Date Selection Input */}
        <div className="relative max-w-l mb-4">
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
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Selected Animal */}
        {selectedAnimal ? (
          <div className="mt-4 bg-pr p-4 rounded-lg shadow-md text-center">
            <img src={selectedAnimal.image} alt={selectedAnimal.name} className="w-32 h-32 rounded-full mb-4 mx-auto" />
            <h3 className="text-lg font-quicksand text-br">{selectedAnimal.name}</h3>
            <p className="font-poppins text-sm text-sc">Breed: {selectedAnimal.breed}</p>
            <p className="font-poppins text-sm text-sc">Age: {selectedAnimal.age}</p>
          </div>
        ) : (
          <p className="text-pr mt-4">No animal selected yet.</p>
        )}

        {/* Continue Button */}
        <button
          className="w-full mt-6 py-3 bg-st text-white text-lg font-poppins rounded-lg hover:bg-sc shadow-lg transition-all duration-300" 
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default AdoptBookings;
