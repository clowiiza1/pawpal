import React from 'react';
import dogImg from './dog.jpg';
import catImg from './cat.jpg';

const Popup = ({ isOpen, onClose, animal, allCategories, animalCategories, handleCategoryToggle, handleSaveCategories }) => {
    if (!isOpen || !animal) return null;
  
    const imageUrl = animal.imageUrl || (animal.species.toLowerCase() === 'dog' ? dogImg : catImg);
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-pr p-8 rounded-lg shadow-lg w-3/4 max-w-5xl flex relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-200 text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
  
          {/* Animal Image */}
          <div className="w-1/2 p-4">
            <img src={imageUrl} alt={animal.name} className="w-96 h-80 object-cover rounded-lg" />
          </div>
  
          {/* Animal Category Section */}
          <div className="w-2/3 p-6 bg-pr rounded-lg flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-semibold mb-2">Manage {animal.name}'s traits':</h4>
  
              {/* Display current animal categories */}
              <div className="flex flex-wrap">
                {allCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`px-4 py-2 m-1 rounded-lg ${
                      animalCategories.includes(category.id) ? 'bg-sc text-pr' : 'bg-pr text-sc'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Save Button */}
            <button
              onClick={handleSaveCategories}
              className="mt-4 px-6 py-3 font-poppins text-m rounded-lg bg-st text-white shadow-lg hover:bg-sc transition duration-300"
            >
              Save Categories
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  

export default Popup;
