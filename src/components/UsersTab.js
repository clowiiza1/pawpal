import React, { useState, useEffect } from 'react';
import { FaTrash, FaPen, FaPlusCircle, FaFilePdf, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getAllUsers } from '../apis/api'; // Assuming you have the getAllUsers API call

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
    return (
      currentUserRoles.includes('Staff') &&
      (user.roles.some(role => role.name === 'Admin') || user.roles.some(role => role.name === 'Staff'))
    );
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
      return; // Restrict Staff from editing Admin or Staff users
    }
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    if (isStaffRestricted(user)) {
      return; // Restrict Staff from deleting Admin or Staff users
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
              const roleNames = user.roles.map(role => role.name).join(' & ');
              const isStaffRestricted =
                currentUserRoles.includes('Staff') && (user.roles.includes('Admin') || user.roles.includes('Staff')) ;

              return (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{user.firstName}</td>
                  <td className="py-3 px-4">{user.lastName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phoneNumber}</td>
                  <td className="py-3 px-4">{user.age}</td>
                  <td className="py-3 px-4">{roleNames}</td>
                  <td className="py-3 px-4 flex justify-center space-x-2 relative">
                    <div
                      className="relative"
                      onMouseEnter={() => setHoveredItem(`edit-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <FaPen
                        className={`cursor-pointer text-blue-500 hover:text-blue-700 ${
                          isStaffRestricted ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        onClick={() => !isStaffRestricted && handleEditUser(user)}
                      />
                      {isStaffRestricted && hoveredItem === `edit-${index}` && (
                        <div className="absolute bottom-full mb-2 text-sm bg-gray-200 text-gray-700 p-2 rounded-md shadow-lg">
                          You are not authorized to edit Admin or Staff users.
                        </div>
                      )}
                    </div>
                    <div
                      className="relative"
                      onMouseEnter={() => setHoveredItem(`delete-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <FaTrash
                        className={`cursor-pointer text-red-500 hover:text-red-700 ${
                          isStaffRestricted ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        onClick={() => !isStaffRestricted && handleDeleteUser(user)}
                      />
                      {isStaffRestricted && hoveredItem === `delete-${index}` && (
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
    </div>
  );
};

export default UsersTab;
