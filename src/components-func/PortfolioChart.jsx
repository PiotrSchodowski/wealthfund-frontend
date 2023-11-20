import React from "react";
import { Bar } from "react-chartjs-2";
import chartjs from "chart.js/auto";

const PortfolioBarChart = ({ positions, cash }) => {
  const chartData = {
    labels: [...positions.map((position) => position.symbol), "Cash"],
    datasets: [
      {
        label: "Assets [%]",
        data: [
          ...positions.map((position) => position.percentageOfThePortfolio),
          cash,
        ],
        backgroundColor: [
          ...Array(positions.length).fill("rgba(207, 0, 15, 0.6)"),
          "rgba(255, 255, 0, 0.6)",
        ],
        borderColor: [
          ...Array(positions.length).fill("rgba(207, 0, 15, 1)"),
          "rgba(255, 255, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: false,
          text: "Assets",
        },
        ticks: {
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
          text: "Percentage of Portfolio (%)",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          color: "#fafbfb",
        },
      },
    },
  };

  return (
    <>
      <h4>Percentage of the portfolio</h4>
      <Bar data={chartData} options={chartOptions} />
    </>
  );
};

export default PortfolioBarChart;
