import React, { useState } from 'react';
import UsersTab from '../components/UsersTab';
import CategoriesTab from '../components/CategoriesTab';
import BookingsTab from '../components/BookingsTab';
import ReportsTab from '../components/ReportsTab';
// Import other tab components here

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('categories'); // Default tab set to categories for demonstration

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-1/4 h-screen bg-st p-8 flex flex-col rounded-3xl ml-4 mt-4">
        <h1 className="text-2xl text-sc font-bold mb-8 justify-center">Admin Dashboard</h1>
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
              className={`w-full ${activeTab === 'categories' ? 'bg-sc text-pr' : 'bg-pr text-sc'} py-4 text-lg font-bold rounded-lg shadow-md`}
              onClick={() => handleTabChange('categories')}
            >
              Categories
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
        {/* Add other tab components here */}
      </main>
    </div>
  );
};

export default AdminDashboard;
