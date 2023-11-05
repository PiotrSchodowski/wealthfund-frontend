import React, { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import { NavLink, Route, Routes } from "react-router-dom";

import WalletPage from "./WalletPage";
import CreatePosition from "../components-windows/CreatePosition";
import DecreasePosition from "../components-windows/DecreasePosition";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Page.css";
import CashDeposit from "../components-windows/CashDeposit";
import CashWithdraw from "../components-windows/CashWithdraw";

const Positions = () => {
  const { wallets } = useContext(StoreContext);

  const menu = wallets.map((item) => (
    <li key={item.name}>
      <NavLink to={`${item.name}`}>{item.name}</NavLink>
    </li>
  ));

  return (
    <div className="container-wallets">
      <nav className="main-wallets">
        <ul>{menu}</ul>
      </nav>
      <div className="container-table">
        <>
          <Routes>
            {wallets.map((item) => (
              <Route
                key={item.name}
                path={`:walletName`}
                element={<WalletPage />}
              />
            ))}
            {wallets.map((item) => (
              <Route
                key={item.name}
                path={`:walletName/add`}
                element={<CreatePosition />}
              />
            ))}
            {wallets.map((item) => (
              <Route
                key={item.name}
                path={`:walletName/decrease`}
                element={<DecreasePosition />}
              />
            ))}
            {wallets.map((item) => (
              <Route
                key={item.name}
                path={`:walletName/deposit`}
                element={<CashDeposit />}
              />
            ))}
            {wallets.map((item) => (
              <Route
                key={item.name}
                path={`:walletName/withdraw`}
                element={<CashWithdraw />}
              />
            ))}
          </Routes>
        </>
      </div>
    </div>
  );
};

export default Positions;
