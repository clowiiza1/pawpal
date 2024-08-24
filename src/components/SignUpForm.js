import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'adopter',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="flex flex-col justify-center  bg-pr sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className=" text-3xl font-extrabold text-center text-sc leading-9 pt-4">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-br shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-pr font-medium text-gray-700 leading-5">
                Name
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoFocus
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="role" className="block text-pr font-medium text-gray-700 leading-5">
                Role
              </label>
              <div className="mt-1 rounded-md shadow-pr bg-pr">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-pr focus:border-pr transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                  <option value="adopter">Adopter</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
            </div>

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

export default SignUp;
