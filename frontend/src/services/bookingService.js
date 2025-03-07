const API_URL = process.env.API_URL;

export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.put(`${API_URL}/api/bookings/cancel/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
