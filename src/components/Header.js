import React from 'react';
import { Link } from 'react-router-dom';
import logo from './LogoPawprint.png'; // Adjust the path as needed

const Header = () => {
  return (
    <header className="bg-pr text-sc p-4 font-poppins font-bold">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="PawPal Logo" className="h-8 w-8 mr-2" />
          <span className="text-2xl font-bold">PawPal</span>
        </Link>
        <nav>

          <Link to="/adoptadog" className="px-3">Adopt a Dog</Link>
          <Link to="/adoptacat" className="px-3">Adopt a Cat</Link>
          <Link to="/volunteer" className="px-3">Volunteer</Link>
          <Link to="/signup" className="px-3">Sign Up</Link>
          <Link to="/login" className="px-3">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
