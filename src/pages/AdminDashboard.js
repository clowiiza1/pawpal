import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersTab from '../components/UsersTab';
import CategoriesTab from '../components/CategoriesTab';
import BookingsTab from '../components/BookingsTab';
import ReportsTab from '../components/ReportsTab';
import AnimalsTab from '../components/AnimalsTab';
import AnimalTraitsTab from '../components/AnimalTraitsTab';
import { getUserRoles } from '../apis/api'; // Import the API call

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); // Default tab set to categories for demonstration
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Call the API to fetch user roles when the component mounts
    const checkUserRole = async () => {
      try {
        const roles = await getUserRoles();
        const isAdminOrStaff = roles.some(role => role.name === 'Admin' || role.name === 'Staff');

        if (!isAdminOrStaff) {
          // Redirect the user if they don't have the required role
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        // Optionally handle error (e.g., redirect to an error page)
        navigate('/unauthorized'); // Redirect to an unauthorized page on error
      }
    };

    checkUserRole();
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen mb-2">
      <aside className="w-1/4 h-screen bg-st p-8 flex flex-col rounded-3xl ml-4 mt-4">
        <h1 className="text-2xl text-sc font-bold mb-8 justify-center">Staff Dashboard</h1>
        <ul className="space-y-6">
          <li>
            <button
              className={`w-full ${activeTab === 'users' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('users')}
            >
              Users
            </button>
          </li>
          
          <li>
            <button
              className={`w-full ${activeTab === 'bookings' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('bookings')}
            >
              Bookings
            </button>
          </li>
          <li>
            <button
              className={`w-full ${activeTab === 'animals' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('animals')}
            >
              Animals
            </button>
          </li>
          <li>
            <button
              className={`w-full ${activeTab === 'categories' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('categories')}
            >
              Traits
            </button>
          </li>
          <li>
            <button
              className={`w-full ${activeTab === 'animaltraits' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('animaltraits')}
            >
             Animal Traits
            </button>
          </li>
          <li>
            <button
              className={`w-full ${activeTab === 'reports' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('reports')}
            >
              Reports
            </button>
          </li>
        </ul>
      </aside>
      
      <main className="flex-1 p-4 bg-pr rounded-2xl mt-4">
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'categories' && <CategoriesTab />}
        {activeTab === 'bookings' && <BookingsTab />}
        {activeTab === 'reports' && <ReportsTab />}
        {activeTab === 'animals' && <AnimalsTab />}
        {activeTab === 'animaltraits' && <AnimalTraitsTab />}
        {/* Add other tab components here */}
      </main>
    </div>
  );
};

export default AdminDashboard;
