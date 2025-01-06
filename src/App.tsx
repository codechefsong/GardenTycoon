import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gardens from './pages/Gardens';
import PlantNFTPage from './pages/PlantNFTPage';
import BuyGardenNFT from './pages/BuyGardenNFT';
import GardenProfile from './pages/GardenProfile';
import LandingPage from './pages/Landing';

function App() {

  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route
          path="/buyplant"
          element={<PlantNFTPage />} />
        <Route
          path="/buyGarden"
          element={<BuyGardenNFT />} />
        <Route
          path="/gardenprofile/:playeraddress"
          element={<GardenProfile />} />
        <Route
          path="/gardens"
          element={<Gardens />} />
        <Route
          path="/"
          element={<LandingPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App;
