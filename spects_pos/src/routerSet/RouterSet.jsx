// Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import Dashboard from "../pages/Dashboard";
import Branch from "../pages/Branch";
import Admin from "../pages/Admin";
import ItemMaster from "../pages/ItemMaster";
import PurchasingInvoice from "../pages/GoodRecive";
import PrescriptionInvoice from "../pages/PrescriptionInvoice";
import CustomerRegister from "../pages/CustomerRegister";
import Settings from "../pages/Setting";
import BalanceBill from "../pages/BalanceBill";
import OtherSales from "../pages/OtherSale";
import Return from "../pages/Return";
import Visitors from "../pages/Visitors";
import JobStatus from "../pages/JobStatus";
import StockAdjust from "../pages/StockAdjust";
import Expenses from "../pages/Expenses";
import ClaimBill from "../pages/ClaimBill";
import TransferStock from "../pages/TransferStock";

const RouterSet = () => (
  <BrowserRouter>
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
      <Route path="/settings" element={<Settings />} />
      <Route path="/balance-bill" element={<BalanceBill />} />
      <Route path="/other-sales" element={<OtherSales />} />
      <Route path="/return" element={<Return />} />
      <Route path="/visitors" element={<Visitors />} />
      <Route path="/job-status" element={<JobStatus />} />
      <Route path="/stock-adjust" element={<StockAdjust />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/claim-bill" element={<ClaimBill />} />
      <Route path="/transfer" element={<TransferStock />} />
    </Routes>
  </BrowserRouter>
);

export default RouterSet;
