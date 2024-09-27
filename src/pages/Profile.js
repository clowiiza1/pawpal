/*
  password still needs to be encrypted and sent to the database
  user info still needs to be sent to the database after being changed
  user info isnt being fetched correctly (i have fought with chat for literal hours about this to no avail)
*/
import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { getUserProfile } from '../apis/api'; // API function to fetch the user info is in api.js "getUserProfile"

// remeber to npm install react-icons to make the pencil icon work

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [isModified, setIsModified] = useState(false);
  
  // New state for active tab
  const [activeTab, setActiveTab] = useState('main'); // Default tab

  // New states for password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const extractUsernameFromToken = (token) => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.sub; // Adjust based on your token structure
        } catch (error) {
          console.error('Error extracting username from token:', error);
          return null;
        }
      };

      const fetchUserProfile = async () => {
        const usernameFromToken = extractUsernameFromToken(token);
        console.log("Fetching profile for:", usernameFromToken); // Log the username
        const userData = await getUserProfile(usernameFromToken); // Fetch user profile
        console.log("User data fetched:", userData); // Log the fetched user data
      
        if (userData) {
          setUsername(userData.username || ''); // Adjust according to your user data structure
          setEmail(userData.email || '');
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
        }
      };

      fetchUserProfile();
    }
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    switch (editingField) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      default:
        break;
    }
    setIsModified(true);
  };

  const handleSave = () => {
    // Save the updated information to localStorage (or ideally to your API)
    localStorage.setItem('Username', username);
    localStorage.setItem('Email_Address', email);
    localStorage.setItem('First_Name', firstName);
    localStorage.setItem('Last_Name', lastName);
    setEditingField(null);
    setIsModified(false);
  };

  // Add keydown event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setEditingField(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to handle password change
  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage('All fields are required.');
      return; // Exit the function if any field is empty
    }

    if (newPassword === confirmPassword) {
      setPasswordMessage('Password changed successfully!');
      // Here you would typically send the new password to your API to update it
    } else {
      setPasswordMessage('Passwords do not match.');
    }

    // Reset password fields after handling
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-st p-8 flex flex-col rounded-3xl ml-4">
        <ul className="space-y-6">
          <li>
            <button
              className={`w-full ${activeTab === 'main' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('main')}
            >
              Main
            </button>
          </li>
          <li>
            <button
              className={`w-full ${activeTab === 'adopter' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('adopter')}
            >
              Adopter Info
            </button>
          </li>
          <li>
            <button
              className={`w-full ${activeTab === 'volunteer' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('volunteer')}
            >
              Volunteer Info
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-4 bg-pr">
        {activeTab === 'main' && (
          <>
            <h2 className="text-2xl font-bold text-sc ml-12 mb-12">
              Hey <span className="underline">{username}</span>!
            </h2>

            <h3 className="text-xl font-semibold text-sc mb-4 ml-12">Here you can edit your personal account information</h3>
            <div className="space-y-1 ml-12">
              {[
                { field: 'username', label: 'Username' },
                { field: 'email', label: 'Email' },
                { field: 'firstName', label: 'First Name' },
                { field: 'lastName', label: 'Last Name' },
              ].map(({ field, label }) => (
                <div className="flex items-center" key={field}>
                  <span className="text-lg font-medium w-1/3">{`${label}:`}</span>
                  {editingField === field ? (
                    <input
                      type="text"
                      value={
                        field === 'username' ? username :
                        field === 'email' ? email :
                        field === 'firstName' ? firstName : lastName
                      }
                      onChange={handleChange}
                      className="border rounded px-2 py-1 text-lg w-1/3"
                    />
                  ) : (
                    <div className="flex items-center w-1/3 justify-between">
                      <span className="text-lg">
                        {field === 'username' ? username :
                         field === 'email' ? email :
                         field === 'firstName' ? firstName : lastName}
                      </span>
                      <FaPen className="cursor-pointer text-sc hover:text-pr ml-2" onClick={() => handleEdit(field)} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {isModified && (
              <div className="mt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-st ml-12 text-sc hover:bg-sc hover:text-pr rounded-md"
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* Password Change Section */}
            <div className="mt-8 ml-12">
              <h3 className="text-xl font-semibold text-sc mb-4">Change Password</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-lg font-medium w-1/4">Current Password:</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border rounded px-2 py-1 text-lg w-1/3"
                    autoComplete="new-password" // Prevent autofill
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="text-lg font-medium w-1/4">New Password:</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border rounded px-2 py-1 text-lg w-1/3"
                    autoComplete="new-password" // Prevent autofill
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="text-lg font-medium w-1/4">Confirm New Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border rounded px-2 py-1 text-lg w-1/3"
                    autoComplete="new-password" // Prevent autofill
                  />
                </div>
                <div>
                  <button
                    onClick={handlePasswordChange}
                    className="px-4 py-2 bg-st text-sc hover:bg-sc hover:text-pr rounded-md"
                  >
                    Change Password
                  </button>
                </div>
                {passwordMessage && (
                  <div className="mt-2 text-lg text-sc">{passwordMessage}</div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'adopter' && (
          <div className="ml-12">
            <h2 className="text-2xl font-bold text-sc mb-4">Adopter Info</h2>
            <p className="text-lg text-sc">This is the placeholder for Adopter Info.</p>
          </div>
        )}

        {activeTab === 'volunteer' && (
          <div className="ml-12">
            <h2 className="text-2xl font-bold text-sc mb-4">Volunteer Info</h2>
            <p className="text-lg text-sc">This is the placeholder for Volunteer Info.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
