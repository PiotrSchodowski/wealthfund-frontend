import React from "react";

const NoWalletsPage = () => {
  return (
    <>
      <h1
        style={{
          fontVariant: "small-caps",
          fontSize: "10vh",
          paddingTop: "3vh",
          paddingBottom: "5vh",
          color: "#ff9805",
        }}
      >
        You have no wallets yet
      </h1>
      <h4
        style={{
          fontVariant: "small-caps",
          color: "#a3a195",
          paddingBottom: "5vh",
          letterSpacing: "0.07em",
        }}
      >
        First, you need to create a wallet to be able to add positions to it.
      </h4>
      <button className="btn btn-dark">
        <a
          href="/create-wallet"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          Create your first wallet
        </a>
      </button>
      <br />

      <div className="container-2" style={{ flex: 1 }}>
        <img
          src="empty-wallet.jpg"
          alt="Wallet"
          style={{
            marginTop: "10vh",
            width: "100%",
            height: "auto",
            padding: "2px",
            backgroundColor: "#0d0c0d",
          }}
        />
      </div>
    </>
  );
};

export default NoWalletsPage;
