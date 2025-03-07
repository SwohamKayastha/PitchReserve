import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ;
const SCHEDULE_URL = import.meta.env.VITE_API_URL ;

export const createOrUpdateFacility = async (formData) => {
  const token = localStorage.getItem('owner_access_token');
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`${API_URL}/futsal-facilities/list/`, formData, { headers });
    // Triggering the time slot generation for the new facility that is created from the form
    const date = new Date().toISOString().split('T')[0];
    await axios.post(`${SCHEDULE_URL}/schedules/generate-time-slots/${response.data.id}/${date}/`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating/updating facility:', error);
    throw error;
  }
};

export const getFutsalFields = async () => {
  const token = localStorage.getItem('owner_access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${API_URL}/futsal-facilities/list/`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching futsal fields:', error);
    throw error;
  }
};

export const getFutsalFieldById = async (id) => {
  const token = localStorage.getItem('owner_access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${API_URL}/futsal-facilities/facilities/${id}/`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching futsal field:', error);
    throw error;
  }
};

export const getOwnerFutsalFields = async () => {
  const token = localStorage.getItem("owner_access_token");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(`${API_URL}/futsal-facilities/owner/facilities/`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching owner fields:", error);
    throw error;
  }
};

export const getOwnerFutsalFieldById = async (id) => {
  const token = localStorage.getItem("owner_access_token");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(`${API_URL}/futsal-facilities/owner/facilities/${id}/`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching field by ID:", error);
    throw error;
  }
};

export const deleteOwnerFutsalField = async (fieldId) => {
  const token = localStorage.getItem("owner_access_token");
  const response = await fetch(`${API_URL}/futsal-facilities/owner/facilities/delete/${fieldId}/`, {
      method: "DELETE",
      headers: {
          "Authorization": `Bearer ${token}`,
      },
  });
  
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete field");
  }
  // return await response.json();
};