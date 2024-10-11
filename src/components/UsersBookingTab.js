import React, { useState, useEffect } from 'react';
import { getAnimalById, getBookingsByUserId } from '../apis/api'; // API function to fetch user's bookings
import Toast from './Toast'; // Importing the Toast component

const UserBookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // Filter state for booking types
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const bookingsData = await getBookingsByUserId(); // Fetch bookings for the current user

        // Fetch animal details for Adopter bookings
        const detailedBookings = await Promise.all(
          bookingsData.map(async (booking) => {
            let animal = null;
            if (booking.bookingType === 'Adopter' && booking.animalID !== null) {
              animal = await getAnimalById(booking.animalID);
            }
            return { ...booking, animal };
          })
        );

        setBookings(detailedBookings);
        setFilteredBookings(detailedBookings); // Initial filter set to all bookings
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchUserBookings();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter((booking) => booking.bookingType === filter));
    }
  }, [filter, bookings]);

  const getTimeSlot = (booking) => {
    switch (booking.timeSlot) {
      case 1:
        return '8am - 10am';
      case 2:
        return '10am - 12pm';
      case 3:
        return '12pm - 2pm';
      default:
        return '-';
    }
  };

  return (
    <div className="ml-6 pb-4">
      <h2 className="text-2xl font-bold text-sc mb-4">My Bookings</h2>
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-sc text-pr' : 'bg-pr text-sc'
          }`}
          onClick={() => setFilter('all')}
        >
          All ({bookings.length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filter === 'Adopter' ? 'bg-sc text-pr' : 'bg-pr text-sc'
          }`}
          onClick={() => setFilter('Adopter')}
        >
          Adopter ({bookings.filter((booking) => booking.bookingType === 'Adopter').length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filter === 'Volunteer' ? 'bg-sc text-pr' : 'bg-pr text-sc'
          }`}
          onClick={() => setFilter('Volunteer')}
        >
          Volunteer ({bookings.filter((booking) => booking.bookingType === 'Volunteer').length})
        </button>
      </div>
      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-sc text-pr">
              <th className="py-3 px-4">Booking Type</th>
              <th className="py-3 px-4">Animal Name</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Time Slot</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">{booking.bookingType}</td>
                <td className="py-3 px-4">{booking.animal?.name || '-'}</td>
                <td className="py-3 px-4">
                  {new Date(booking.bookingSlot).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{getTimeSlot(booking)}</td>
                <td className="py-3 px-4">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBookingsTab;
