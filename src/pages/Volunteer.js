import React, { useEffect, useState } from 'react';
import bottlefedkitten from './bottlefedkitten.png';
import VolunteerSignUp from '../components/VolunteerSignUp'; // Import the VolunteerSignUp component

const Volunteer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Main Heading */}
      <h2 className="text-5xl font-bold text-center mb-8">
        Some ways <span className="underline decoration-st">you can help</span>
      </h2>

      {/* Image and Volunteer Information */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={bottlefedkitten}
            className="rounded-lg bg-st"
            style={{
              boxShadow: '20px 20px 0px #D8AE7E' // Statement color
            }}
            alt=""
          />
        </div>

        {/* Volunteer Info Section */}
        <div className="w-full md:w-1/2 flex flex-col items-start pl-4">
          <h3 className="text-xl font-semibold text-sc mb-4">Volunteer your time</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, British Shorthair do eiusmod tempor incididunt. Tempor orci eu Shiba Inu lobortis elementum nibh.
          </p>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, British Shorthair do eiusmod tempor incididunt. Tempor orci eu Shiba Inu lobortis elementum nibh.
          </p>
        </div>
      </div>

      {/* "We're looking for" Section */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
        <h3 className="text-center text-2xl font-semibold text-sc mb-8">
          We're looking for people who can:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Task 1 */}
          <div className="text-center">
            <div className="bg-st p-4 rounded-full inline-block mb-4">
              ✂️ 
            </div>
            <p className="text-lg font-medium text-gray-700">Provide general care</p>
            <p className="text-gray-500 text-sm">
              Including feeding, washing, and grooming our rescue animals.
            </p>
          </div>

          {/* Task 2 */}
          <div className="text-center">
            <div className="bg-st p-4 rounded-full inline-block mb-4">
              🐕 
            </div>
            <p className="text-lg font-medium text-gray-700">Take our dogs for walks</p>
            <p className="text-gray-500 text-sm">
              Help socialize them and give them love and care.
            </p>
          </div>

          {/* Task 3 */}
          <div className="text-center">
            <div className="bg-st p-4 rounded-full inline-block mb-4">
              ✍️ 
            </div>
            <p className="text-lg font-medium text-gray-700">Write creative bios</p>
            <p className="text-gray-500 text-sm">
              Help write content for our website and social media channels.
            </p>
          </div>

          {/* Task 4 */}
          <div className="text-center">
            <div className="bg-st p-4 rounded-full inline-block mb-4">
              📸
            </div>
            <p className="text-lg font-medium text-gray-700">Photograph our animals</p>
            <p className="text-gray-500 text-sm">
              Capture photos of cats and dogs to share with potential adopters.
            </p>
          </div>
        </div>
      </div> {/* Closing tag for "We're looking for" Section */}

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-lg text-gray-600 mb-4">If you have these skills, we'd love to meet you!</p>
        <button 
          className="bg-st hover:bg-pr hover:text-sc text-pr font-bold py-3 px-8 rounded-lg shadow-lg"
          onClick={() => setIsPopupOpen(true)} // Open the popup on click
        >
          Become a Volunteer!
        </button>
      </div>

      {/* Volunteer Sign Up Popup */}
      <VolunteerSignUp 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} // Close the popup
      />
    </div>
  );
};

export default Volunteer;
