import React, { useEffect, useState } from 'react';
import { cancelBooking } from '@/api/user-booking';
import { getUserBookings } from '../services/userService';

const UserBooking = ({ userId, onBookingUpdate }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userBookings = await getUserBookings(userId);
        setBookings(userBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      // Refresh the bookings list immediately after cancellation
      const updatedBookings = await getUserBookings(userId);
      setBookings(updatedBookings);
      // Notify parent component if needed
      if (onBookingUpdate) {
        onBookingUpdate();
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {booking.details}
            <button 
              className="cancel-booking-btn" 
              onClick={() => handleCancelBooking(booking._id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBooking;
