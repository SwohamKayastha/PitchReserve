import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Partnership from './pages/Partnership';
import Login from './pages/login';
<<<<<<< HEAD
import PlayerProfile from './pages/playerProfile';


=======
import OwnerProfile from './pages/ownerProfile';
>>>>>>> 56506946de520b7b3be6b34987356d905b45d100

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/login" element={<Login />} />
<<<<<<< HEAD
          <Route path="/playerProfile" element={<PlayerProfile />} />

=======
          <Route path="/owner/profile" element={<OwnerProfile />} />
>>>>>>> 56506946de520b7b3be6b34987356d905b45d100
        </Routes>
      </div>
    </BrowserRouter>
  );
}

<<<<<<< HEAD
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
=======
export default App;
>>>>>>> 56506946de520b7b3be6b34987356d905b45d100
