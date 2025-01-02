import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

// API calls
export const register = (data) => axios.post(`${API_URL}/register/`, data);
export const login = (data) => axios.post(`${API_URL}/login/`, data);

// handleLogin to redirect after successful login
export const handleLogin = async (username, password, navigate) => {
    try {
        // Making a login API request
        const response = await axios.post(`${API_URL}/login/`, {
            username,
            password,
        });
        
        // Get access token from the response
        const { access } = response.data;
        
        // Store access token in local storage
        localStorage.setItem('access_token', access);
        
        // Redirect to profile page upon successful login
        navigate('/profile');
    } catch (error) {
        console.error('Login error:', error);
    }
};



// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = 'http://localhost:8000/api/auth';

// export const register = (data) => axios.post(`${API_URL}/register/`, data);
// export const login = (data) => axios.post(`${API_URL}/login/`, data);
// export const logout = () => {
//   localStorage.removeItem('access');
//   localStorage.removeItem('refresh');
// };

// const handleLogin = async () => {
//     try {
//         const response = await axios.post('http://localhost:8000/api/auth/login/', {
//             username,
//             password,
//         });
//         const { access } = response.data; // JWT access token
//         localStorage.setItem('access_token', access);

//         navigate('/profile'); // Redirect to profile page
//     } catch (error) {
//         console.error('Login error:', error);
//     }
// };