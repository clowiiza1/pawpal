import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faHome, faCalendar } from '@fortawesome/free-solid-svg-icons';

const VolunteerSignUp = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(''); // State for the selected date
  const [isSubmitted, setIsSubmitted] = useState(false); // State to control confirmation message
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  if (!isOpen) return null; // Only render when the popup is open

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you can handle the submission of the volunteer details
    const volunteerDetails = { name, address, email, date }; // Include date
    console.log('Volunteer Details:', volunteerDetails);
    
    // Set the submission state to true to show confirmation message
    setIsSubmitted(true);
  };

  const handleCloseConfirmation = () => {
    setIsSubmitted(false); // Reset the confirmation state
    onClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-pr p-8 rounded-lg shadow-lg w-3/4 max-w-5xl flex relative">
        {/* Close Button */}
        <button
          onClick={handleCloseConfirmation}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-200 text-2xl"
          aria-label="Close"
        >
          &times; {/* This represents the close icon (×) */}
        </button>

        {/* Confirmation Message */}
        {isSubmitted ? (
          <div className="w-full p-6 bg-pr rounded-lg flex flex-col">
            <h3 className="text-3xl font-bold mb-4">Thank You for Signing Up!</h3>
            <p className="mb-4">You have chosen to volunteer on: <strong>{date}</strong></p>
            <button
              onClick={handleCloseConfirmation}
              className="px-6 py-3 mt-4 font-poppins text-m rounded-lg bg-st text-pr shadow-lg hover:bg-st transition duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          /* Volunteer Sign Up Form */
          <div className="w-full p-6 bg-pr rounded-lg flex flex-col">
            <h3 className="text-3xl font-bold mb-4">Volunteer Sign Up</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {/* Name Field */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1" htmlFor="name">
                  Please provide your full name:
                </label>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-black" />
                  <input
                    type="text"
                    id="name" // Added id for accessibility
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1" htmlFor="address">
                  Please enter your home address:
                </label>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faHome} className="mr-2 text-black" />
                  <input
                    type="text"
                    id="address" // Added id for accessibility
                    placeholder="Your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1" htmlFor="email">
                  Please enter your email address:
                </label>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-black" />
                  <input
                    type="email"
                    id="email" // Added id for accessibility
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              {/* Date Picker Field */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1" htmlFor="date">
                  Pick a day you would like to volunteer:
                </label>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2 text-black" />
                  <input
                    type="date"
                    id="date" // Added id for accessibility
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
                  />
                </div>
              </div>
              <div><p className = "font-semibold text-black">Volunteering hours are from 10 am to 1 pm, Monday to Saturday</p></div>
              <button
                type="submit"
                className="px-6 py-3 mt-4 font-poppins text-m rounded-lg bg-st text-pr shadow-lg hover:bg-st transition duration-300"
              >
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerSignUp;
