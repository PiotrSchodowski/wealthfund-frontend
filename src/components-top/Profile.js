import React, { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const { wallets } = useContext(StoreContext);
  const currencySums = {};

  wallets.forEach((wallet) => {
    const { currency, actualValue } = wallet;
    if (!currencySums[currency]) {
      currencySums[currency] = actualValue;
    } else {
      currencySums[currency] += actualValue;
    }
  });

  return (
    <div
      className="container-profile"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h2 style={{ color: "#ff9805" }}>
        <strong>{currentUser.username}</strong> Profile
      </h2>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Name:</strong> {currentUser.username}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Wallets:</strong> {wallets.length}
          </p>
        </div>
        <div style={{ alignItems: "flex-start", marginRight: "200px" }}>
          <div>
            <strong>Fortune:</strong>{" "}
            {Object.entries(currencySums).map(([currency, sum]) => (
              <div
                key={currency}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span style={{ color: "#ff9805", marginRight: "5px" }}>
                  {sum.toLocaleString()}
                </span>
                <span style={{ fontSize: "15px", letterSpacing: "1px" }}>
                  {currency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
