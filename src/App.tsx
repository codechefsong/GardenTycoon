import { HashRouter, Route, Routes } from 'react-router-dom';
import { Web3Provider } from "./Web3Provider";
import Navbar from './components/Navbar';
import Gardens from './pages/Gardens';
import PlantNFTPage from './pages/PlantNFTPage';
import GardenProfile from './pages/GardenProfile';

function App() {

  return (
    <Web3Provider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route
            path="/buyplant"
            element={<PlantNFTPage />} />
          <Route
            path="/gardenprofile"
            element={<GardenProfile />} />
          <Route
            path="/"
            element={<Gardens />} />
        </Routes>
      </HashRouter>
    </Web3Provider>
  )
}

export default App;
