import React, { useState, useEffect } from "react";

import Header from "./Header";
import Navbar from "./Navbar";
import Page from "./Page";

import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import StoreProvider from "../store/StoreProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <StoreProvider>
      <div className="app">
        <Navbar currentUser={currentUser} logOut={logOut} />
        <header>
          <Header />
        </header>
        <main>
          <Page />
        </main>
      </div>
    </StoreProvider>
  );
};
export default App;
