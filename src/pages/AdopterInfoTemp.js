import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdopterInfo = () => {
  const [numAnimals, setNumAnimals] = useState('');
  const [livingEnvironment, setLivingEnvironment] = useState('');
  const [errors, setErrors] = useState({});

  // Options for the dropdown
  const livingOptions = ['Residential', 'Apartment', 'Farm', 'Townhouse'];
  const navigate = useNavigate();

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};
    if (!numAnimals || numAnimals <= 0) {
      newErrors.numAnimals = 'Please enter a valid number of animals';
    }
    if (!livingEnvironment) {
      newErrors.livingEnvironment = 'Please select a living environment';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
      navigate('/adoptbooking');
      // Here, you would normally send the data to your backend or API
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
            <label htmlFor="numAnimals" className="block text-pr font-semibold mb-2">
              Number of Animals
              <span className="ml-2 text-st" title="Enter the number of animals you currently have.">?</span>
            </label>
            <input
              type="number"
              id="numAnimals"
              value={numAnimals}
              required
              onChange={(e) => setNumAnimals(e.target.value)}
              className={`w-full p-3 border ${errors.numAnimals ? 'border-red-500' : 'border-st'} rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-sc`}
              placeholder= "Please enter the number of animals you currently have"
            />
            {errors.numAnimals && <p className="text-red-500 text-sm mt-1">{errors.numAnimals}</p>}
          </div>

          {/* Living Environment Dropdown */}
          <div className="mb-4 relative">
            <label htmlFor="livingEnvironment" className="block text-pr font-semibold mb-2">
              Living Environment
              <span className="ml-2 text-st" title="Select the type of living environment you find yourself in.">?</span>
            </label>
            <div className="relative">
              <select
                id="livingEnvironment"
                value={livingEnvironment}
                required
                onChange={(e) => setLivingEnvironment(e.target.value)}
                className={`w-full p-3 border ${errors.livingEnvironment ? 'border-red-500' : 'border-st'} rounded-lg focus:outline-none focus:ring-2 focus:ring-sc bg-white text-gray-400 appearance-none`}
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
                className={`absolute top-1/2 right-3 w-6 h-6 transform -translate-y-1/2 text-br pointer-events-none ${livingEnvironment ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            {errors.livingEnvironment && <p className="text-red-500 text-sm mt-1">{errors.livingEnvironment}</p>}
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
