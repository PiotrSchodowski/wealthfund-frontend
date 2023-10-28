import React from "react";

import StoreProvider from "../store/StoreProvider";

import "../styles/App.css";

const App = () => {
  <StoreProvider>
    <div className="App">Hello World!</div>;
  </StoreProvider>;
};

export default App;
