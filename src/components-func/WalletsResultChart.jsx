import chartjs from "chart.js/auto";
import React from "react";
import { Line } from "react-chartjs-2";
import { calculateResult, calculateProfit } from "../components-func/mathUtils";

const WalletResultChart = ({ wallets }) => {
  const predefinedColors = [
    "#ff9805",
    "#01a58f",
    "#f54254",
    "#fafbfb",
    "#a335f0",
    "#884034",
    "#27b377",
    "pink",
    "navy",
    "blue",
  ];

  const walletWithMaxHistory = wallets.reduce((maxWallet, currentWallet) => {
    if (
      !maxWallet ||
      currentWallet.walletValueHistories.length >
        maxWallet.walletValueHistories.length
    ) {
      return currentWallet;
    }
    return maxWallet;
  }, null);

  if (!walletWithMaxHistory) {
    return <div>No data available</div>;
  }

  const commonLabels = walletWithMaxHistory.walletValueHistories.map(
    (historyEntry) => historyEntry.date
  );

  const chartData = {
    labels: commonLabels,
    datasets: wallets.map((wallet, index) => ({
      label: wallet.name,
      data: new Array(commonLabels.length - wallet.walletValueHistories.length)
        .fill(null)
        .concat(
          wallet.walletValueHistories.map(
            (historyEntry) =>
              ((historyEntry.actualValue - wallet.basicValue) /
                wallet.basicValue) *
              100
          )
        ),
      fill: false,
      borderColor: predefinedColors[index % predefinedColors.length],
      backgroundColor: predefinedColors[index % predefinedColors.length],
      borderWidth: 1,
      pointRadius: 0,
    })),
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "#fafbfb",
        },
        ticks: {
          display: false,
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          color: "#fafbfb",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Value",
          color: "#a3a195",
        },
        ticks: {
          color: "#fafbfb",
        },
        grid: {
          color: "#171616",
        },
      },
    },
  };

  return (
    <div>
      <h4>Rate of return [%]</h4>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default WalletResultChart;
