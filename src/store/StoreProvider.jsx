import React, { createContext, useEffect, useState } from "react";
import request from "../helpers/request";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const { data } = await request.get("/users");
    setUsers(data.users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider value={{ users, setUsers }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
