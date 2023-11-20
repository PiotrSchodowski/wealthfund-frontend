import React, { useContext, useEffect } from "react";
import { useNavigate, NavLink, Route, Routes } from "react-router-dom";
import { StoreContext } from "../store/StoreProvider";
import WalletPage from "./WalletPage";
import CreatePosition from "../components-windows/CreatePosition";
import DecreasePosition from "../components-windows/DecreasePosition";
import CashDeposit from "../components-windows/CashDeposit";
import CashWithdraw from "../components-windows/CashWithdraw";
import CreatePositionPlus from "../components-windows/CreatePositionPlus";
import DecreasePositionMinus from "../components-windows/DecreasePositionMinus";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Page.css";
import "../styles/Tables.css";
import "../styles/Buttons.css";

const WalletFeaturesDisplay = () => {
  const { wallets } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (wallets.length > 0) {
      navigate(`${wallets[0].name}`);
    }
  }, []);

  const routes = wallets.map((item) => (
    <React.Fragment key={item.name}>
      <Route
        path={`:walletName/add/:positionId`}
        element={<CreatePositionPlus />}
      />
      <Route
        path={`:walletName/decrease/:positionId`}
        element={<DecreasePositionMinus />}
      />
      <Route path={`:walletName/add`} element={<CreatePosition />} />
      <Route path={`:walletName/decrease`} element={<DecreasePosition />} />
      <Route path={`:walletName/deposit`} element={<CashDeposit />} />
      <Route path={`:walletName/withdraw`} element={<CashWithdraw />} />
      <Route path={`:walletName`} element={<WalletPage />} />
    </React.Fragment>
  ));

  const menu = wallets.map((item) => (
    <li key={item.name}>
      <NavLink to={`${item.name}`}>{item.name}</NavLink>
    </li>
  ));

  return (
    <div className="container-page">
      <nav className="main-wallets">
        <ul>{menu}</ul>
      </nav>
      <div className="container-table">
        <Routes>{routes}</Routes>
      </div>
    </div>
  );
};

export default WalletFeaturesDisplay;
