import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
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
              </>} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App;
