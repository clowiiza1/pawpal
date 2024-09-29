import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { getBookings, getUserById, getAnimalById, updateBooking } from '../apis/api'; // Importing API functions

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // Filter state for booking types
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusOptions] = useState(['Pending', 'Approved', 'Rejected', 'Completed']);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsData = await getBookings();

      // Fetch user and animal details for each booking, only call getAnimalById if needed
      const detailedBookings = await Promise.all(
        bookingsData.map(async (booking) => {
          const user = await getUserById(booking.userID);

          let animal = null;
          // Fetch animal details only if bookingType is 'Adopter' and animalID is not null
          if (booking.bookingType === 'Adopter' && booking.animalID !== null) {
            animal = await getAnimalById(booking.animalID);
          }

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

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsEditing(true);
  };

  const handleStatusChange = (event) => {
    setSelectedBooking({ ...selectedBooking, status: event.target.value });
  };

  const saveBookingStatus = async () => {
    if (selectedBooking) {
      await updateBooking(selectedBooking);
      setIsEditing(false);
      setSelectedBooking(null);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
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
              <th className="py-3 px-4 text-right">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">{`${booking.user?.firstName || ''} ${booking.user?.lastName || ''}`}</td>
                <td className="py-3 px-4">{booking.user?.phoneNumber || ''}</td>
                <td className="py-3 px-4">{booking.bookingType}</td>
                <td className="py-3 px-4">{booking.animal?.name || '-'}</td>
                <td className="py-3 px-4">{new Date(booking.bookingSlot).toLocaleDateString()}</td>
                <td className="py-3 px-4">{getTimeSlot(booking)}</td>
                <td className="py-3 px-4">
                  {isEditing && selectedBooking?.bookingID === booking.bookingID ? (
                    <select value={selectedBooking.status} onChange={handleStatusChange} className="rounded-lg border-gray-300">
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    booking.status
                  )}
                </td>
                <td className="py-3 px-4 flex justify-end space-x-2">
                  {isEditing && selectedBooking?.bookingID === booking.bookingID ? (
                    <>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                        onClick={saveBookingStatus}
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-2 bg-st text-pr rounded-lg hover:bg-sc"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <FaPen
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditBooking(booking)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTab;
