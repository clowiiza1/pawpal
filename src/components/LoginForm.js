import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="flex flex-col  bg-pr sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className=" text-3xl font-extrabold text-center text-sc leading-9">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-br shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-pr font-medium text-gray-700 leading-5">
                Email address
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
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
