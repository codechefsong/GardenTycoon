import { HashRouter, Route, Routes } from 'react-router-dom';
import { Web3Provider } from "./Web3Provider";
import Gardens from './pages/Gardens';
import PlantNFTPage from './pages/PlantNFTPage';

function App() {

  return (
    <Web3Provider>
      <HashRouter>
        <Routes>
          <Route
            path="/buyplant"
            element={<PlantNFTPage />} />
          <Route
            path="/"
            element={<Gardens />} />
        </Routes>
      </HashRouter>
    </Web3Provider>
  )
}

export default App;
