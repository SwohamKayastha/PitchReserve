import axios from 'axios';

const API_URL = 'http://localhost:8000/futsal-facilities';
const SCHEDULE_URL = 'http://localhost:8000/schedules';

export const createOrUpdateFacility = async (formData) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${API_URL}/list/`, formData, { headers });
    // Triggering the time slot generation for the new facility that is created from the form
    const date = new Date().toISOString().split('T')[0];
    await axios.post(`${SCHEDULE_URL}/generate-time-slots/${response.data.id}/${date}/`, {}, { headers });
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

export const getFutsalFieldById = async (id) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${API_URL}/facilities/${id}/`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching futsal field:', error);
    throw error;
  }
};

export const getOwnerFutsalFields = async () => {
  const token = localStorage.getItem("access_token");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(`${API_URL}/owner/facilities/`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching owner fields:", error);
    throw error;
  }
};

export const getOwnerFutsalFieldById = async (id) => {
  const token = localStorage.getItem("access_token");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(`${API_URL}/owner/facilities/${id}/`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching field by ID:", error);
    throw error;
  }
};