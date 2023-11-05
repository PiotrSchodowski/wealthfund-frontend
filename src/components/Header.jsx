import React, { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";

import "../styles/Header.css";

const Header = () => {
  const { message } = useContext(StoreContext);
  const info = "Witaj w Waelth Fund App";

  return (
    <div>
      <h1>{message ? message : info}</h1>
    </div>
  );
};

export default Header;
