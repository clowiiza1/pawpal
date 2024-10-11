import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { getUserByUsername, updateUser, getAdopterSuitabilityByUsername, updateAdopterSuitability, getVolunteerInfoByUserId, updateVolunteerInfo } from '../apis/api'; // API functions
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import UserBookingsTab from '../components/UsersBookingTab';
import Toast from '../components/Toast';

ChartJS.register(ArcElement, Tooltip, Legend);

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [userId, setUserId] = useState(null); 
  const [roles, setRoles] = useState([]); 
  const [username, setUsername] = useState('');
  const [showToast, setShowToast] = useState(false); // State to manage toast visibility
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState('main'); // State for active tab

  // State for adopter info
  const [numberOfAnimals, setNumberOfAnimals] = useState('');
  const [houseType, setHouseType] = useState('');

  // State for volunteer info
  const [preferredRoles, setPreferredRoles] = useState('');
  const [volunteerHours, setVolunteerHours] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', number: '' }]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const extractUsernameFromToken = (token) => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub; // Adjust based on your token structure
      } catch (error) {
        console.error('Error extracting username from token:', error);
        return null;
      }
    };

    const fetchProfileAndInfo = async () => {
      const usernameFromToken = extractUsernameFromToken(token);

      if (usernameFromToken) {
        // Fetch user profile
        const userData = await getUserByUsername(usernameFromToken);
        if (userData) {
          setFirstName(userData.firstName || '');
          setLastName(userData.lastName || '');
          setEmail(userData.email || '');
          setPhoneNumber(userData.phoneNumber || '');
          setAge(userData.age || '');
          setUsername(userData.username || '');
          setUserId(userData.id || null);
        }

        // Fetch adopter suitability info
        const adopterData = await getAdopterSuitabilityByUsername(usernameFromToken);
        if (adopterData) {
          setNumberOfAnimals(adopterData.noOfAnimals || '');
          setHouseType(adopterData.houseType || '');
        }

        // Fetch volunteer info
        const volunteerData = await getVolunteerInfoByUserId();
        if (volunteerData) {
          setPreferredRoles(volunteerData.preferredRoles || '');
          setVolunteerHours(volunteerData.volunteerHours || 0);
          setEmergencyContacts([{ name: volunteerData.emergencyContactName, number: volunteerData.emergencyContactNumber }]);
        }
      }
    };

    fetchProfileAndInfo();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setEditingField(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleAdopterSave = async () => {
    const updatedAdopterInfo = {
      noOfAnimals: numberOfAnimals,
      houseType: houseType,
    };
  
    try {
      await updateAdopterSuitability(updatedAdopterInfo); 
      setToastMessage('Adopter info updated successfully!');
      setShowToast(true);
    } catch (error) {
      console.error('Error updating adopter info:', error);
      setToastMessage('Error updating adopter info.');
      setShowToast(true);
    }
  };

  const handleVolunteerSave = async () => {
    const updatedVolunteerInfo = {
      preferredRoles,
      emergencyContactName: emergencyContacts[0].name,
      emergencyContactNumber: emergencyContacts[0].number,
      volunteerHours: 0, // Set to 0 as per requirement
    };

    try {
      await updateVolunteerInfo(updatedVolunteerInfo);
      setToastMessage('Volunteer info updated successfully!');
      setShowToast(true);
    } catch (error) {
      console.error('Error updating volunteer info:', error);
      setToastMessage('Error updating volunteer info.');
      setShowToast(true);
    }
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

  const handleSave = async () => {
    if (userId) {
      const updatedUser = {
        id: userId,
        firstName,
        lastName,
        email,
        username, 
        phoneNumber,
        age,
        roles,
      };

      try {
        await updateUser(updatedUser); 
        setIsModified(false);
        setEditingField(null);
        setToastMessage('User information updated successfully!');
        setShowToast(true);
      } catch (error) {
        console.error('Error updating user:', error);
        setToastMessage('Error updating user information.');
        setShowToast(true); 
      }
    }
  };

  const roleNames = roles.map(role => role.name).join(', ');

  const chartData = {
    labels: ['Hours Spent', 'Remaining Hours'],
    datasets: [{
      data: [volunteerHours, 24 - volunteerHours],
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB'],
    }],
  };

  return (
    <div className="flex h-screen p-4">
      <aside className="w-1/4 bg-st p-8 flex flex-col rounded-tl-3xl rounded-3xl ml-4">
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
          <li>
            <button
              className={`w-full ${activeTab === 'bookings' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => setActiveTab('bookings')}
            >
              My Bookings
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
                  <option value="Farm">Farm</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Residential">Residential</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
              </div>
              <div className="mt-4">
                <button onClick={handleAdopterSave} className="bg-sc text-pr py-2 px-4 rounded-lg shadow-md">Save Adopter Info</button>
              </div>
            </div>
          </div>
        )}

        {showToast && (
          <Toast
            message={toastMessage}
            onClose={() => setShowToast(false)}
          />
        )}

        {activeTab === 'volunteer' && (
          <>
            <h2 className="text-2xl font-bold text-sc ml-12 mb-12">Volunteer Info</h2>
            <div className="space-y-4 ml-12">
              <div className="flex items-center">
                <span className="text-lg font-medium w-1/3">Preferred Roles:</span>
                <select
                  value={preferredRoles}
                  onChange={(e) => setPreferredRoles(e.target.value)}
                  className="border rounded px-2 py-1 text-lg w-1/3"
                >
                  <option value="">Preferred Role</option>
                  <option value="Provide general care">Provide general care</option>
                  <option value="Take our dogs for walks">Take our dogs for walks</option>
                  <option value="Write creative bios">Write creative bios</option>
                  <option value="Photograph our animals">Photograph our animals</option>
                </select>
              </div>

              <div className="flex items-center">
                <span className="text-lg font-medium w-1/3">Emergency Contact Name:</span>
                <input
                  type="text"
                  value={emergencyContacts[0].name} 
                  onChange={(e) => setEmergencyContacts([{ ...emergencyContacts[0], name: e.target.value }])}
                  className="border rounded px-2 py-1 text-lg w-1/3"
                />
              </div>

              <div className="flex items-center">
                <span className="text-lg font-medium w-1/3">Emergency Contact Number:</span>
                <input
                  type="text"
                  value={emergencyContacts[0].number} 
                  onChange={(e) => setEmergencyContacts([{ ...emergencyContacts[0], number: e.target.value }])}
                  className="border rounded px-2 py-1 text-lg w-1/3"
                />
              </div>

              {/* Doughnut Chart */}
              <div className="flex items-center ml-14">
                <div style={{ width: '200px', height: '200px' }}>
                  <Doughnut
                    data={chartData}
                  />
                </div>
                <span className="ml-4 text-lg font-medium">{volunteerHours} hours spent volunteering</span>
              </div>

              <div className="mt-4">
                <button onClick={handleVolunteerSave} className="bg-sc text-pr py-2 px-4 rounded-lg shadow-md">Update Volunteer Info</button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookings' && <UserBookingsTab />}
      </main>
    </div>
  );
};

export default Profile;
