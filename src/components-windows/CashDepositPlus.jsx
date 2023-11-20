import React from "react";
import { NavLink } from "react-router-dom";

export const CashDepositPlus = ({ location }) => (
  <>
    <NavLink
      to={`${location.pathname}/deposit`}
      style={{ textDecoration: "none", color: "#a3a195" }}
    >
      <button className="btn btn-dark-small-plus">+</button>
    </NavLink>
  </>
);
