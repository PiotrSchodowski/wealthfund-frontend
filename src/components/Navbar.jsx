import React from "react";
import { Link, NavLink } from "react-router-dom";

import "../styles/Navbar.css";

const list = [
  { name: "Main", path: "/1" },
  { name: "Wallets", path: "/wallets" },
  { name: "Positions", path: "/positions" },
  { name: "History", path: "/4" },
  { name: "Assets", path: "/5" },
];

const Navbar = ({ currentUser, logOut }) => {
  const menu = list.map((item) => (
    <li className="nav-item" key={item.name}>
      <NavLink to={item.path} className="nav-link">
        {item.name}
      </NavLink>
    </li>
  ));

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          Wealth Fund
        </Link>
        <div className="navbar-nav me-auto mx-2">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {currentUser && menu}
        </div>
        {currentUser ? (
          <div className="navbar-nav ms-auto mx-2">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto mx-2">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
