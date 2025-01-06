import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/User/Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            axios.get('http://localhost:8000/api/auth/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>User Profile</h2>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
            </div>
        </div>
    );
};

export default Profile;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Profile = () => {
//     const [userData, setUserData] = useState({});
//     const token = localStorage.getItem('access_token');

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/auth/profile/', {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Send JWT token
//                     },
//                 });
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     return (
//         <div>
//             <h1>User Profile</h1>
//             {userData.username && (
//                 <div>
//                     <p><strong>Username:</strong> {userData.username}</p>
//                     <p><strong>Email:</strong> {userData.email}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;
