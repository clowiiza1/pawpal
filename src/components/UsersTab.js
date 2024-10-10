import React, { useState, useEffect } from 'react';
import { FaTrash, FaPen, FaPlusCircle, FaFilePdf, FaSortAlphaDown, FaSortAlphaUp, FaBan } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getAllUsers, getUserRoles } from '../apis/api'; // Assuming you have the getAllUsers API call

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order (asc or desc)
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserInstructions, setShowAddUserInstructions] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserRoles, setCurrentUserRoles] = useState(['Admin']); // Assuming the current user is an Admin
  const [hoveredItem, setHoveredItem] = useState(null); // Track hover state

  useEffect(() => {
    const fetchCurrentUserRoles = async () => {
      try {
        // Example API call to get current user's roles
        const rolesFromApi = await getUserRoles(); // This returns an array of objects
  
        // Extract the "name" property from each role object
        const roleNames = rolesFromApi.map(role => role.name);
  
        // Set the current user roles as an array of role names (e.g., ['Staff', 'Adopter'])
        setCurrentUserRoles(roleNames);
      } catch (error) {
        console.error("Error fetching current user roles:", error);
      }
    };
  
    fetchCurrentUserRoles();
  }, []);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
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
        if (roleCounts[role.name] !== undefined) {
          roleCounts[role.name]++;
        }
      });
    });
    return roleCounts;
  };

  const roleCounts = getRoleCounts();

  // Sorting function
  const sortUsers = (users) => {
    return [...users].sort((a, b) => {
      const lastNameA = a.lastName.toLowerCase();
      const lastNameB = b.lastName.toLowerCase();
      if (lastNameA < lastNameB) return sortOrder === 'asc' ? -1 : 1;
      if (lastNameA > lastNameB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredUsers = sortUsers(
    users.filter((user) => {
      if (filter === 'all') {
        return true;
      }
      return user.roles.some((role) => role.name === filter);
    })
  );

  const isStaffRestricted = (user) => {
    const restrictedRoles = ['Admin', 'Staff']; // Roles that restrict actions
    const userRoleNames = user.roles.map(role => role.name); // Get all role names for the user
    
    // If the current user is "Staff" and the target user has restricted roles, return true
    return currentUserRoles.includes('Staff') && userRoleNames.some(role => restrictedRoles.includes(role));
  };
  

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString(); // Get the current date
    const pageWidth = doc.internal.pageSize.getWidth(); // Get page width for centering text
  
    // Set the statement color (#6C4E31) for all text
    doc.setTextColor(108, 78, 49); // RGB equivalent of #6C4E31
  
    // Add current date at the top-left
    doc.text(currentDate, 10, 10);
  
    // Add "Detailed Users Report" heading centered
    const title = "Detailed Users Report";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 20);
  
    // Sort users by last name ascending before generating the report
    const sortedUsers = [...users].sort((a, b) => {
      const lastNameA = a.lastName.toLowerCase();
      const lastNameB = b.lastName.toLowerCase();
      return lastNameA < lastNameB ? -1 : lastNameA > lastNameB ? 1 : 0;
    });
  
    // Define the table columns and rows
    const tableColumn = ['First Name', 'Last Name', 'Email', 'Phone Number', 'Age', 'Roles'];
    const tableRows = [];
  
    sortedUsers.forEach((user) => {
      const roles = user.roles.map(role => role.name).join(', ');
      const userData = [
        user.firstName,
        user.lastName,
        user.email,
        user.phoneNumber,
        user.age,
        roles,
      ];
      tableRows.push(userData);
    });
  
    // Add the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: {
        fillColor: [108, 78, 49], // Set the statement color (RGB for #6C4E31)
        halign: 'center', // Align header text to the center
        textColor: [255, 255, 255], // Set text color to white for contrast
      },
      styles: {
        halign: 'center', // Align body text in the center for the entire table
        textColor: [108, 78, 49], // Statement color for body text
      },
    });
  
    // Footer with page count and "End of Report"
    const pageCount = doc.internal.getNumberOfPages(); // Total pages
    const pageText = `Page ${pageCount} of ${pageCount}`;
  
    // Add footer: Page count and End of Report
    doc.text(pageText, 10, doc.internal.pageSize.height - 10); // Page count at bottom-left
    doc.text('*End of Report*', pageWidth / 2 - 20, doc.internal.pageSize.height - 10); // End of report at bottom-center
  
    // Save the PDF with a filename
    doc.save('users_report.pdf');
  };
  
  const handleEditUser = (user) => {
    if (isStaffRestricted(user)) {
      return; // Block Staff from editing Admin or Staff users
    }
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    if (isStaffRestricted(user)) {
      return; // Block Staff from deleting Admin or Staff users
    }
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter((user) => user !== selectedUser));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const saveEditUser = () => {
    setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
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
      
      <div className="flex space-x-4 mb-6 items-center">
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

        {/* Sort by Last Name Button */}
        <button
          className="px-4 py-2 bg-sc text-pr rounded-lg hover:bg-st flex items-center"
          onClick={toggleSortOrder}
        >
          Sort by Last Name {sortOrder === 'asc' ? <FaSortAlphaDown className="ml-2" /> : <FaSortAlphaUp className="ml-2" />}
        </button>

        {/* Export to PDF Button */}
        <button
          className="px-4 py-2 bg-sc text-pr rounded-lg hover:bg-st flex items-center"
          onClick={handleExportToPDF}
        >
          <FaFilePdf className="ml-2" /> Export to PDF
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
            {filteredUsers.map((user, index) => {
              const roleNames = user.roles.map(role => role.name).join(' & '); // Join roles for display
              const isRestricted = isStaffRestricted(user); // Call the function to check for restrictions

              return (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{user.firstName}</td>
                  <td className="py-3 px-4">{user.lastName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phoneNumber}</td>
                  <td className="py-3 px-4">{user.age}</td>
                  <td className="py-3 px-4">{roleNames}</td>
                  <td className="py-3 px-4 flex justify-center space-x-2 relative">
                    {/* Edit Icon */}
                    <div
                      className="relative"
                      onMouseEnter={() => setHoveredItem(`edit-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {isRestricted ? (
                      <FaPen className="text-blue-200 cursor-not-allowed" />
                    ) : (
                      <FaPen className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => handleEditUser(user)} />
                    )}
                    {isRestricted && hoveredItem === `edit-${index}` && (
                      <div className="absolute bottom-full mb-2 text-sm bg-gray-200 text-gray-700 p-2 rounded-md shadow-lg">
                        You are not authorized to edit Admin or Staff users.
                      </div>
                    )}
                    </div>
                    
                    {/* Delete Icon */}
                    <div
                      className="relative"
                      onMouseEnter={() => setHoveredItem(`delete-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {isRestricted ? (
                      <FaTrash className="text-red-200 cursor-not-allowed" />
                    ) : (
                      <FaTrash className="cursor-pointer text-red-500 hover:text-red-700" onClick={() => handleDeleteUser(user)} />
                    )}
                      {isRestricted && hoveredItem === `delete-${index}` && (
                        <div className="absolute bottom-full mb-2 text-sm bg-gray-200 text-gray-700 p-2 rounded-md shadow-lg">
                          You are not authorized to delete Admin or Staff users.
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
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
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-sc mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete{' '}
              <span className="font-semibold text-sc">{`${selectedUser.firstName} ${selectedUser.lastName}`}</span>?
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
