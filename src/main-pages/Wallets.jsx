import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../store/StoreProvider";
import { Link } from "react-router-dom";
import { calculateResult, calculateProfit } from "../components-func/mathUtils";
import ColorIndicator from "../components-func/ColorIndicator";
import WalletsValueChart from "../components-func/WalletsValueChart";
import WalletsResultChart from "../components-func/WalletsResultChart";

import AuthService from "../services/auth.service";
import WalletService from "../services/wallet.service";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Page.css";
import "../styles/Tables.css";
import "../styles/Buttons.css";

const Wallets = () => {
  const { wallets } = useContext(StoreContext);
  const [sortedWallets, setSortedWallets] = useState([]);

  useEffect(() => {
    const sorted = [...wallets].sort((a, b) => b.actualValue - a.actualValue);
    setSortedWallets(sorted);
  }, [wallets]);

  const handleDelete = (walletname) => {
    const user = AuthService.getCurrentUser();
    WalletService.deleteWallet(user.username, walletname);
    window.location.reload();
  };

  return (
    <div className="container-page">
      <h3>
        <strong>wallets</strong>
      </h3>
      <table className="table table-dark table-transparent">
        <thead className="thead-dark">
          <tr className="head-tr">
            <th>name</th>
            <th>currency</th>
            <th>basic value</th>
            <th>actual value</th>
            <th>return [%]</th>
            <th>profit</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {sortedWallets.map((wallet, index) => (
            <tr className="pos-tr" key={index}>
              <td>{wallet.name}</td>
              <td>{wallet.currency}</td>
              <td>{wallet.basicValue.toLocaleString()}</td>
              <td>{wallet.actualValue.toLocaleString()}</td>
              <td>
                <ColorIndicator value={calculateResult(wallet).result} />
              </td>
              <td>
                <ColorIndicator value={calculateProfit(wallet).profit} />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(wallet.name)}
                >
                  Burn
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-func">
        <Link to="/create-wallet" className="btn btn-dark">
          Add new wallet
        </Link>
      </div>

      <div className="chart-container" style={{ marginTop: "5vh" }}>
        <WalletsValueChart wallets={sortedWallets} />
      </div>
      <div className="chart-container" style={{ marginTop: "5vh" }}>
        <WalletsResultChart wallets={sortedWallets} />
      </div>
    </div>
  );
};

export default Wallets;
