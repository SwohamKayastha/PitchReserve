import axios from 'axios';

const API_URL = 'http://localhost:8000/futsal-facilities';

export const createOrUpdateFacility = async (formData) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${API_URL}/list/`, formData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating/updating facility:', error);
    throw error;
  }
};

export const getFutsalFields = async () => {
  const token = localStorage.getItem('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${API_URL}/list/`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching futsal fields:', error);
    throw error;
  }
};