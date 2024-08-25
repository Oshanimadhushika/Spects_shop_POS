import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import Dashboard from './pages/Dashboard';
import Branch from './pages/Branch';
import Admin from './pages/Admin';
import ItemMaster from './pages/ItemMaster';
import PurchasingInvoice from './pages/GoodRecive';
import PrescriptionInvoice from './pages/PrescriptionInvoice';
import CustomerRegister from './pages/CustomerRegister';

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
      <Route path="/good-receive-notes" element={<PurchasingInvoice />} />
      <Route path="/prescription-invoice" element={<PrescriptionInvoice />} />
      <Route path="/custom-register" element={<CustomerRegister />} />





     

      
    </Routes>
  </Router>
  );
}

export default App;
