import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Header = () => (
  <header className="bg-gray-100 shadow-md">
    <nav className="container mx-auto p-4 flex justify-between items-center font-poppins">
      <Link to="/" className="text-2xl font-bold text-blue-500">
        PawPal
      </Link>
      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/adoptacat" className="text-gray-700 hover:text-blue-500">
            Adopt a Cat
          </Link>
        </li>
        <li>
          <Link to="/adoptadog" className="text-gray-700 hover:text-blue-500">
            Adopt a Dog
          </Link>
        </li>
        <li>
          <Link to="/volunteer" className="text-gray-700 hover:text-blue-500">
            Volunteer
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-gray-700 hover:text-blue-500">
            <FaUser size={20} />
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
