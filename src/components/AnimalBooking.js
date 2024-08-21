import React, { useState } from 'react';

const AnimalBooking = () => {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const handleBooking = () => {
    // Handle booking logic here
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Book a Visit</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Select Time Slot:</label>
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a time slot</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="2:00 PM">2:00 PM</option>
        </select>
      </div>
      <button
        onClick={handleBooking}
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default AnimalBooking;
