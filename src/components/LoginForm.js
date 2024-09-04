import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/api'; // Import the login function
import '../App.css';

const LoginForm = ({ setIsLoggedIn }) => { // Added setIsLoggedIn prop
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // New state for success message
  const navigate = useNavigate(); // Use navigate to redirect after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        username: formData.username,
        password: formData.password,
      });
  
      // Log the full response to check the structure
      console.log("Login response:", response);
      console.log('Login response data:', response.data);
  
      // Log the token field to verify it is correct
      const token = response.data.accessToken;
      console.log("Token:", token);
      
  
      if (token) {
        // Store the JWT token and the username
        localStorage.setItem('token', token);
        localStorage.setItem('username', formData.username);
  
        // Show success message
        setSuccess(true);
        setError(null);
  
        // Update the login status
        setIsLoggedIn(true);
  
        // Redirect to the homepage or dashboard after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        throw new Error('Token not found in response');
      }
  
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Login failed. Please check your credentials.');
      setSuccess(false);
    }
  };
  

  return (
    <div className="flex flex-col bg-pr sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-sc leading-9">
          Sign in to your account
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
              <div className="mt-1 rounded-md shadow-pr">
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

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">Login successful! Redirecting...</p>}

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-pr">
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-pr font-medium text-pr bg-st border border-transparent rounded-md hover:opacity-70 focus:outline-none focus:border-pr focus:shadow-outline-pr active:bg-pr transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </span>
            </div>
            <div className="flex items-center justify-center mt-6">
              <div className="text-sm leading-5">
                <Link to="/forgot-password" className="font-medium text-pr hover:opacity-70 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <p className="mt-2 text-sm text-center text-gray-600 leading-5 max-w p-2">
              <Link to="/signup" className="font-medium text-pr hover:opacity-70 focus:outline-none focus:underline transition ease-in-out duration-150">
                Don't have an account? Let's create one!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
