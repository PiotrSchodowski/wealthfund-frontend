import React, { useState, useEffect } from "react";

import Header from "./Header";
import Navbar from "./Navbar";
import Page from "./Page";
import Footer from "./Footer";

import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import StoreProvider from "../store/StoreProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    // ------- useEffect wywolywany przy renderowaniu komponentu po to aby pobrac uzytkownika z localstorage i ustawic stan uzytkownika oraz stan czy uzytkownik jest adminem i nasluchujemy na zdarzenie logout  i usuwamy nasluchiwanie na zdarzenie logout

    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ADMIN"));
    }
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    // ------- funkcja wywolywana przy wylogowaniu
    AuthService.logout(); // ------- wywolujemy funkcje logout z serwisu AuthService
    setShowAdminBoard(false); // ------- ustawiamy stan czy uzytkownik jest adminem na false
    setCurrentUser(undefined); // ------- ustawiamy stan uzytkownika na undefined
  };

  return (
    <StoreProvider>
      <div className="app">
        <Navbar
          currentUser={currentUser} // ------- przekazujemy currentUser do komponentu Navbar
          logOut={logOut} // ------- przekazujemy logOut do komponentu Navbar
        />
        <header>
          <Header />
        </header>
        <main>
          <div className="Page">
            <Page />
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </StoreProvider>
  );
};
export default App;
