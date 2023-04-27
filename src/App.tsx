import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import CommonPage from './screens/commonPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/media" element={<CommonPage />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
