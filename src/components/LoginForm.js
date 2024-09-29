import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/api'; // Import the login function
import petsIcon from '../components/LoginForm.jpeg'; // Image for the side

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
    <div className="flex justify-center items-center min-h-[60vh]">
      {/* Updated width settings */}
      <div className="flex w-full max-w-3xl bg-pr shadow-lg rounded-[25px] overflow-hidden">
        {/* Image on the left */}
        <div className="w-1/2 hidden lg:flex items-center">
          <img src={petsIcon} alt="Login" className="object-cover h-full w-full" />
        </div>
        {/* Form on the right */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 bg-st">
          <h2 className="text-2xl font-bold text-white">Please sign in to your account</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="username" className="block text-white font-medium">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
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
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-pr text-sc font-black py-2 rounded-md hover:bg-sc hover:text-pr"
            >
              {isLoggingIn ? `Logging you in${dots}` : 'Sign in'}
            </button>
          </form>

          <p className="mt-2 text-sm text-center text-gray-600 leading-5 max-w p-2">
            <Link to="/signup" className="font-medium text-pr hover:opacity-70 focus:outline-none focus:underline transition ease-in-out duration-150">
              Don't have an account? Let's create one!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
