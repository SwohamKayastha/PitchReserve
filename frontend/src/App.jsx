import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Partnership from './pages/Partnership';
import Login from './pages/login';
import Profile from './pages/ownerProfile';
import PlayerProfile from './pages/playerProfile';
import AboutUs from './pages/aboutUs';
import FutsalUploadForm from './pages/futsalFacilitiesForm';
import Error from './pages/error';
import FeaturesAndBlog from './pages/newFeatures';
import FutsalDetail from './pages/afterVenueSelection';
import FutsalBookingPage from './pages/toBook';
import Subscriptions from './pages/subscriptions';
import Loading from './pages/loading';

// Main App component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ownerProfile" element={<Profile />} />
        <Route path="/playerProfile" element={<PlayerProfile />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/futsalFacilitiesForm" element={<FutsalUploadForm />} />
        <Route path="/error" element={<Error />} />
        <Route path="/newFeatures" element={<FeaturesAndBlog />} />
        <Route path="/afterVenueSelection" element={<FutsalDetail />} />
        <Route path="/toBook" element={<FutsalBookingPage />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// for individual page testing

// import React from 'react'
// import Landing from './pages/Landing'

// function App() {
//   return (
//     <>
//       <Landing />
//     </>
//   )
// }

// export default App