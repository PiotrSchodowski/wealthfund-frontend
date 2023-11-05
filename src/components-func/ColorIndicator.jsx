import React from "react";

const ColorIndicator = ({ value }) => {
  const getColorClass = (value) => {
    if (value > 0) {
      return "text-success"; // Zielony kolor
    } else if (value < 0) {
      return "text-danger"; // Czerwony kolor
    } else {
      return ""; // Brak koloru
    }
  };

  return <span className={getColorClass(value)}>{value}</span>;
};

export default ColorIndicator;
