import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Partnership from './pages/Partnership';
import Login from './pages/login';
import OwnerProfile from './pages/ownerProfile';
import PlayerProfile from './pages/playerProfile';
import AboutUs from './pages/aboutUs';



function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ownerProfile" element={<OwnerProfile />} />
          <Route path="/playerProfile" element={<PlayerProfile />} />
          <Route path="/aboutUs" element={<AboutUs />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


// for individual page testing

// import React from 'react'
// import PlayerProfile from './pages/playerProfile'

// function App() {
//   return (
//     <>
//       <PlayerProfile />
//     </>
//   )
// }

// export default App