import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const initiatePayment = async (bookingId) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.post(`${API_URL}/payment/initiate/${bookingId}/`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    maxRedirects: 0  // Prevent Axios from following redirects
  });

  if (response.status === 302) {
    window.location.href = response.headers.location;
  } else {
    return response.data;
  }
};