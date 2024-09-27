import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import catCare from './catcare.jpg';
import dogCare from './dogcare.jpg';

function AdoptBookings() {
  const [selectedAnimal, setSelectedAnimal] = useState({
    name: 'Whiskers',
    image: 'path/to/animal-image.jpg', // Replace with your actual image path
    breed: 'Labrador Retriever',
    age: '3 years',
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setError('');
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
    setError('');
  };

  const handleContinue = () => {
    if (!selectedDate) {
      setError('Please select a date to continue.');
    } else if (!selectedSlot) {
      setError('Please select a time slot to continue.');
    } else {
      navigate('/next-step');
    }
  };

  return (
    <div className="min-h-screen bg-pr flex flex-col items-center p-6">
      <h2 className="text-4xl font-bold text-center mb-8 p-1">
        Overall Adoption Process
      </h2>

      {/* Container for images and adoption process side by side */}
      <div className="w-full max-w-7xl flex flex-row justify-between items-start mb-8">
        {/* Rectangular Images Section on the left */}
       
        <div className="w-1/2 relative  flex flex-col   pr-4">

        
        <div className="w-64 h-64  border-st rounded-2xl overflow-hidden shadow-lg absolute top-0 left-20 transform hover:scale-105 transition-transform duration-400" style={{
              boxShadow: '20px 20px 0px #D8AE7E' // Statement color
              }}>
              <img
              src={dogCare} // Replace with your actual image path
              alt="Dog care"
              className="w-full h-full object-cover"
              />
          </div>
          <div className="w-64 h-64  border-st rounded-2xl overflow-hidden shadow-lg absolute top-40 left-80 transform hover:scale-105 transition-transform duration-400" style={{
              boxShadow: '20px 20px 0px #D8AE7E' // Statement color
            }}>
            <img
              src={catCare} // Replace with your actual image path
              alt="Person with cat"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Dog Image at Bottom Right */}
          
        </div>

        
        {/* Adoption Process Details Section on the right */}
        <div className="w-1/2 bg-pr  rounded-lg  ml-8">
        
          <h2 className="text-2xl font-bold text-br mb-4 text-center pb-2">Ready to Adopt? <span className="underline decoration-st">Here are a few steps to follow</span></h2>
          <div className="grid grid-cols-1 gap-6">
          <div className="flex items-start">
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sc text-white font-bold mr-4 flex-shrink-0">
    1
  </div>
  <div className="flex-grow w-90"> {/* Adjust width as needed */}
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
  <div className="flex-grow w-90"> {/* Adjust width as needed */}
    <h3 className="text-xl font-semibold text-br">Pick a Time Slot</h3>
    <p className="text-sc">
      Once you've chosen a date, select one of the following time slots and check its availability: <br />
      <strong>Slot 1:</strong> 8:00 AM - 10:00 AM<br />
      <strong>Slot 2:</strong> 10:00 AM - 12:00 PM<br />
      <strong>Slot 3:</strong> 12:00 PM - 2:00 PM
    </p>
  </div>
</div>
<div className="flex items-start mt-2">
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sc text-white font-bold mr-4 flex-shrink-0">
    3
  </div>
  <div className="flex-grow w-90"> {/* Adjust width as needed */}
    <h3 className="text-xl font-semibold text-br">Visit the SPCA</h3>
    <p className="text-sc">
      Get ready to meet your potential new best friend! Upon arrival, you'll need to provide a certified copy of your ID or Passport and you'll be asked to complete the necessary paperwork.
    </p>
  </div>
</div>
<div className="flex items-start mt-2">
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sc text-white font-bold mr-4 flex-shrink-0">
    4
  </div>
  <div className="flex-grow w-90"> {/* Adjust width as needed */}
    <h3 className="text-xl font-semibold text-br">Complete the Adoption</h3>
    <p className="text-sc">
      If you decide to adopt, fill out the adoption form and pay the standard fee of R500. A representative will visit your home with the animal on an agreed date. If everything is in order, your new best friend will stay with you!
    </p>
  </div>
</div>


          </div>
        </div>
      </div>

      <h2 className="text-4xl font-bold text-center mb-8 p-4">
        Adoption <span className="underline decoration-st">Booking</span>
      </h2>
      {/* Animal Mini Profile Section */}
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col items-center">
          {selectedAnimal ? (
            <>
              <img
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
                className="w-40 h-40 rounded-full mb-4"
              />
              <h3 className="text-xl font-quicksand text-br mb-2">
                {selectedAnimal.name}
              </h3>
              <p className="font-poppins text-md text-sc mb-1">
                Breed: {selectedAnimal.breed}
              </p>
              <p className="font-poppins text-md text-sc">
                Age: {selectedAnimal.age}
              </p>
            </>
          ) : (
            <p className="text-sc">No animal selected yet.</p>
          )}
        </div>
      </div>

      {/* Date and Time Slot Selection Section */}
      <div className="w-full max-w-7xl bg-sc p-6 rounded-lg shadow-lg flex flex-col items-center">
        {/* Heading Above Date Picker */}
        <h1 className="text-3xl font-poppins font-bold text-pr mb-4 text-center">
          Please select a date and time slot to go see {selectedAnimal ? selectedAnimal.name : 'an animal'}
        </h1>

        {/* Date Selection Input */}
        <div className="w-full mb-4">
          <input
            id="datepicker-actions"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-white border border-st text-sc rounded-lg focus:ring-st focus:border-sc block w-full p-2.5"
            placeholder="Select date"
          />
        </div>

        {/* Time Slot Selection */}
        <div className="w-full mb-4">
          <select
            id="time-slot-selector"
            value={selectedSlot}
            onChange={handleSlotChange}
            className="bg-white border border-st text-sc rounded-lg focus:ring-st focus:border-sc block w-full p-2.5"
          >
            <option value="" disabled>Select a time slot</option>
            <option value="slot1">Slot 1: 8 am to 10 am</option>
            <option value="slot2">Slot 2: 10 am to 12 pm</option>
            <option value="slot3">Slot 3: 12 pm to 2 pm</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Continue Button */}
        <button
          className="w-full mt-6 py-3 bg-st text-white text-lg font-poppins rounded-lg hover:bg-br transition-all duration-300"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default AdoptBookings;
