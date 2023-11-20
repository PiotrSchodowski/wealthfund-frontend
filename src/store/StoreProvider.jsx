import React, { createContext, useEffect, useState } from "react";
import WalletService from "../services/wallet.service";
import AuthService from "../services/auth.service";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user && user.username) {
      WalletService.getWallets(user.username)
        .then((response) => {
          setWallets(response.data);
        })
        .catch((error) => {
          setMessage("Data download failed.");
        });
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
