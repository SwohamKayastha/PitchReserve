import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth'; // Adjust the URL as needed

// User API:
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, userData);
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refress_token', access_token);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('An error occurred');
    }
  }
};


export const fetchPlayerProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};

//Owner API:
export const registerOwner = async (ownerData) => {
  try {
    const response = await axios.post(`${API_URL}/owner/register/`, ownerData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  } 
};

export const loginOwner = async (userData) => {
  try {
      const response = await axios.post(`${API_URL}/owner/login/`, userData);
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('An error occurred');
    }
  }
};


export const fetchOwnerProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/owner/profile/`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return response.data.owner;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};