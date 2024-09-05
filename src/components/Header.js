import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './LogoPawprint.png'; // Adjust the path as needed
import { FaUser } from 'react-icons/fa'; // For the user icon
import userIcon from './person.png';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // Update the global login state
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername || 'User');  // Update the username state
    } else {
      setIsLoggedIn(false);  // Clear login state if no token
      setUsername('');  // Clear the username state on logout
    }
  }, [isLoggedIn, setIsLoggedIn]);  // Ensure useEffect runs when isLoggedIn changes

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);  // Update the global login state
    setUsername('');  // Clear the username state
    navigate('/login');  // Redirect to login page
  };

  return (
    <header className="bg-pr text-sc p-4 font-poppins font-bold">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="PawPal Logo" className="h-8 w-8 mr-2" />
          <span className="text-2xl font-bold">PawPal</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/adoptadog" className="px-2 text-sc hover:text-st">
            Adopt a Dog
          </Link>
          <Link to="/adoptacat" className="px-2 text-sc hover:text-st">
            Adopt a Cat
          </Link>
          <Link to="/volunteer" className="px-2 text-sc hover:text-st">
            Volunteer
          </Link>

          {/* Conditionally render profile dropdown or login link */}
          {isLoggedIn ? (
            <li className="relative group list-none px-3">
              <img src={userIcon} alt="User Icon" className="h-6 w-6 text-brown-500 hover:text-brown-700 cursor-pointer" />
              {/* Hover dropdown */}
              <div className="absolute z-50 right-0 mt-2 w-48 bg-sc rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="block px-4 py-2 text-st">Hello, {username}</p>  {/* Update the username */}
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-st hover:bg-pr"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-st hover:bg-pr"
                >
                  Log Out
                </button>
              </div>
            </li>
          ) : (
            <Link to="/login" className="px-3 text-brown hover:text-brown-700">
              <FaUser size={20} />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
