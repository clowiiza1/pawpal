import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './LogoPawprint.png'; // Adjust the path as needed
import { FaUser } from 'react-icons/fa'; // For the user icon
import userIcon from './person.png';
import { getUserRoles } from '../apis/api'; // Import the getUserRoles API call

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [isAdminOrStaff, setIsAdminOrStaff] = useState(false); // Track if the user is admin or staff
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (token) {
      setIsLoggedIn(true);  // Update the global login state
      setUsername(storedUsername || 'User');  // Update the username state
      
      // Fetch user roles if logged in
      getUserRoles()
        .then((roles) => {
          if (roles.some(role => role.name === 'Admin' || role.name === 'Staff')) {
            setIsAdminOrStaff(true); // Set true if user is admin or staff
          } else {
            setIsAdminOrStaff(false); // Set false if the user is not admin or staff
          }
        })
        .catch((error) => {
          console.error('Error fetching roles:', error);
          setIsAdminOrStaff(false); // Reset admin/staff state on error
        });
    } else {
      setIsLoggedIn(false);  // Clear login state if no token
      setUsername('');  // Clear the username state on logout
      setIsAdminOrStaff(false); // Reset admin/staff state on logout
    }
  }, [isLoggedIn, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);  // Update the global login state
    setUsername('');  // Clear the username state
    setIsAdminOrStaff(false); // Clear the admin/staff state on logout
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

          {/* Conditionally render admin dashboard link */}
          {isAdminOrStaff && (
            <Link to="/admin" className="px-2 text-sc hover:text-st">
              Staff Dashboard
            </Link>
          )}

          {/* Conditionally render profile dropdown or login link */}
          {isLoggedIn ? (
            <li className="relative group list-none px-3">
              <img src={userIcon} alt="User Icon" className="h-6 w-6 text-brown-500 hover:text-brown-700 cursor-pointer" />
              {/* Hover dropdown */}
              <div className="absolute z-50 right-0 mt-2 w-48 bg-sc rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="block px-4 py-2 text-st">Hello, {username}</p>
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
