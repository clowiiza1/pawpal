import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAnimalById, addBooking } from '../apis/api'; // Import the API function
import catCare from './catcare.jpg';
import dogCare from './dogcare.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyringe, faNeuter } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar'; // Import the Calendar component
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import './CalendarStyles.css'; // Import custom CSS for calendar styling
import Toast from '../components/Toast'; // Assuming you have a Toast component

function AdoptBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { animalId } = location.state || {}; // Get the animalId from location state
  const [selectedAnimal, setSelectedAnimal] = useState(null); // Set initial value to null
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set initial date to today
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState(''); // State for toast message

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setError('');
  };

  // Function to handle slot change
  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
    setError('');
  };

  // Fetch animal data
  useEffect(() => {
    if (!animalId) {
      setLoading(false);
      return;
    }

    const fetchAnimalData = async () => {
      try {
        const animal = await getAnimalById(animalId); // Fetch animal data by ID
        setSelectedAnimal(animal);
      } catch (error) {
        setError('Error fetching animal details.');
        console.error(error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchAnimalData();
  }, [animalId]);

  // Handle the booking submission
  const handleBookingSubmit = async () => {
    if (!selectedDate) {
      setError('Please select a date to continue.');
    } else {
      // Format date as YYYY-MM-DD
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      try {
        const response = await addBooking(formattedDate, animalId); // Send booking data to the backend
        if (response) {
          setToastMessage('Booking successful!'); // Set success toast message
        } else {
          setToastMessage('Failed to book. Please try again.'); // Set error toast message
        }
      } catch (error) {
        setError('Error booking adopter slot. Please try again.');
        console.error(error);
      }
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading indicator while fetching data

  return (
    <div className="min-h-screen bg-pr flex flex-col items-center p-4">
      <h2 className="text-4xl font-bold text-center mb-6 p-2">
        Adoption <span className="underline decoration-st">Booking</span>
      </h2>

      {/* Side-by-Side Container for Animal Profile and Date/Time Slot Selection */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 mb-8">
        {/* Animal Mini Profile Section */}
        <div className="md:w-1/2 w-full bg-st p-8 rounded-2xl shadow-lg flex flex-col items-center">
          {selectedAnimal ? (
            <>
              <div className="w-full">
                <img
                  src={selectedAnimal.imageUrl || (selectedAnimal.species === 'dog' ? dogCare : catCare)}
                  alt={selectedAnimal.name}
                  className="w-full h-80 object-cover rounded-2xl p-2"
                />
              </div>
              <h3 className="text-3xl font-poppins font-bold text-br p-2 text-center">
                {selectedAnimal.name}
              </h3>
              <p className="font-poppins text-md text-sc mb-4 p-2 text-center">
                {selectedAnimal.description}
              </p>

              <div className="text-left w-full p-4 bg-br rounded-lg shadow-md flex justify-between items-start">
                <div className="w-3/4">
                  <p className="font-poppins text-lg text-pr mb-2">
                    <strong>Gender:</strong> {selectedAnimal.gender === 'M' ? 'Male' : selectedAnimal.gender === 'F' ? 'Female' : selectedAnimal.gender}
                  </p>
                  <p className="font-poppins text-lg text-pr mb-2">
                    <strong>Breed:</strong> {selectedAnimal.breed}
                  </p>
                  <p className="font-poppins text-lg text-pr mb-2">
                    <strong>Age:</strong> {selectedAnimal.age}
                  </p>
                  <p className="font-poppins text-lg text-pr">
                    <strong>Weight (kg):</strong> {selectedAnimal.weight}
                  </p>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  {selectedAnimal.vaccinated && (
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-12 h-12 bg-st rounded-full flex items-center justify-center shadow-md">
                        <FontAwesomeIcon icon={faSyringe} className="text-white text-xl" />
                      </div>
                      <span className="mt-1 text-sm text-center text-pr">Vaccinated</span>
                    </div>
                  )}
                  {selectedAnimal.sterile && (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-st rounded-full flex items-center justify-center shadow-md">
                        <FontAwesomeIcon icon={faNeuter} className="text-white text-xl" />
                      </div>
                      <span className="mt-1 text-sm text-center text-pr">Neutered</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-sc">No animal selected yet.</p>
          )}
        </div>

        {/* Date and Time Slot Selection Section */}
        <div className="md:w-1/2 w-full flex flex-col items-center">
          <div className="w-full bg-br p-6 rounded-lg shadow-lg flex flex-col items-center mb-4">
            <h1 className="text-2xl font-poppins font-bold text-pr mb-4 text-center">
              Please select a date and time slot to go see{' '}
              {selectedAnimal ? selectedAnimal.name : 'an animal'}
            </h1>

            {/* Calendar Section */}
            <div className="shadow-lg p-4 rounded-lg w-full bg-pr calendar-container">
              <Calendar
                onChange={handleDateChange} // Update the selected date
                value={selectedDate}
                minDate={new Date()} // Prevent past dates
                className="custom-calendar bg-pr w-full" // Custom class for styling
              />
              <div className="text-center mt-4">
                <button
                  className="bg-st hover:bg-pr hover:text-sc text-pr font-bold py-3 px-8 rounded-lg shadow-lg"
                  onClick={handleBookingSubmit} // Handle booking on click
                >
                  Book {selectedDate.toDateString()}
                </button>
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="w-full mb-4 pt-6">
              <select
                id="time-slot-selector"
                value={selectedSlot}
                onChange={handleSlotChange}
                className="bg-white border border-st text-sc rounded-lg focus:ring-st focus:border-sc block w-full p-2.5"
              >
                <option value="" disabled>
                  Select a time slot
                </option>
                <option value="slot1">Slot 1: 8 am to 10 am</option>
                <option value="slot2">Slot 2: 10 am to 12 pm</option>
                <option value="slot3">Slot 3: 12 pm to 2 pm</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              className="w-full mt-4 py-3 bg-st text-white text-lg font-poppins rounded-lg hover:bg-br transition-all duration-300"
              onClick={handleBookingSubmit}
            >
              Continue
            </button>
          </div>

          {toastMessage && (
            <Toast message={toastMessage} onClose={() => setToastMessage('')} />
          )}
        </div>
      </div>

      {/* Overall Adoption Process Section */}
      <h2 id="adoption-process" className="text-4xl font-bold text-center mb-8 p-1">
        Overall Adoption Process
      </h2>

      {/* Container for images and adoption process side by side */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-start mb-8">
        {/* Rectangular Images Section on the left */}
        <div className="md:w-1/2 w-full relative flex flex-col pr-4">
          <div
            className="w-64 h-64 border-st rounded-2xl overflow-hidden shadow-lg absolute top-0 left-20 transform hover:scale-105 transition-transform duration-400"
            style={{
              boxShadow: '20px 20px 0px #D8AE7E', // Statement color
            }}
          >
            <img
              src={dogCare} // Replace with your actual image path
              alt="Dog care"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="w-64 h-64 border-st rounded-2xl overflow-hidden shadow-lg absolute top-40 left-80 transform hover:scale-105 transition-transform duration-400"
            style={{
              boxShadow: '20px 20px 0px #D8AE7E', // Statement color
            }}
          >
            <img
              src={catCare} // Replace with your actual image path
              alt="Person with cat"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Adoption Process Details Section on the right */}
        <div className="md:w-1/2 w-full bg-pr rounded-lg ml-8">
          <h2 className="text-2xl font-bold text-br mb-4 text-center pb-2">
            Ready to Adopt?{' '}
            <span className="underline decoration-st">Here are a few steps to follow</span>
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sc text-white font-bold mr-4 flex-shrink-0">
                1
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-br">Choose a Date</h3>
                <p className="text-sc">
                  The SPCA is open from Monday to Saturday. Select any date that suits you and check its availability.
                </p>
              </div>
            </div>
            <div className="flex items-start mt-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sc text-white font-bold mr-4 flex-shrink-0">
                2
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-br">Pick a Time Slot</h3>
                <p className="text-sc">
                  Once you've chosen a date, select one of the following time slots and check its availability: <br />
                  <strong>Slot 1:</strong> 8:00 AM - 10:00 AM
                  <br />
                  <strong>Slot 2:</strong> 10:00 AM - 12:00 PM
                  <br />
                  <strong>Slot 3:</strong> 12:00 PM - 2:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-start mt-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sc text-white font-bold mr-4 flex-shrink-0">
                3
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-br">Visit the SPCA</h3>
                <p className="text-sc">
                  Get ready to meet your potential new best friend! Upon arrival, you'll need to provide a certified copy of your ID or Passport
                  and you'll be asked to complete the necessary paperwork.
                </p>
              </div>
            </div>
            <div className="flex items-start mt-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sc text-white font-bold mr-4 flex-shrink-0">
                4
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-br">Complete the Adoption</h3>
                <p className="text-sc">
                  If you decide to adopt, fill out the adoption form and pay the standard fee of R500. A representative will visit your home with the
                  animal on an agreed date. If everything is in order, your new best friend will stay with you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptBooking;
