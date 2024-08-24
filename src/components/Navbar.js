import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-center space-x-4">
      <Link to="/adoptdog" className="text-white px-3 py-2 rounded hover:bg-gray-700">Adopt a Dog</Link>
      <Link to="/adoptcat" className="text-white px-3 py- 2 rounded hover:bg-gray-700">Adopt a Cat</Link>
      <Link to="/volunteer" className="text-white px-3 py-2 rounded hover:bg-gray-700">Volunteer</Link>
      <Link to="/signup" className="text-white px-3 py-2 rounded hover:bg-gray-700">Sign Up</Link>
      <Link to="/login" className="text-white px-3 py-2 rounded hover:bg-gray-700">Login</Link>
    </nav>
  );
};

export default Navbar;
