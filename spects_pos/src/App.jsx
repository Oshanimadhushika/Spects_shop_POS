import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from './pages/Login';
// import RegisterUser from './pages/RegisterUser';
// import Dashboard from './pages/Dashboard';
// import Branch from './pages/Branch';
// import Admin from './pages/Admin';
// import ItemMaster from './pages/ItemMaster';
// import PurchasingInvoice from './pages/GoodRecive';
// import PrescriptionInvoice from './pages/PrescriptionInvoice';
// import CustomerRegister from './pages/CustomerRegister';
// import Settings from './pages/Setting';
// import BalanceBill from './pages/BalanceBill';
// import OtherSales from './pages/OtherSale';
// import Return from './pages/Return';
// import Visitors from './pages/Visitors';
// import JobStatus from './pages/JobStatus';
// import StockAdjust from './pages/StockAdjust';
// import Expenses from './pages/Expenses';
// import ClaimBill from './pages/ClaimBill';
// import TransferStock from './pages/TransferStock';
import RouterSet from "./routerSet/RouterSet";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <RouterSet />
    </DataProvider>
  );
}

export default App;
