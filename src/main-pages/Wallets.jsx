import React, { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";
import WalletService from "../services/wallet.service";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Page.css";

const Wallets = () => {
  const { wallets } = useContext(StoreContext);

  const calculateResult = (wallet) => {
    const basicValue = wallet.basicValue;
    const actualValue = wallet.actualValue;
    const difference = actualValue - basicValue;
    const result = ((difference / basicValue) * 100).toFixed(2);

    const resultColor = result > 0 ? "text-success" : "text-danger";

    return {
      result: !isNaN(result) ? `${result}%` : "0.00%",
      color: resultColor,
    };
  };

  const calculateProfit = (wallet) => {
    const profit = wallet.actualValue - wallet.basicValue;
    const formattedProfit = profit.toFixed(2);
    return {
      profit: !isNaN(formattedProfit)
        ? profit >= 0
          ? formattedProfit
          : `${formattedProfit}`
        : "0.00",
      color: profit >= 0 ? "text-success" : "text-danger",
    };
  };

  const handleDelete = (walletname) => {
    const user = AuthService.getCurrentUser();
    WalletService.deleteWallet(user.username, walletname);
    window.location.reload();
  };

  return (
    <div>
      <h3>
        <strong>wallets</strong>
      </h3>
      <br />
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Currency</th>
            <th>Basic Value</th>
            <th>Actual Value</th>
            <th>Rate of Return</th>
            <th>Profit</th>
            <th>.</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet, index) => (
            <tr key={index}>
              <td>{wallet.name}</td>
              <td>{wallet.currency}</td>
              <td>{wallet.basicValue}</td>
              <td>{wallet.actualValue}</td>
              <td className={calculateResult(wallet).color}>
                {calculateResult(wallet).result}
              </td>
              <td className={calculateProfit(wallet).color}>
                {calculateProfit(wallet).profit}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(wallet.name)}
                >
                  Usuń
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
    </div>
  );
};

export default Wallets;
