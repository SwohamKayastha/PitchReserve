import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Partnership from './pages/Partnership';
import Login from './pages/login';
import PlayerProfile from './pages/playerProfile';



function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/login" element={<Login />} />
          <Route path="/playerProfile" element={<PlayerProfile />} />

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