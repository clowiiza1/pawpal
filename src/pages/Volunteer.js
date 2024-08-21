import React, { useState } from 'react';
import VolunteerBooking from '../components/VolunteerBooking';

const Volunteer = () => {
  // Sample bookings data
  const [bookings, setBookings] = useState([
    { id: 1, date: '2024-08-25', timeSlot: '10:00 AM', status: 'pending' },
    { id: 2, date: '2024-08-26', timeSlot: '2:00 PM', status: 'confirmed' },
  ]);

  // Function to handle booking cancellation
  const handleCancelBooking = (bookingId) => {
    // Logic to handle cancellation (e.g., call an API)
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    );
    setBookings(updatedBookings);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Volunteer with Us</h2>
      <VolunteerBooking bookings={bookings} onCancelBooking={handleCancelBooking} />
    </div>
  );
};

export default Volunteer;
