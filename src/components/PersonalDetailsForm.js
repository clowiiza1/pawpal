import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../apis/api';
import detailsImage from '../components/PersonalDetailsForm.jpeg'; // Replace with your actual image path

const PersonalDetailsForm = ({ formData, completeSignUp, setIsLoggedIn, setStep }) => {
  const [localData, setLocalData] = useState({
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    phoneNumber: formData.phoneNumber || '',
    age: formData.age || '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registrationData = { ...formData, ...localData };
      await register(registrationData);
      const loginResponse = await login({
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('username', formData.username);
      setIsLoggedIn(true);
      completeSignUp(localData);
      navigate('/');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="flex w-[98%] md:w-[84%] bg-pr shadow-lg rounded-[25px] overflow-hidden">
        {/* Image on the left */}
        <div className="w-1/2 flex items-center">
          <img src={detailsImage} alt="Details" className="object-cover h-full w-full" />
        </div>
        {/* Form on the right */}
        <div className="flex flex-col justify-center w-1/2 p-8 bg-st">
          <h2 className="text-2xl font-bold text-white">Let's get to know you better</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-white font-medium">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={localData.firstName}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-white font-medium">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={localData.lastName}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-white font-medium">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={localData.phoneNumber}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-white font-medium">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                value={localData.age}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button type="submit" className="w-full bg-pr text-sc font-black py-2 rounded-md hover:bg-sc hover:text-pr">Complete Sign Up</button>
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              className="w-full bg-pr text-sc font-black py-2 rounded-md hover:bg-sc hover:text-pr"
            >
              Go Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
