import { HashRouter, Route, Routes } from 'react-router-dom';
import { Web3Provider } from "./Web3Provider";
import { ConnectKitButton } from "connectkit";

function App() {

  return (
    <Web3Provider>
      <HashRouter>
        <Routes>
          <Route
            path="/test"
            element={
              <>
                <h1>Test</h1>
              </>} />
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
