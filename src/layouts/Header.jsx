import React, { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";

const Header = () => {
  const { message } = useContext(StoreContext);
  const info = "Witaj w Waelth Fund App";

  return <div className="header"> {/* Dodaj klasę header tutaj */}</div>;
};

export default Header;
