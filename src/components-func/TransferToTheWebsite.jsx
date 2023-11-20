import React from "react";

const TransferToTheWebsite = (position) => {
  const symbol = position.position.symbol;
  const name = position.position.name;
  const exchange = position.position.exchange;

  const handleButtonClick = () => {
    if (exchange === "GPW")
      window.open(
        `https://biznesradar.pl/notowania/${symbol}#6m_lin_lin`,
        "_blank"
      );

    if (exchange === "NYSE")
      window.open(`https://finance.yahoo.com/quote/${symbol}`, "_blank");

    if (exchange === "NASDAQ")
      window.open(`https://finance.yahoo.com/quote/${symbol}`, "_blank");

    if (exchange === "none")
      window.open(`https://coinmarketcap.com/currencies/${name}`, "_blank");
  };

  return (
    <button className="btn btn-dark-small-i" onClick={handleButtonClick}>
      i
    </button>
  );
};

export default TransferToTheWebsite;
