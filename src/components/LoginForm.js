import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/api'; // Import the login function
import '../App.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [dots, setDots] = useState(''); // New state for dots
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(null);
    setDots(''); // Reset dots when submitting

    try {
      const response = await login({
        username: formData.username,
        password: formData.password,
      });

      const token = response.data.accessToken;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', formData.username);

        setIsLoggedIn(true);

        // Redirect to the homepage or dashboard after a short delay
        setTimeout(() => {
          navigate('/'); // Redirect to the desired route
        }, 2000);
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Login failed. Please check your credentials.');
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    let intervalId;

    if (isLoggingIn) {
      intervalId = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots.length < 3) {
            return prevDots + '.';
          }
          return '';
        });
      }, 500);
    }

    return () => {
      clearInterval(intervalId); // Cleanup interval on unmount
    };
  }, [isLoggingIn]);

  return (
    <div className="flex flex-col bg-pr sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-sc leading-9">
          Please sign in to your account
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

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-pr">
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-pr font-black text-pr bg-st border border-transparent rounded-md hover:opacity-70 focus:outline-none focus:border-pr focus:shadow-outline-pr active:bg-pr transition duration-150 ease-in-out"
                >
                  {isLoggingIn ? `Logging you in${dots}` : 'Sign in'} {/* Change button text based on login status */}
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
