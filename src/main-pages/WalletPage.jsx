import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, NavLink, useLocation } from "react-router-dom";

import ColorIndicator from "../components-func/ColorIndicator";
import "bootstrap/dist/css/bootstrap.min.css";

import WalletService from "../services/wallet.service"; // Importuj odpowiednią usługę
import AuthService from "../services/auth.service";

const user = AuthService.getCurrentUser();

const WalletPage = () => {
  const { walletName } = useParams();
  const location = useLocation();

  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    WalletService.getCurrentWallet(user.username, walletName)
      .then((response) => {
        setWallet(response);
      })
      .catch((error) => {
        console.error("Error retrieving wallet details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.username, walletName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!wallet) {
    return <div>Wallet not found</div>;
  }

  const currency = wallet?.currency || {};
  const cashEntity = wallet?.cashEntity || {};
  const positions = wallet?.positions || [];

  const calculateDays = (date) => {
    const transactionDate = new Date(date);
    const today = new Date();
    const timeDifference = today - transactionDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const roundValue = (value) => {
    return Math.round(value * 100) / 100;
  };

  const sumOfWholeValue = (positions, cash) => {
    let sum = 0;
    positions.forEach((position) => {
      sum += position.quantity * position.actualPrice;
    });
    return roundValue(sum + cash);
  };

  return (
    <div>
      <h3>Value and structure current wallet: {walletName}</h3>
      <br />
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
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Asset</th>
            <th className="position-column">Exposure</th>
            <th className="position-column">Quantity</th>
            <th className="position-column">
              Average Purchase Price [{currency}]
            </th>
            <th className="position-column">Actual Price [{currency}]</th>
            <th className="position-column">Days of investment</th>
            <th className="position-column">Value of Asset [{currency}]</th>
            <th className="position-column">Percentage of the Portfolio [%]</th>
            <th className="position-column">Rate of Return [%]</th>
            <th className="position-column">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bold-td">
            <td>Wallet</td>
            <td>{wallet.currency}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>
              {wallet.actualValue === 0
                ? 0
                : sumOfWholeValue(positions, cashEntity.value)}
            </td>
            <td>100</td>
            <td>
              <ColorIndicator
                value={
                  wallet.actualValue === 0
                    ? 0
                    : roundValue(
                        ((wallet.actualValue - wallet.basicValue) /
                          wallet.basicValue) *
                          100
                      )
                }
              />
            </td>
            <td>
              <ColorIndicator
                value={
                  wallet.actualValue === 0
                    ? 0
                    : roundValue(wallet.actualValue - wallet.basicValue)
                }
              />
            </td>
          </tr>
          <tr>
            <td>Cash</td>
            <td>{wallet.currency}</td>
            <td>1</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>{cashEntity.value}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          {positions.map((position) => (
            <tr key={position.id}>
              <td>{position.name + " (" + position.symbol + ")"}</td>
              <td>{position.userCurrency}</td>
              <td>{position.quantity}</td>
              <td>{roundValue(position.averagePurchasePrice)}</td>
              <td>{roundValue(position.actualPrice)}</td>
              <td>{calculateDays(position.positionOpeningDate)}</td>

              <td>{roundValue(position.quantity * position.actualPrice)}</td>
              <td>{roundValue(position.percentageOfThePortfolio)}</td>
              <td>
                <ColorIndicator value={roundValue(position.rateOfReturn)} />
              </td>
              <td>
                <ColorIndicator value={roundValue(position.result)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletPage;
