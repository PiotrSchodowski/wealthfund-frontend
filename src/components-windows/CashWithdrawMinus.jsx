import React from "react";
import { NavLink } from "react-router-dom";

export const CashWithdrawMinus = ({ location }) => (
  <>
    <NavLink to={`${location.pathname}/withdraw`}>
      <button className="btn btn-dark-small-minus">-</button>
    </NavLink>
  </>
);
