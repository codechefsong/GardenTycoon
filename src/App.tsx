import { HashRouter, Route, Routes } from 'react-router-dom';
import { Web3Provider } from "./Web3Provider";
import { ConnectKitButton } from "connectkit";
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
            element={
              <>
                 <h1 className="text-3xl font-bold underline">
                  Hello world!
                </h1>
                <ConnectKitButton />
              </>} />
        </Routes>
      </HashRouter>
    </Web3Provider>
  )
}

export default App;
