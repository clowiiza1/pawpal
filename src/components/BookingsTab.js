import React, { useState, useEffect } from 'react';
import { FaTrash, FaPen, FaPlusCircle } from 'react-icons/fa';
import { getBookings, getUserById, getAnimalById, deleteBooking } from '../apis/api'; // Importing API functions

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // Filter state for booking types
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsData = await getBookings();
      // Fetch user and animal details for each booking
      const detailedBookings = await Promise.all(
        bookingsData.map(async (booking) => {
          const user = await getUserById(booking.userId);
          const animal = booking.animalId ? await getAnimalById(booking.animalId) : null;
          return {
            ...booking,
            user,
            animal,
          };
        })
      );
      setBookings(detailedBookings);
      setFilteredBookings(detailedBookings);
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter((booking) => booking.bookingType === filter));
    }
  }, [filter, bookings]);

  const handleDeleteBooking = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const confirmDeleteBooking = async () => {
    if (selectedBooking) {
      await deleteBooking(selectedBooking.id);
      setBookings(bookings.filter((booking) => booking !== selectedBooking));
    }
    setShowDeleteModal(false);
    setSelectedBooking(null);
  };

  const cancelDeleteBooking = () => {
    setShowDeleteModal(false);
    setSelectedBooking(null);
  };

  const getTimeSlot = (booking) => {
    if (booking.bookingType === 'Volunteer') {
      return '10am - 2pm'; // Fixed time slot for volunteers
    }
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
      <h2 className="text-2xl font-bold text-sc mb-4">Bookings</h2>
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('all')}
        >
          All ({bookings.length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'Adopter' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
          onClick={() => setFilter('Adopter')}
        >
          Adopter ({bookings.filter((booking) => booking.bookingType === 'Adopter').length})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'Volunteer' ? 'bg-sc text-pr' : 'bg-pr text-sc'}`}
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
              <th className="py-3 px-4">User Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Booking Type</th>
              <th className="py-3 px-4">Animal Name</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Time Slot</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">
                <FaPlusCircle
                  className="cursor-pointer text-green-500 hover:text-green-700"
                  onClick={() => console.log('Add Booking')}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">{`${booking.user?.firstName || ''} ${booking.user?.lastName || ''}`}</td>
                <td className="py-3 px-4">{booking.user?.phone || ''}</td>
                <td className="py-3 px-4">{booking.bookingType}</td>
                <td className="py-3 px-4">{booking.animal?.name || '-'}</td>
                <td className="py-3 px-4">{new Date(booking.bookingSlot).toLocaleDateString()}</td>
                <td className="py-3 px-4">{getTimeSlot(booking)}</td>
                <td className="py-3 px-4">{booking.status}</td>
                <td className="py-3 px-4 flex justify-end space-x-2">
                  <FaPen
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                    onClick={() => console.log('Edit Booking')}
                  />
                  <FaTrash
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteBooking(booking)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-sc mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the booking for:{' '}
              <span className="font-semibold text-sc">{`${selectedBooking.user?.firstName || ''} ${selectedBooking.user?.lastName || ''}`}</span>?
            </p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                onClick={confirmDeleteBooking}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-st text-pr rounded-lg hover:bg-sc"
                onClick={cancelDeleteBooking}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;
