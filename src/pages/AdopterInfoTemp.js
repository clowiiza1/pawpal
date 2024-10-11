import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAdopterInfo } from '../apis/api';

const AdopterInfo = () => {
  const [noAnimals, setnoAnimals] = useState('');
  const [houseType, sethouseType] = useState('');
  const [errors, setErrors] = useState({});
  const routerLocation = useLocation(); // Renamed from location to routerLocation
  const { animalId } = routerLocation.state || {}; // Get animalId from routerLocation state
  const navigate = useNavigate();

  // Options for the dropdown
  const livingOptions = ['Residential', 'Apartment', 'Farm', 'Townhouse'];

  console.log('Received animalId in AdopterInfo:', animalId);

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};
    if (!noAnimals || noAnimals <= 0) {
      newErrors.noOfAnimals = 'Please enter a valid number of animals';
    }
    if (!houseType) {
      newErrors.houseType = 'Please select a living environment';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(animalId);
    
  
      // Prepare the adopter info to be sent
      const adopterInfo = {
        noOfAnimals: parseInt(noAnimals, 10),      // Using the state variable directly
        houseType,    // Using the state variable directly
        // Add other fields as needed
      };
  
      try {
        const response = await setAdopterInfo(adopterInfo);
        if (response) {
          // Navigate to adoptbooking and pass the animalId along with it
          navigate('/adoptbooking', { state: { animalId } });
        } else {
          alert('Failed to submit adopter info. Please try again.');
        }
      } catch (error) {
        console.error('Error in handleSubmit:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <div className="min-h-3/4 flex items-center justify-center bg-pr py-10 px-4">
      <div className="max-w-lg w-full bg-sc rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold text-pr mb-4 text-center">We Need More Information</h1>
        <p className="text-pr mb-6 text-center">
          In order to proceed with your adoption request, we need a bit more information from you. Please fill in the fields below.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Number of Animals Input */}
          <div className="mb-4">
            <label htmlFor="noAnimals" className="block text-pr font-semibold mb-2">
              Number of Animals
              <span className="ml-2 text-st" title="Enter the number of animals you currently have.">?</span>
            </label>
            <input
              type="number"
              id="noAnimals"
              value={noAnimals}
              required
              onChange={(e) => setnoAnimals(e.target.value)}
              className={`w-full p-3 border ${errors.noAnimals ? 'border-red-500' : 'border-st'} rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-sc`}
              placeholder="Please enter the number of animals you currently have"
            />
            {errors.noAnimals && <p className="text-red-500 text-sm mt-1">{errors.noAnimals}</p>}
          </div>

          {/* Living Environment Dropdown */}
          <div className="mb-4 relative">
            <label htmlFor="houseType" className="block text-pr font-semibold mb-2">
              Living Environment
              <span className="ml-2 text-st" title="Select the type of living environment you find yourself in.">?</span>
            </label>
            <div className="relative">
              <select
                id="houseType"
                value={houseType}
                required
                onChange={(e) => sethouseType(e.target.value)}
                className={`w-full p-3 border ${errors.houseType ? 'border-red-500' : 'border-st'} rounded-lg focus:outline-none focus:ring-2 focus:ring-sc bg-white text-gray-400 appearance-none`}
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none',
                }}
              >
                <option value="">Please select environment</option>
                {livingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* SVG Arrow Icon */}
              <svg
                className={`absolute top-1/2 right-3 w-6 h-6 transform -translate-y-1/2 text-br pointer-events-none ${houseType ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            {errors.houseType && <p className="text-red-500 text-sm mt-1">{errors.houseType}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-st text-white font-semibold rounded-lg shadow hover:bg-br transition duration-200"
          >
            Submit Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdopterInfo;
