import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProtectedData } from '../apis/api'; // Example of fetching user data from an authenticated route

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getProtectedData(); // Example of calling an API to get profile data
        setUserData(response.data); // Assuming the response has user data
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login after logout
  };

  if (loading) return <p>Loading profile...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {userData ? (
        <div>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {/* Add more fields as needed */}

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
