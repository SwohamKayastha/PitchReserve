import React, { useState } from 'react';
import { register } from '../api/auth'; // Import register function
import '../styles/Register.css'; // Import custom styles

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ username, password, email });
            alert('Registration successful');
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Register</h2>
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
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="submit-btn">Register</button>
                </form>
                <p className="redirect">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;


// import React, { useState } from 'react';
// import { register } from '../api/auth';

// function Register() {
//   const [form, setForm] = useState({ username: '', password: '', email: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await register(form);
//     alert('Registered successfully');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
//       <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
//       <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default Register;
