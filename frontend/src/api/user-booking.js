import axios from 'axios';

const API_URL = 'http://localhost:8000/booking'; // Adjust if needed

export const fetchUserBookings = async () => {
  const token = localStorage.getItem('access_token');
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(`${API_URL}/user-bookings/`, { headers });
    console.log('Response Data:', response.data);
    console.log('Futsal name of first booking:', response.data[0]?.futsal_name);
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};