import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register, login } from '../apis/api'; // Import the register and login functions

const SignUpForm = ({ setIsLoggedIn }) => {  // Accept the setIsLoggedIn prop
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Use navigate to redirect after registration

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      await register({
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        age: formData.age,
      });

      // Log the user in automatically after successful registration
      const loginResponse = await login({
        username: formData.username,
        password: formData.password,
      });

      // Store the JWT token and the username
      localStorage.setItem('token', loginResponse.data.token); // Ensure the correct token key is used
      localStorage.setItem('username', formData.username);

      console.log('Registration and login successful');
      setSuccess(true);
      setError(null);

      // Dynamically update the login status
      setIsLoggedIn(true);  // Use the setIsLoggedIn prop to update the global login state

      // Redirect to the homepage or dashboard after a short delay
      setTimeout(() => {
        navigate('/'); // Adjust the path based on your app
      }, 1000);
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      setError('Registration failed. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col justify-center bg-pr sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-sc leading-9 pt-1">
          Please create a new account
        </h2>
      </div>

     
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-br shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-pr font-medium text-gray-700 leading-5">
                Username
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoFocus
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-pr font-medium text-gray-700 leading-5">
                Password
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="firstName" className="block text-pr font-medium text-gray-700 leading-5">
                First Name
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="lastName" className="block text-pr font-medium text-gray-700 leading-5">
                Last Name
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="email" className="block text-pr font-medium text-gray-700 leading-5">
                Email Address
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="phoneNumber" className="block text-pr font-medium text-gray-700 leading-5">
                Phone Number
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="age" className="block text-pr font-medium text-gray-700 leading-5">
                Age
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">Registration successful! Redirecting...</p>}

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-pr">
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-pr font-medium text-pr bg-st border border-transparent rounded-md hover:opacity-70 focus:outline-none focus:border-pr focus:shadow-outline-pr active:bg-pr transition duration-150 ease-in-out"
                >
                  Sign up
                </button>
              </span>
            </div>

            <div className="flex items-center justify-center mt-6">
              <div className="text-sm leading-5">
                <Link to="/login" className="font-medium text-pr hover:opacity-70 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Already have an account? Let's sign you in!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
