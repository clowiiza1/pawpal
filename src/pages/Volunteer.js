import React, { useEffect, useState } from 'react';
import dogwalk from './dogwalk.jpg';
import VolunteerSignUp from '../components/VolunteerSignUp'; // Import the VolunteerSignUp component
import Calendar from 'react-calendar'; // Import the react-calendar package
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import './CalendarStyles.css'; // Import custom CSS for calendar styling
import { bookVolunteer } from '../apis/api';
import { getVolunteerValid } from '../apis/api';

const Volunteer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage volunteer sign-up popup visibility
  const [isVolunteerValid, setIsVolunteerValid] = useState(true); // State to hold validation
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to manage selected date
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false); // State to manage confirmation popup visibility

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
    fetchVolunteerValidation();
  }, []);

  const fetchVolunteerValidation = async () => {
    const valid = await getVolunteerValid(); // Check if the user is valid
    setIsVolunteerValid(valid); // Set the state based on the response
  };

  // Function to handle the confirmation button click
  const handleBookClick = async () => {
    if (!isVolunteerValid) {
      setIsPopupOpen(true); // Open volunteer information popup
    } else {
      setIsConfirmationPopupOpen(true); // Open confirmation popup
    }
  };

  // Function to handle confirmation response
  const handleConfirmationResponse = async (confirm) => {
    setIsConfirmationPopupOpen(false); // Close confirmation popup
    if (confirm) {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:8080/booking/volunteer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*', // Specify content type as plain text
            'Authorization': `Bearer ${token}`,

          },
          body: formattedDate, // Send formatted date as body
        });
        
        if (response.ok) {
          alert(`You have successfully booked for ${formattedDate}`);
        } else {
          alert('Failed to book your date. Please try again.');
        }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Book Volunteer Section with Calendar */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4">
          Book Your Volunteer Day
        </h2>
        <p className="text-center text-lg mb-4">
          Choose a date that works best for you.
        </p>

        <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-8">
          {/* Calendar Section */}
          <div className="shadow-lg p-4 rounded-lg w-full bg-white calendar-container">
            <Calendar
              onChange={setSelectedDate} // Update the selected date
              value={selectedDate}
              minDate={new Date()} // Prevent past dates
              className="custom-calendar" // Custom class for styling
            />
            {/* New "Book {date}" button */}
            <div className="text-center mt-4">
              <button
                className="bg-st hover:bg-pr hover:text-sc text-pr font-bold py-3 px-8 rounded-lg shadow-lg"
                onClick={handleBookClick} // Open the confirmation popup on click
              >
                Book {selectedDate.toDateString()}
              </button>
            </div>
          </div>

          {/* Become a Volunteer Button */}
          <div className="flex flex-col justify-center">
            <button
              className="bg-st hover:bg-pr hover:text-sc text-pr font-bold py-3 px-8 rounded-lg shadow-lg"
              onClick={() => setIsPopupOpen(true)} // Open the volunteer sign-up popup on click
            >
              Become a Volunteer!
            </button>
          </div>
        </div>
      </div>

      {/* Main Heading */}
      <h2 className="text-5xl font-bold text-center mb-8">
        Some ways <span className="underline decoration-st">you can help</span>
      </h2>

      {/* Image and Volunteer Information */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={dogwalk}
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
          <p className="text-black mb-4 text-justify">
            Volunteering at the SPCA is a wonderful way to make a meaningful difference in the lives of animals in need. By offering your time and skills, you directly contribute to the well-being and happiness of our rescue animals. Whether it’s providing general care like feeding, washing, and grooming, or taking our dogs for walks to help socialize them and give them the love and attention they deserve, your efforts have a lasting impact. Volunteers can also help by writing creative bios for our website and social media channels, bringing out each animal's unique personality to attract potential adopters. If you have a passion for photography, capturing photos of our animals can showcase their charm and increase their chances of finding a forever home. No matter your role, your contribution as a volunteer will help us continue our mission of providing safe, loving environments for all our animals.
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
      </div>

      {/* Volunteer Sign Up Popup */}
      <VolunteerSignUp 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} // Close the popup
      />

      {/* Confirmation Popup */}
      {isConfirmationPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
            <p className="mb-8">Do you want to book for {selectedDate.toDateString()}?</p>
            <div className="flex justify-center">
              <button 
                className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => handleConfirmationResponse(true)} // Confirm booking
              >
                Yes
              </button>
              <button 
                className="bg-red-500 text-white py-2 px-4 rounded-lg" 
                onClick={() => handleConfirmationResponse(false)} // Cancel booking
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Volunteer;
