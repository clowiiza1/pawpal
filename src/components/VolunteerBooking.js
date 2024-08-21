import React from 'react';

const VolunteerBooking = ({ bookings, onCancelBooking }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 px-4 py-2">Date</th>
            <th className="w-1/3 px-4 py-2">Time Slot</th>
            <th className="w-1/3 px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="text-center">
              <td className="border px-4 py-2">{booking.date}</td>
              <td className="border px-4 py-2">{booking.timeSlot}</td>
              <td className="border px-4 py-2">
                {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
              </td>
              <td className="border px-4 py-2">
                {booking.status === 'pending' && (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => onCancelBooking(booking.id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerBooking;
