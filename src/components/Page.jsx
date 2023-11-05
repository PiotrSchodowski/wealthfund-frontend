import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthService from "../services/auth.service";

import Login from "../components-top/Login";
import Register from "../components-top/Register";
import Home from "../components-top/Home";
import Profile from "../components-top/Profile";
import BoardUser from "../components-top/BoardUser";
import BoardAdmin from "../components-top/BoardAdmin";
import ErrorPage from "./ErrorPage";
import Wallets from "../main-pages/Wallets";
import CreateWallet from "../components-windows/CreateWallet";
import Positions from "../main-pages/Positions";
import LoginOrRegister from "./LoginOrRegister";
import CreatePosition from "../components-windows/CreatePosition";

import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Page = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container mt-3">
      <Routes>
        {currentUser ? (
          // If user is authenticated, allow all routes
          <>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/create-wallet" element={<CreateWallet />} />
            <Route path="/positions/*" element={<Positions />} />
            <Route path="/create-position/*" element={<CreatePosition />} />
            <Route path="*" element={<ErrorPage />} />
          </>
        ) : (
          // If user is not authenticated, show LoginOrRegister component
          <>
            <Route path="/*" element={<LoginOrRegister />} />
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </>
        )}

        {/* Handle unknown routes with ErrorPage */}
      </Routes>
    </div>
  );
};

export default Page;
