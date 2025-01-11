import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Partnership from './pages/Partnership';
import Login from './pages/login';
import PlayerProfile from './pages/playerProfile';
import OwnerProfile from './pages/ownerProfile';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/login" element={<Login />} />
          <Route path="/player/profile" element={<PlayerProfile />} />
          <Route path="/owner/profile" element={<OwnerProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;