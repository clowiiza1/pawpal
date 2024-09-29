import React, { useState, useEffect } from 'react';
import { FaTrash, FaPen, FaPlusCircle } from 'react-icons/fa';

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserInstructions, setShowAddUserInstructions] = useState(false); // State for showing instructions modal
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Mock API call to fetch users
    const fetchUsers = async () => {
      const usersData = [
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890', age: 30, roles: ['Staff'] },
        { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', phone: '0987654321', age: 25, roles: ['Adopter'] },
        { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', phone: '1111111111', age: 28, roles: ['Volunteer'] },
        { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phone: '2222222222', age: 35, roles: ['Admin'] },
      ];
      setUsers(usersData); // Set fetched users data to state
    };
    fetchUsers();
  }, []);

  const getRoleCounts = () => {
    const roleCounts = {
      all: users.length,
      Staff: 0,
      Adopter: 0,
      Volunteer: 0,
      Admin: 0,
    };
    users.forEach((user) => {
      user.roles.forEach((role) => {
        if (roleCounts[role] !== undefined) {
          roleCounts[role]++;
        }
      });
    });
    return roleCounts;
  };

  const roleCounts = getRoleCounts();

  const filteredUsers = users.filter((user) => filter === 'all' || user.roles.includes(filter));

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter((user) => user !== selectedUser));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const saveEditUser = () => {
    setUsers(users.map((user) => (user.email === selectedUser.email ? selectedUser : user)));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setSelectedUser((prevUser) => ({
      ...prevUser,
      roles: prevUser.roles.includes(role)
        ? prevUser.roles.filter((r) => r !== role)
        : [...prevUser.roles, role],
    }));
  };

  return (
    <div className="ml-6">
      <h2 className="text-2xl font-bold text-sc mb-4">Users</h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('all')}
        >
          All ({roleCounts.all})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'Staff' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('Staff')}
        >
          Staff ({roleCounts.Staff})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'Adopter' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('Adopter')}
        >
          Adopter ({roleCounts.Adopter})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'Volunteer' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('Volunteer')}
        >
          Volunteer ({roleCounts.Volunteer})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'Admin' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('Admin')}
        >
          Admin ({roleCounts.Admin})
        </button>
      </div>
      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-sc text-pr">
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">Email Address</th>
              <th className="py-3 px-4">Phone Number</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">Roles</th>
              <th className="py-3 px-4 text-center">
              <FaPlusCircle
                  className="cursor-pointer text-st hover:text-st"
                  onClick={() => setShowAddUserInstructions(true)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">{user.firstName}</td>
                <td className="py-3 px-4">{user.lastName}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone}</td>
                <td className="py-3 px-4">{user.age}</td>
                <td className="py-3 px-4">{user.roles.join(', ')}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <FaPen
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditUser(user)}
                  />
                  <FaTrash
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteUser(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-sc mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete <span className="font-semibold text-sc">{`${selectedUser.firstName} ${selectedUser.lastName}`}</span>?
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={confirmDeleteUser}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-st text-pr rounded-lg hover:bg-sc"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-pr p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold text-sc mb-4">Edit User</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-lg font-medium text-sc w-1/4">First Name:</span>
                <input
                  type="text"
                  name="firstName"
                  value={selectedUser.firstName}
                  onChange={handleInputChange}
                  className="border border-st rounded px-2 py-1 text-lg w-3/4"
                />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium text-sc w-1/4">Last Name:</span>
                <input
                  type="text"
                  name="lastName"
                  value={selectedUser.lastName}
                  onChange={handleInputChange}
                  className="border border-st rounded px-2 py-1 text-lg w-3/4"
                />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium text-sc w-1/4">Email:</span>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleInputChange}
                  className="border border-st rounded px-2 py-1 text-lg w-3/4"
                />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium text-sc w-1/4">Phone:</span>
                <input
                  type="text"
                  name="phone"
                  value={selectedUser.phone}
                  onChange={handleInputChange}
                  className="border border-st rounded px-2 py-1 text-lg w-3/4"
                />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium text-sc w-1/4">Age:</span>
                <input
                  type="number"
                  name="age"
                  value={selectedUser.age}
                  onChange={handleInputChange}
                  className="border border-st rounded px-2 py-1 text-lg w-3/4"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-sc">Roles:</span>
                <div className="flex space-x-4 text-sc">
                  {['Staff', 'Adopter', 'Volunteer', 'Admin'].map((role) => (
                    <label key={role} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedUser.roles.includes(role)}
                        onChange={() => handleRoleChange(role)}
                      />
                      <span>{role}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                  onClick={saveEditUser}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-st text-pr rounded-lg hover:bg-sc"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add User Instructions Modal */}
      {showAddUserInstructions && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold text-sc mb-4">How to Add a User</h2>
            <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2">
              <p>Step 1: Navigate to the Signup page and register the new user on the site.</p>
              <p>Step 2: The admin must then log in to the Admin Dashboard.</p>
              <p>Step 3: The admin should find and edit the newly created user.</p>
              <p>Step 4: The admin can change the role type of the user as needed.</p>
            </ol>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-st text-pr rounded-lg hover:bg-sc"
                onClick={() => setShowAddUserInstructions(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTab;
