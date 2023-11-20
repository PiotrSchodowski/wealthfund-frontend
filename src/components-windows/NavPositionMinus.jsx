import React from "react";
import { NavLink } from "react-router-dom";

export const NavPositionMinus = ({ location, position }) => (
  <>
    <NavLink to={`${location.pathname}/decrease/${position.id}`}>
      <button className="btn btn-dark-small-minus">-</button>
    </NavLink>
  </>
);
