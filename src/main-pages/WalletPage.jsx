import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import WalletFeaturesNav from "../main-pages/WalletFeaturesNav";
import { CashDepositPlus } from "../components-windows/CashDepositPlus";
import { CashWithdrawMinus } from "../components-windows/CashWithdrawMinus";
import { NavPositionPlus } from "../components-windows/NavPositionPlus";
import { NavPositionMinus } from "../components-windows/NavPositionMinus";
import TransferToTheWebsite from "../components-func/TransferToTheWebsite";
import PortfolioChart from "../components-func/PortfolioChart";

import WalletService from "../services/wallet.service";
import AuthService from "../services/auth.service";
import {
  calculateDays,
  roundValue,
  sumOfWholeValue,
  calculatePercentage,
} from "../components-func/mathUtils";
import ColorIndicator from "../components-func/ColorIndicator";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Page.css";
import "../styles/Tables.css";
import "../styles/Buttons.css";
import "../styles/Charts.css";

const user = AuthService.getCurrentUser();

const WalletPage = () => {
  const { walletName } = useParams();
  const location = useLocation();

  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortedPositions, setSortedPositions] = useState([]);

  useEffect(() => {
    WalletService.getCurrentWallet(user.username, walletName)
      .then((response) => {
        setWallet(response);
        if (response.actualValue > 0) {
          WalletService.getActualPricesToWallet(user.username, walletName)
            .then(() => {
              console.log("Prices updated");
            })
            .catch(() => {
              console.error("Error retrieving actual prices:");
            });
        }
        const sorted = [...response.positions].sort(
          (a, b) => b.percentageOfThePortfolio - a.percentageOfThePortfolio
        );
        setSortedPositions(sorted);
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

  return (
    <>
      <div>
        <h2>{walletName}</h2>
        <WalletFeaturesNav location={location} />
        <table className="table table-dark table-transparent">
          <thead className="thead-dark">
            <tr className="head-tr">
              <th className="position-column-left">Asset</th>
              <th className="position-column-small"></th>
              <th className="position-column-small"></th>
              <th className="position-column-small"></th>
              <th className="position-column">1d Change</th>
              <th className="position-column">Exposure</th>
              <th className="position-column">Quantity</th>
              <th className="position-column">
                Average Purchase Price [{currency}]
              </th>
              <th className="position-column">Actual Price [{currency}]</th>
              <th className="position-column">Day</th>
              <th className="position-column">Value of Asset [{currency}]</th>
              <th className="position-column">
                Percentage of the Portfolio [%]
              </th>
              <th className="position-column">Rate of Return [%]</th>
              <th className="position-column">Result [{currency}]</th>
            </tr>
          </thead>
          <tbody>
            <tr className="wallet-tr">
              <td className="position-column-left">Wallet</td>
              <td className="position-column-small"></td>
              <td className="position-column-small"></td>
              <td className="position-column-small"></td>
              <td>-</td>
              <td>{wallet.currency}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                {wallet.actualValue === 0
                  ? 0
                  : sumOfWholeValue(
                      positions,
                      cashEntity.value
                    ).toLocaleString()}
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
            <tr className="cash-tr">
              <td className="position-column-left">Cash</td>
              <td className="position-column-small"></td>
              <td className="position-column-small">
                <CashDepositPlus location={location} />
              </td>
              <td className="position-column-small">
                <CashWithdrawMinus location={location} />
              </td>
              <td>-</td>
              <td>{wallet.currency}</td>
              <td>1</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                {cashEntity.value ? cashEntity.value.toLocaleString() : 0}
              </td>
              <td>
                {cashEntity.value === 0 || wallet.actualValue === 0
                  ? 0
                  : calculatePercentage(cashEntity.value, wallet.actualValue)}
              </td>
              <td>-</td>
              <td>-</td>
            </tr>
            {sortedPositions.map((position) => (
              <tr className="pos-tr" key={position.id}>
                <td className="position-column-left">
                  {position.name + " (" + position.symbol + ")"}
                </td>
                <td className="position-column-small">
                  <TransferToTheWebsite position={position} />
                </td>
                <td className="position-column-small">
                  <NavPositionPlus location={location} position={position} />
                </td>
                <td className="position-column-small">
                  <NavPositionMinus location={location} position={position} />
                </td>
                <td>
                  <ColorIndicator value={position.dailyPriceChange} />
                </td>
                <td>{position.userCurrency}</td>
                <td>{position.quantity}</td>
                <td>{roundValue(position.averagePurchasePrice)}</td>
                <td>{roundValue(position.actualPrice)}</td>
                <td>{calculateDays(position.positionOpeningDate)}</td>

                <td>
                  {roundValue(
                    position.quantity * position.actualPrice
                  ).toLocaleString()}
                </td>
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
      <div className="chart-container" style={{ marginTop: "10vh" }}>
        <PortfolioChart
          positions={sortedPositions}
          cash={calculatePercentage(cashEntity.value, wallet.actualValue)}
        />
      </div>
    </>
  );
};

export default WalletPage;
