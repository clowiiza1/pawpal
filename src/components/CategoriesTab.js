import React, { useState, useEffect } from 'react';
import { FaTrash, FaPen, FaPlusCircle } from 'react-icons/fa';
import { getCategories, deleteCategory, updateCategory, addCategory } from '../apis/api';
import Toast from './Toast'; // Adjust the import path as necessary

const CategoriesTab = () => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('all'); // Filter state for categories
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // State for add modal
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', animalType: 'Dog' }); // State for new category

  // State variables for toast messages
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const confirmDeleteCategory = async () => {
    if (selectedCategory) {
      await deleteCategory(selectedCategory.id);
      setCategories(categories.filter((category) => category !== selectedCategory));
      // Show success toast
      setToastMessage(`Deleted category "${selectedCategory.name}" successfully.`);
      setShowToast(true);
    }
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const saveEditCategory = async () => {
    if (selectedCategory) {
      const updatedCategory = await updateCategory(selectedCategory);
      setCategories(
        categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
      // Show success toast
      setToastMessage(`Updated category "${updatedCategory.name}" successfully.`);
      setShowToast(true);
    }
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const addNewCategory = async () => {
    if (newCategory.name && newCategory.animalType) {
      const addedCategory = await addCategory(newCategory);
      setCategories([...categories, addedCategory]);
      setShowAddModal(false);
      setNewCategory({ name: '', animalType: 'Dog' }); // Reset new category state
      // Show success toast
      setToastMessage(`Added category "${addedCategory.name}" successfully.`);
      setShowToast(true);
    }
  };

  const filteredCategories = categories.filter((category) => {
    if (filter === 'all') return true;
    if (filter === 'Dog,Cat') return category.animalType === 'Dog,Cat';
    return category.animalType.includes(filter);
  });

  // Function to handle closing the toast
  const handleCloseToast = () => {
    setShowToast(false);
    setToastMessage('');
  };

  return (
    <div className="ml-6 pb-4">
      <h2 className="text-2xl font-bold text-sc mb-4">Traits</h2>
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-sc text-pr' : 'bg-pr text-sc'
          }`}
          onClick={() => setFilter('all')}
        >
          All ({categories.length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filter === 'Dog' ? 'bg-sc text-pr' : 'bg-pr text-sc'
          }`}
          onClick={() => setFilter('Dog')}
        >
          Dog ({categories.filter((category) => category.animalType.includes('Dog')).length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filter === 'Cat' ? 'bg-sc text-pr' : 'bg-pr text-sc'
          }`}
          onClick={() => setFilter('Cat')}
        >
          Cat ({categories.filter((category) => category.animalType.includes('Cat')).length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filter === 'Dog,Cat' ? 'bg-sc text-pr' : 'bg-pr text-sc'
          }`}
          onClick={() => setFilter('Dog,Cat')}
        >
          Dog & Cat ({categories.filter((category) => category.animalType === 'Dog,Cat').length})
        </button>
      </div>
      {/* Categories Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-sc text-pr">
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4">Animal Type</th>
              <th className="py-3 px-4 text-right">
                <FaPlusCircle
                  className="cursor-pointer  text-st hover:text-st"
                  onClick={() => setShowAddModal(true)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">{category.name}</td>
                <td className="py-3 px-4">
                  {category.animalType === 'Dog,Cat' ? 'Dog & Cat' : category.animalType}
                </td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <FaPen
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditCategory(category)}
                  />
                  <FaTrash
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteCategory(category)}
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
              Are you sure you want to delete the category:{' '}
              <span className="font-semibold text-sc">{selectedCategory.name}</span>?
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={confirmDeleteCategory}
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
      {/* Edit Category Modal */}
      {showEditModal && selectedCategory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-pr p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold text-sc mb-4">Edit Category</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-lg font-medium text-sc w-1/4">Category Name:</span>
                <input
                  type="text"
                  name="name"
                  value={selectedCategory.name}
                  onChange={handleCategoryInputChange}
                  className="border border-st rounded px-2 py-1 text-lg w-3/4"
                />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium text-sc w-1/4">Animal Type:</span>
                <select
                  name="animalType"
                  value={selectedCategory.animalType}
                  onChange={handleCategoryInputChange}
                  className="border border-st rounded px-2 py-1 text-lg w-3/4"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Dog,Cat">Dog & Cat</option>
                </select>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                  onClick={saveEditCategory}
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
      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-pr p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold text-sc mb-4">Add Category</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-lg font-medium text-sc w-1/4">Category Name:</span>
                <input
                  type="text"
                  name="name"
                  value={newCategory.name}
                  onChange={handleNewCategoryChange}
                  className="border border-st rounded px-2 py-1 text-lg w-3/4"
                />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-medium text-sc w-1/4">Animal Type:</span>
                <select
                  name="animalType"
                  value={newCategory.animalType}
                  onChange={handleNewCategoryChange}
                  className="border border-st rounded px-2 py-1 text-lg w-3/4"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Dog,Cat">Dog & Cat</option>
                </select>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                  onClick={addNewCategory}
                >
                  Add
                </button>
                <button
                  className="px-4 py-2 bg-st text-pr rounded-lg hover:bg-sc"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Render Toast Message */}
      {showToast && <Toast message={toastMessage} onClose={handleCloseToast} />}
    </div>
  );
};

export default CategoriesTab;
