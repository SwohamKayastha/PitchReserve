import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../api/auth'; 
import '../../styles/User/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(username, password, navigate);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <p className="redirect">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { handleLogin } from '../api/auth'; // Import the handleLogin function

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate(); // Initialize useNavigate here

//     // Form submission handler
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Call the handleLogin function from auth.js
//             await handleLogin(username, password, navigate); // Pass navigate here
//         } catch (error) {
//             console.error('Login failed', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Username:
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </label>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from 'react';
// import { login } from '../api/auth';

// function Login() {
//   const [form, setForm] = useState({ username: '', password: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await login(form);
//     localStorage.setItem('access', response.data.access);
//     alert('Login successful');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
//       <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;
