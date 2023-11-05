import React, { createContext, useEffect, useState } from "react";
import request from "../helpers/request";
import WalletService from "../services/wallet.service";
import AuthService from "../services/auth.service";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await request.get("/users");
      setUsers(data.users);
    } catch (error) {
      setMessage("Nie udało się pobrać danych. Spróbuj ponownie.");
    }
  };

  useEffect(() => {
    fetchData();
    const user = AuthService.getCurrentUser();

    if (user && user.username) {
      WalletService.getWallets(user.username)
        .then((response) => {
          setWallets(response.data);
        })
        .catch((error) => {
          setMessage("Nie udało się pobrać danych portfeli.");
        });
      //Tutaj dodam kolejne zaciągnięcia z serwisów i ustawianie stanów
    }
  }, []);

  return (
    <StoreContext.Provider
      value={{
        users,
        setUsers,
        message,
        setMessage,
        wallets,
        setWallets,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
