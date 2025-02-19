// ...existing code...
export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/bookings/cancel/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
// ...existing code...
