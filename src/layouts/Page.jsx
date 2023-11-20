import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthService from "../services/auth.service";

import Login from "../components-top/Login";
import Register from "../components-top/Register";
import Home from "../components-top/Home";
import Profile from "../components-top/Profile";
import ErrorPage from "../components-error/ErrorPage";
import Wallets from "../main-pages/Wallets";
import CreateWallet from "../components-windows/CreateWallet";
import WalletFeaturesDisplay from "../main-pages/WalletFeaturesDisplay";
import LoginOrRegister from "../components-error/LoginOrRegister";
import CreatePosition from "../components-windows/CreatePosition";
import History from "../main-pages/History";
import Assets from "../main-pages/Assets";
import Footer from "./Footer";

import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Page = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container mt-3">
      <Routes>
        {currentUser ? (
          <>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/create-wallet" element={<CreateWallet />} />
            <Route path="/positions/*" element={<WalletFeaturesDisplay />} />
            <Route path="/create-position/*" element={<CreatePosition />} />
            <Route path="/history/*" element={<History />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/assets" element={<Assets />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<LoginOrRegister />} />
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </>
        )}
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Page;
