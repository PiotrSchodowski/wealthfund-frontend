import React from "react";
import { NavLink } from "react-router-dom";

export const NavPositionPlus = ({ location, position }) => (
  <>
    <NavLink to={`${location.pathname}/add/${position.id}`}>
      <button className="btn btn-dark-small-plus">+</button>
    </NavLink>
  </>
);
