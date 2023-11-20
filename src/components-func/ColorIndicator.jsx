import React from "react";

const ColorIndicator = ({ value }) => {
  const getColorClass = (value) => {
    if (value > 0) {
      return "text-success";
    } else if (value < 0) {
      return "text-danger";
    } else {
      return "";
    }
  };

  return <span className={getColorClass(value)}>{value}</span>;
};

export default ColorIndicator;
