import axios from 'axios';

const API_URL = 'http://localhost:8000/booking'; // Adjust if needed

export const fetchUserBookings = async () => {
  const token = localStorage.getItem('access_token');
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(`${API_URL}/user-bookings/`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};