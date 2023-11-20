import React from "react";
import { NavLink } from "react-router-dom";

const WalletFeaturesDisplay = ({ location }) => {
  return (
    <div className="panel-func">
      <div className="button-func">
        <NavLink
          to={`${location.pathname}/add`}
          className={
            location.pathname === `${location.pathname}/add`
              ? "btn btn-dark active"
              : "btn btn-dark"
          }
        >
          buy asset
        </NavLink>
      </div>
      <div className="button-func">
        <NavLink
          to={`${location.pathname}/decrease`}
          className={
            location.pathname === `${location.pathname}/decrease`
              ? "btn btn-dark active"
              : "btn btn-dark"
          }
        >
          sell asset
        </NavLink>
      </div>
      <div className="button-func">
        <NavLink
          to={`${location.pathname}/deposit`}
          className={
            location.pathname === `${location.pathname}/deposit`
              ? "btn btn-dark active"
              : "btn btn-dark"
          }
        >
          cash deposit
        </NavLink>
      </div>
      <div className="button-func">
        <NavLink
          to={`${location.pathname}/withdraw`}
          className={
            location.pathname === `${location.pathname}/withdraw`
              ? "btn btn-dark active"
              : "btn btn-dark"
          }
        >
          cash withdraw
        </NavLink>
      </div>
    </div>
  );
};

export default WalletFeaturesDisplay;
