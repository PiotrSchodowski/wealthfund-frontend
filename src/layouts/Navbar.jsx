import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/NavBar.css";

const list = [
  { name: "Wallets", path: "/wallets" },
  { name: "Positions", path: "/positions" },
  { name: "History", path: "/history" },
];

const Navbar = ({ currentUser, logOut }) => {
  const user = currentUser ? currentUser : { username: "guest" };

  const menu = list.map((item) => (
    <li className="nav-item" key={item.name}>
      <NavLink to={item.path} className="nav-link" activeclassname="active">
        {item.name}
      </NavLink>
    </li>
  ));

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <div className="container">
        <NavLink to={"/"} className="navbar-brand" activeclassname="active">
          Wealth Fund
        </NavLink>
        <div className="navbar-nav me-auto mx-2">
          <li className="nav-item">
            <NavLink to={"/home"} className="nav-link" activeclassname="active">
              Home
            </NavLink>
          </li>
          {currentUser && menu}
          {user.username === "admin" && (
            <li className="nav-item">
              <NavLink
                to={"/assets"}
                className="nav-link"
                activeclassname="active"
              >
                Assets
              </NavLink>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ms-auto mx-2">
            <li className="nav-item">
              <NavLink
                to={"/profile"}
                className="nav-link"
                activeclassname="active"
              >
                {currentUser.username}
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                href="/login"
                className="nav-link"
                activeclassname="active"
                onClick={logOut}
              >
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto mx-2">
            <li className="nav-item">
              <NavLink
                to={"/login"}
                className="nav-link"
                activeclassname="active"
              >
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={"/register"}
                className="nav-link"
                activeclassname="active"
              >
                Sign Up
              </NavLink>
            </li>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
