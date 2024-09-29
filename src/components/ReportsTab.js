import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getBookings, getUserById } from '../apis/api'; // Importing APIs

const ReportsTab = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [groupedByWeek, setGroupedByWeek] = useState([]);
  const [category, setCategory] = useState('bookingType'); // Can be 'bookingType' or 'user'
  const [isReportReady, setIsReportReady] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // Track the sorting order (asc or desc)

  useEffect(() => {
    if (startDate && endDate) {
      fetchBookingsForPeriod(startDate, endDate);
    }
  }, [startDate, endDate, category, sortOrder]);

  const fetchBookingsForPeriod = async (start, end) => {
    const bookings = await getBookings(); // Fetch all bookings

    // Filter bookings by the selected date range
    const filtered = bookings.filter(booking => {
      const bookingDate = new Date(booking.bookingSlot);
      return bookingDate >= start && bookingDate <= end;
    });

    // For each filtered booking, fetch the user information by userID
    const detailedBookings = await Promise.all(
      filtered.map(async (booking) => {
        const user = await getUserById(booking.userID);
        return {
          ...booking,
          userFullName: `${user.firstName} ${user.lastName}`, // Combine first and last name
        };
      })
    );

    // Sort bookings by user full name if category is 'user'
    if (category === 'user') {
      detailedBookings.sort((a, b) => {
        const nameA = a.userFullName.toUpperCase();
        const nameB = b.userFullName.toUpperCase();
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredBookings(detailedBookings);
    groupBookingsByWeek(detailedBookings, start, end);
  };

  const groupBookingsByWeek = (bookings, start, end) => {
    const weekGroups = {};
    let current = new Date(start);
    let weekNumber = 1;

    // Group bookings into weeks
    while (current <= end) {
      const nextWeek = new Date(current);
      nextWeek.setDate(current.getDate() + 7);
      const weekBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.bookingSlot);
        return bookingDate >= current && bookingDate < nextWeek;
      });

      weekGroups[`Week ${weekNumber} (${current.toLocaleDateString()})`] = weekBookings;
      current = nextWeek;
      weekNumber++;
    }
    setGroupedByWeek(weekGroups);
    setIsReportReady(true);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF('landscape');
    const currentDate = new Date().toLocaleDateString();
    const pageWidth = doc.internal.pageSize.getWidth(); // Get page width for centering text
    let pageCount = 1;

    // Set custom color to st (#6C4E31)
    doc.setTextColor(108, 78, 49);

    // Display the current date at the top-left
    doc.text(`${currentDate}`, 10, 10);

    // Reformat the title as a single sentence and center it manually using getTextWidth()
    const title = `Number of Bookings per ${category === 'bookingType' ? 'Booking Type' : 'User'} per Week from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 20);

    const tableColumn = ['Category', ...Object.keys(groupedByWeek), 'TOTAL'];
    const tableRows = [];

    // Generate the table rows based on selected category (either 'bookingType' or 'userFullName')
    const categories = {};
    filteredBookings.forEach((booking) => {
      const key = category === 'bookingType' ? booking.bookingType : booking.userFullName;
      if (!categories[key]) {
        categories[key] = new Array(Object.keys(groupedByWeek).length).fill(0);
      }
      const weekIndex = Object.keys(groupedByWeek).findIndex((week) =>
        groupedByWeek[week].some((b) => b.bookingID === booking.bookingID)
      );
      categories[key][weekIndex]++;
    });

    // Add totals for each category and each week
    Object.keys(categories).forEach((categoryKey) => {
      const total = categories[categoryKey].reduce((acc, curr) => acc + curr, 0);
      tableRows.push([categoryKey, ...categories[categoryKey], total]);
    });

    // Add grand total row
    const grandTotal = tableRows.reduce((sum, row) => sum + row[row.length - 1], 0);
    tableRows.push(['GRAND TOTAL', ...new Array(Object.keys(groupedByWeek).length).fill(''), grandTotal]);

    // Create the table with a custom header style
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: {
        fillColor: [108, 78, 49], // Set the statement color (RGB for #6C4E31)
        halign: 'center', // Align header text to the center
        textColor: [255, 255, 255], // Optional: Set text color to white for contrast
      },
      styles: {
        halign: 'center', // Align body text in the center for the entire table
      },
    });

    // Footer with page count and end of report
    doc.text(`Page ${pageCount} of 1`, 10, doc.internal.pageSize.height - 10);
    doc.text('** End of Report **', pageWidth / 2 - 20, doc.internal.pageSize.height - 10);

    // Save the PDF file
    doc.save('report.pdf');
  };

  return (
    <div className="ml-6 pb-4">
      <h2 className="text-2xl font-bold text-sc mb-4">Generate Booking Summary Report</h2>

      {/* Date range selection */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border rounded px-4 py-2"
          />
        </div>
        <div>
          <label>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            className="border rounded px-4 py-2"
          />
        </div>
      </div>

      {/* Categorization and Sort Toggle */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <label className="mr-4">Categorize By: </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="bookingType">Booking Type</option>
            <option value="user">User</option>
          </select>
        </div>
        {category === 'user' && (
          <button
            className="bg-st text-pr px-4 py-2 rounded hover:bg-sc"
            onClick={toggleSortOrder}
          >
            Sort by User Name: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        )}
      </div>

      {/* Display summary and PDF export */}
      {isReportReady && (
        <>
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <h3 className="text-xl font-bold text-sc mb-4">Summary Report</h3>
            <table className="w-full table-auto text-left mb-4">
              <thead>
                <tr className="bg-sc text-pr">
                  <th className="py-3 px-4">{category === 'bookingType' ? 'Booking Type' : 'User'}</th>
                  {Object.keys(groupedByWeek).map((week) => (
                    <th key={week} className="py-3 px-4">{week}</th>
                  ))}
                  <th className="py-3 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Calculate the categories and display them */}
                {(() => {
                  const categories = {};
                  filteredBookings.forEach((booking) => {
                    const key = category === 'bookingType' ? booking.bookingType : booking.userFullName;
                    if (!categories[key]) {
                      categories[key] = new Array(Object.keys(groupedByWeek).length).fill(0);
                    }
                    const weekIndex = Object.keys(groupedByWeek).findIndex((week) =>
                      groupedByWeek[week].some((b) => b.bookingID === booking.bookingID)
                    );
                    categories[key][weekIndex]++;
                  });

                  return Object.keys(categories).map((key) => (
                    <tr key={key} className="border-b">
                      <td className="py-3 px-4">{key}</td>
                      {categories[key].map((count, index) => (
                        <td key={index} className="py-3 px-4">{count}</td>
                      ))}
                      <td className="py-3 px-4">{categories[key].reduce((acc, val) => acc + val, 0)}</td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
            <p className="text-right font-bold">** End of Report **</p>
          </div>

          {/* PDF Download Button */}
          <button
            onClick={handleExportToPDF}
            className="bg-st text-pr px-4 py-2 rounded hover:bg-sc"
          >
            Download PDF
          </button>
        </>
      )}
    </div>
  );
};

export default ReportsTab;
