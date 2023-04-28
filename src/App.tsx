import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import CommonPage from './screens/commonPage';
import Searched from './screens/Searched';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/media" element={<CommonPage />}>
          </Route>
          <Route path="/search" element={<Searched />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
