import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../store/StoreProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Page.css";
import ColorIndicator from "../components-func/ColorIndicator";
import { formatReadableDate } from "../components-func/dateUtils";
import { roundValue } from "../components-func/mathUtils";

import AuthService from "../services/auth.service";
import PositionService from "../services/position.service";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Page.css";
import "../styles/Tables.css";
import "../styles/Buttons.css";

const History = () => {
  const { wallets } = useContext(StoreContext);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    if (wallets) {
      getOperationsFromAllWallets();
    }
  }, [wallets]);

  const getOperationsFromAllWallets = () => {
    const allOperations = [];
    wallets.forEach((wallet) => {
      wallet.operationHistories.forEach((operation) => {
        console.log(operation.id);
        allOperations.push(operation);
      });
    });
    const sortedOperations = allOperations.sort((a, b) => a.id - b.id);
    setOperations(sortedOperations);
  };

  const handleDelete = (operationId, walletName) => {
    const user = AuthService.getCurrentUser();
    PositionService.undoOperation(user.username, walletName, operationId);
    getOperationsFromAllWallets();
    window.location.reload();
  };

  return (
    <div className="container-page">
      <h3>
        <strong>History</strong>
      </h3>

      <table className="table table-dark table-transparent">
        <thead className="thead-dark">
          <tr className="head-tr">
            <th className="position-column">Wallet</th>
            <th className="position-column">Symbol</th>
            <th className="position-column">Position Currency</th>
            <th className="position-column">Wallet Currency</th>
            <th className="position-column">Exchange</th>
            <th className="position-column">Quantity</th>
            <th className="position-column">Price</th>
            <th className="position-column">Value</th>
            <th className="position-column">Date</th>
            <th className="position-column">Undo</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation) => (
            <tr className="pos-tr" key={operation.id}>
              <td>{operation.walletName}</td>
              <td>{operation.symbol}</td>
              <td>{operation.positionCurrency}</td>
              <td>{operation.walletCurrency}</td>
              <td>{operation.exchange}</td>
              <td>{roundValue(operation.quantity)}</td>
              <td>{roundValue(operation.price)}</td>
              <td>
                <strong>
                  <ColorIndicator
                    value={roundValue(operation.valueOperation)}
                  />
                </strong>
              </td>
              <td style={{ fontSize: "10px" }}>
                {formatReadableDate(operation.date)}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-dark"
                  onClick={() =>
                    handleDelete(operation.id, operation.walletName)
                  }
                >
                  Undo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
