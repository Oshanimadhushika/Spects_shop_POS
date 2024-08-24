import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import Dashboard from './pages/Dashboard';
import Branch from './pages/Branch';
import Admin from './pages/Admin';
import ItemMaster from './pages/ItemMaster';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />

      <Route path="/user-register" element={<RegisterUser />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/branch" element={<Branch />} />
      <Route path="/item-master" element={<ItemMaster />} />




      
    </Routes>
  </Router>
  );
}

export default App;
