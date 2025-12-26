import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddProduct from "./pages/seller/AddProduct";
import SellerProducts from "./pages/seller/SellerProducts";
import BuyerProducts from "./pages/buyer/BuyerProducts";
import Cart from "./pages/buyer/Cart";
import AccountDetails from "./pages/AccountDetails";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<BuyerProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<AccountDetails />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/seller/products" element={<SellerProducts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
