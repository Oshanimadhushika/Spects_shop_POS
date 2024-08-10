import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      
    </Routes>
  </Router>
  );
}

export default App;
