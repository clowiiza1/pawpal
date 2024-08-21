import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SPCA Shelter</Link>
        <nav>
          <Link to="/" className="px-3">Home</Link>
          <Link to="/animals" className="px-3">Animals</Link>
          <Link to="/volunteer" className="px-3">Volunteer</Link>
          <Link to="/signup" className="px-3">Sign Up</Link>
          <Link to="/login" className="px-3">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
