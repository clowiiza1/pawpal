import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; // Import the user icon from react-icons
import logo from './LogoPawprint.png'; // Adjust the path as needed
import userIcon from './person.png';

const Header = () => {
  return (
    <header className="bg-pr text-sc p-4 font-poppins font-bold">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="PawPal Logo" className="h-8 w-8 mr-2" />
          <span className="text-2xl font-bold">PawPal</span>
        </Link>
        <nav className="flex items-center">
          <Link to="/adoptadog" className="px-3">Adopt a Dog</Link>
          <Link to="/adoptacat" className="px-3">Adopt a Cat</Link>
          <Link to="/volunteer" className="px-3">Volunteer</Link>
          {/* Replace Sign Up and Login with a user icon */}
          <Link to="/login" className="px-3 text-brown">
          <img src={userIcon} alt="User Icon" className="h-6 w-6 fill-brown text-brown-500 hover:text-brown-700" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
