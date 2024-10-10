import React, { useState } from 'react';
import { setVolunteerInformation } from '../apis/api'; // Adjust the import based on your API

const VolunteerSignUp = ({ isOpen, onClose }) => {
  const [preferredRoles, setPreferredRoles] = useState('');
  const [volunteerHours, setVolunteerHours] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null; // Don't render if the popup is closed

  const validateForm = () => {
    const newErrors = {};
    if (!preferredRoles) {
      newErrors.preferredRoles = 'Please select your preferred roles';
    }
    if (!volunteerHours || volunteerHours < 0) {
      newErrors.volunteerHours = 'Please enter valid volunteer hours';
    }
    if (!emergencyContactName) {
      newErrors.emergencyContactName = 'Please enter the emergency contact name';
    }
    if (!emergencyContactNumber) {
      newErrors.emergencyContactNumber = 'Please enter the emergency contact number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const adopterInfo = {
        preferredRoles,
        volunteerHours,
        emergencyContactName,
        emergencyContactNumber,
      };

      try {
        const response = await setVolunteerInformation(adopterInfo);
        if (response) {
          alert('Information submitted successfully!'); // Adjust as needed
          onClose(); // Close the popup after submission
        } else {
          alert('Failed to submit information. Please try again.');
        }
      } catch (error) {
        console.error('Error in handleSubmit:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-lg w-full bg-sc rounded-lg shadow-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-200 text-2xl"
          aria-label="Close"
        >
          &times; {/* This represents the close icon (×) */}
        </button>
        <h1 className="text-3xl font-semibold text-pr mb-4 text-center">Volunteer Sign Up</h1>
        <p className="text-pr mb-6 text-center">
          Please fill in the fields below to sign up as a volunteer.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Preferred Roles Dropdown */}
          <div className="mb-4">
            <label htmlFor="preferredRoles" className="block text-pr font-semibold mb-2">
              Preferred Roles
              <span className="ml-2 text-st" title="Select your preferred roles for volunteering.">?</span>
            </label>
            <select
              id="preferredRoles"
              value={preferredRoles}
              required
              onChange={(e) => setPreferredRoles(e.target.value)}
              className={`w-full p-3 border ${errors.preferredRoles ? 'border-red-500' : 'border-st'} rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-sc`}
            >
              <option value="">Preferred Role</option>
              <option value="Provide general care">Provide general care</option>
              <option value="Take our dogs for walks">Take our dogs for walks</option>
              <option value="Write creative bios">Write creative bios</option>
              <option value="Photograph our animals">Photograph our animals</option>
            </select>
            {errors.preferredRoles && <p className="text-red-500 text-sm mt-1">{errors.preferredRoles}</p>}
          </div>

          {/* Volunteer Hours Input */}
          <div className="mb-4">
            <label htmlFor="volunteerHours" className="block text-pr font-semibold mb-2">
              Volunteer Hours
              <span className="ml-2 text-st" title="Enter the number of volunteer hours you can commit.">?</span>
            </label>
            <input
              type="number"
              id="volunteerHours"
              value={volunteerHours}
              required
              onChange={(e) => setVolunteerHours(e.target.value)}
              className={`w-full p-3 border ${errors.volunteerHours ? 'border-red-500' : 'border-st'} rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-sc`}
              placeholder="Please enter the number of volunteer hours"
            />
            {errors.volunteerHours && <p className="text-red-500 text-sm mt-1">{errors.volunteerHours}</p>}
          </div>

          {/* Emergency Contact Name Input */}
          <div className="mb-4">
            <label htmlFor="emergencyContactName" className="block text-pr font-semibold mb-2">
              Emergency Contact Name
              <span className="ml-2 text-st" title="Enter the name of your emergency contact.">?</span>
            </label>
            <input
              type="text"
              id="emergencyContactName"
              value={emergencyContactName}
              required
              onChange={(e) => setEmergencyContactName(e.target.value)}
              className={`w-full p-3 border ${errors.emergencyContactName ? 'border-red-500' : 'border-st'} rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-sc`}
              placeholder="Please enter the emergency contact name"
            />
            {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
          </div>

          {/* Emergency Contact Number Input */}
          <div className="mb-4">
            <label htmlFor="emergencyContactNumber" className="block text-pr font-semibold mb-2">
              Emergency Contact Number
              <span className="ml-2 text-st" title="Enter the phone number of your emergency contact.">?</span>
            </label>
            <input
              type="text"
              id="emergencyContactNumber"
              value={emergencyContactNumber}
              required
              onChange={(e) => setEmergencyContactNumber(e.target.value)}
              className={`w-full p-3 border ${errors.emergencyContactNumber ? 'border-red-500' : 'border-st'} rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-sc`}
              placeholder="Please enter the emergency contact number"
            />
            {errors.emergencyContactNumber && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactNumber}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-st text-white font-semibold rounded-lg shadow hover:bg-br transition duration-200"
          >
            Submit Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerSignUp;
