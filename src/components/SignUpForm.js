import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import signupImage from '../components/SignUpForm.jpeg'; // Replace with your actual image path

const SignupForm = ({ formData, updateFormData, nextStep }) => {
  const [localData, setLocalData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  //const navigate = useNavigate();

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateFormData(localData);
      nextStep();
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="flex w-[98%] md:w-[84%] bg-pr shadow-lg rounded-[25px] overflow-hidden">
        {/* Image on the left */}
        <div className="w-1/2 flex items-center">
          <img src={signupImage} alt="Signup" className="object-cover h-full w-full" />
        </div>
        {/* Form on the right */}
        <div className="flex flex-col justify-center w-1/2 p-8 bg-st">
          <h2 className="text-2xl font-bold text-white">Create your account</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="username" className="block text-white font-medium">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={localData.username}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-pr mt-1">
                *This username cannot be changed later.
              </p>
            </div>
            <div>
              <label htmlFor="email" className="block text-white font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={localData.email}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white font-medium">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={localData.password}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button type="submit" className="w-full bg-pr text-sc font-black py-2 rounded-md hover:bg-sc hover:text-pr">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
