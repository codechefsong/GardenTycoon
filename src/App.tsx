import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gardens from './pages/Gardens';
import PlantNFTPage from './pages/PlantNFTPage';
import BuyGardenNFT from './pages/BuyGardenNFT';
import GardenProfile from './pages/GardenProfile';

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
          path="/gardenprofile"
          element={<GardenProfile />} />
        <Route
          path="/"
          element={<Gardens />} />
      </Routes>
    </HashRouter>
  )
}

export default App;
