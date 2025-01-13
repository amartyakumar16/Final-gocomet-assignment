import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelDetails from './components/HotelDetails';
import ExploreHotels from './pages/ExploreHotelPage';
//import HotelPage from './pages/HotelPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/explore-hotels" element={<ExploreHotels />} />
      </Routes>
    </Router>
  );
};

export default App;
