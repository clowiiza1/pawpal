import React, { useState, useEffect } from 'react';
import { FaPen} from 'react-icons/fa';
import { getUserProfile } from '../apis/api'; // API function to fetch the user info is in api.js "getUserProfile"
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [isModified, setIsModified] = useState(false);

  // New state for active tab
  const [activeTab, setActiveTab] = useState('main');

  // New states for password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // New state for adopter info
  const [numberOfAnimals, setNumberOfAnimals] = useState('');
  const [houseType, setHouseType] = useState('');
  const [adopterSuitability, setAdopterSuitability] = useState('');

  // New state for volunteer info
  const [preferredRoles, setPreferredRoles] = useState('');
  const [volunteerHours, setVolunteerHours] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', number: '' }]);

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
        const userData = await getUserProfile(usernameFromToken); // Fetch user profile

        if (userData) {
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
          setEmail(userData.email || '');
          setPhoneNumber(userData.phoneNumber || ''); // Assuming phone number is in your user data
          setAge(userData.age || ''); // Assuming age is in your user data
          // Set adopter info
          setNumberOfAnimals(userData.numberOfAnimals || '');
          setHouseType(userData.houseType || '');
          setAdopterSuitability(userData.adopterSuitability || '');
          // Set volunteer info
          setPreferredRoles(userData.preferredRoles || '');
          setVolunteerHours(userData.volunteerHours || '');
          // Initialize emergency contacts
          setEmergencyContacts(userData.emergencyContacts || [{ name: '', number: '' }]);
        }
      };

      fetchUserProfile();
    }

    // Add event listener for Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setEditingField(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    switch (editingField) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'age':
        setAge(value);
        break;
      default:
        break;
    }
    setIsModified(true);
  };

  const handleSave = () => {
    // Save the updated information to localStorage (or ideally to your API)
    localStorage.setItem('First_Name', firstName);
    localStorage.setItem('Last_Name', lastName);
    localStorage.setItem('Email_Address', email);
    localStorage.setItem('Phone_Number', phoneNumber);
    localStorage.setItem('Age', age);
    setEditingField(null);
    setIsModified(false);
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

  // code for the donut chart
  const chartData = {
    labels: ['Volunteer Hours', 'Remaining Hours'],
    datasets: [
      {
        data: [volunteerHours, 24 - volunteerHours],
        backgroundColor: ['#ffffff', '#000000'],
        hoverBackgroundColor: ['#ffffff', '#000000'],
      },
    ],
  };
  
  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-st p-8 flex flex-col rounded-tl-3xl rounded-tr-3xl ml-4">
        <ul className="space-y-6">
          <li>
            <button
              className={`w-full ${activeTab === 'main' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => setActiveTab('main')}
            >
              Main
            </button>
          </li>
          <li>
            <button
              className={`w-full ${activeTab === 'adopter' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => setActiveTab('adopter')}
            >
              Adopter Info
            </button>
          </li>
          <li>
            <button
              className={`w-full ${activeTab === 'volunteer' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => setActiveTab('volunteer')}
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
              Hey <span className="underline">{firstName}</span>!
            </h2>

            <h3 className="text-xl font-semibold text-sc mb-4 ml-12">Here you can edit your personal account information</h3>
            <div className="space-y-1 ml-12">
              {[ 
                { field: 'firstName', label: 'First Name' },
                { field: 'lastName', label: 'Last Name' },
                { field: 'email', label: 'Email' },
                { field: 'phoneNumber', label: 'Phone Number' },
                { field: 'age', label: 'Age' }
              ].map(({ field, label }) => (
                <div className="flex items-center" key={field}>
                  <span className="text-lg font-medium w-1/3">{`${label}:`}</span>
                  {editingField === field ? (
                    <input
                      type="text"
                      value={ 
                        field === 'firstName' ? firstName :
                        field === 'lastName' ? lastName :
                        field === 'email' ? email :
                        field === 'phoneNumber' ? phoneNumber :
                        age
                      }
                      onChange={handleChange}
                      className="border rounded px-2 py-1 text-lg w-1/3"
                    />
                  ) : (
                    <div className="flex items-center w-1/3 justify-between">
                      <span className="text-lg">
                        {field === 'firstName' ? firstName :
                         field === 'lastName' ? lastName :
                         field === 'email' ? email :
                         field === 'phoneNumber' ? phoneNumber :
                         age}
                      </span>
                      <button onClick={() => handleEdit(field)}>
                        <FaPen className="text-sc hover:text-pr cursor-pointer" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isModified && (
              <div className="mt-4 ml-12">
                <button onClick={handleSave} className="bg-sc text-pr py-2 px-4 rounded-lg shadow-md">Save Changes</button>
              </div>
            )}

            {/* Password Change Section */}
            <div className="mt-8 ml-12">
              <h3 className="text-xl font-semibold text-sc mb-2">Change Password</h3>
              
              <div className="flex flex-col mb-2 w-1/3"> {/* Flex container for vertical stacking */}
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="border rounded px-2 py-1 mb-2" // Keep the width at 1/3
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border rounded px-2 py-1 mb-2" // Keep the width at 1/3
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border rounded px-2 py-1 mb-2" // Keep the width at 1/3
                />
              </div>

              <button onClick={handlePasswordChange} className="bg-sc text-pr py-2 px-4 rounded-lg shadow-md">Change Password</button>
              
              {passwordMessage && <p className="text-red-500 mt-2">{passwordMessage}</p>}
            </div>

          </>
        )}

        {activeTab === 'adopter' && (
          <div className="ml-12">
            <h2 className="text-2xl font-bold text-sc mb-4">Adopter Info</h2>
            <div className="space-y-4">
              <div>
                <label className="font-medium">Number of Animals:</label>
                <input
                  type="number"
                  value={numberOfAnimals}
                  onChange={(e) => setNumberOfAnimals(e.target.value)}
                  className="border rounded px-2 py-1 w-1/4"
                />
              </div>
              <div>
                <label className="font-medium">Type of House:</label>
                <select
                  value={houseType}
                  onChange={(e) => setHouseType(e.target.value)}
                  className="border rounded px-2 py-1 w-1/4"
                >
                  <option value="">Select</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Adopter Suitability:</label>
                <input
                  type="text"
                  value={adopterSuitability}
                  onChange={(e) => setAdopterSuitability(e.target.value)}
                  className="border rounded px-2 py-1 w-1/4"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'volunteer' && (
          <>
            <h2 className="text-2xl font-bold text-sc ml-12 mb-12">Volunteer Info</h2>
            <div className="space-y-4 ml-12">
              <div className="flex items-center">
                <span className="text-lg font-medium w-1/3">Preferred Roles:</span>
                <input
                  type="text"
                  value={preferredRoles}
                  onChange={(e) => setPreferredRoles(e.target.value)}
                  className="border rounded px-2 py-1 text-lg w-1/3"
                />
              </div>

              {/* Emergency Contact Name */}
              <div className="flex items-center">
                <span className="text-lg font-medium w-1/3">Emergency Contact Name:</span>
                <input
                  type="text"
                  value={emergencyContacts[0].name} // Use your state for emergency contact name
                  onChange={(e) => setEmergencyContacts([{ ...emergencyContacts[0], name: e.target.value }])}
                  className="border rounded px-2 py-1 text-lg w-1/3"
                />
              </div>

              {/* Emergency Contact Number */}
              <div className="flex items-center">
                <span className="text-lg font-medium w-1/3">Emergency Contact Number:</span>
                <input
                  type="text"
                  value={emergencyContacts[0].number} // Use your state for emergency contact number
                  onChange={(e) => setEmergencyContacts([{ ...emergencyContacts[0], number: e.target.value }])}
                  className="border rounded px-2 py-1 text-lg w-1/3"
                />
              </div>

              <div className="flex items-center">
                <span className="text-lg font-medium w-1/3">Volunteer Hours:</span>
                <input
                  type="number"
                  value={volunteerHours}
                  onChange={(e) => setVolunteerHours(e.target.value)}
                  className="border rounded px-2 py-1 text-lg w-1/3"
                />
              </div>

              {/* Add the Doughnut Chart here */}
              <div className="flex items-center ml-14">
                <div style={{ width: '200px', height: '200px' }}>
                  <Doughnut
                    data={{
                      labels: ['Hours Spent', 'Remaining Hours'],
                      datasets: [{
                        data: [volunteerHours, 24 - volunteerHours],
                        backgroundColor: ['#FF6384', '#36A2EB'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                      }],
                    }}
                  />
                </div>
                <span className="ml-4 text-lg font-medium">{volunteerHours} hours spent volunteering</span>
              </div>
            </div>
          </>
        )}



      </main>
    </div>
  );
};

export default Profile;
