import React from "react";

const Home = () => {
  return (
    <>
      <div
        className="container-home"
        style={{
          fontVariant: "small-caps",
          letterSpacing: "2px",
          display: "flex",
          minHeight: "60vh",
          fontSize: "15px",
        }}
      >
        <div className="jumbotron" style={{ flex: 1, marginRight: "20px" }}>
          <h1 className="display-4">Welcome, Investor!</h1>
          <p className="lead">
            <span style={{ color: "#ff9805" }}>Welcome to WealthFund</span> - an
            innovative investment platform designed just for you.
            <br />
            We believe that effective financial management is the key to
            achieving financial stability and success. WealthFund has been
            created to provide you with tools for making informed investment
            decisions.
          </p>
          <hr className="my-4" />

          <p>
            Our mission is to give you full control over your investment
            portfolio. WealthFund provides a comprehensive view of your
            investments, access to real-time prices, and tools to optimize
            investment strategies.
            <br />
            <br />
            Whether you're an experienced investor or just starting your
            financial journey, WealthFund adapts to your needs, helping you
            achieve your financial goals.
            <br />
            <br />
            With our application, you can monitor every aspect of your
            portfolio, analyze market trends, and make decisions with complete
            confidence.
          </p>
        </div>
        <div className="container-2" style={{ flex: 0.8 }}>
          <img
            src="/7.jpg"
            alt="Asset"
            style={{
              marginTop: "10vh",
              width: "100%",
              height: "auto",
              padding: "2px",
              backgroundColor: "#0d0c0d",
            }}
          />
        </div>
      </div>
      <div
        className="jumbotron"
        style={{
          marginRight: "30px",
          fontVariant: "small-caps",
          letterSpacing: "2px",
          display: "flex",
          minHeight: "35vh",
        }}
      >
        WealthFund is not just a tool; it's a partner that supports you at every
        stage of your investment journey.
        <br />
        <br />
        The financial market is a dynamic environment that requires constant
        attention and access to up-to-date information. In Wealth Fund, we
        provide you not only with data but also with analytical tools to help
        you understand changing trends, forecast market movements, and make
        accurate investment decisions.
        <br />
        <br />
        Whether you're interested in the stock market, cryptocurrencies, or
        other financial instruments, Wealth Fund offers comprehensive support.
        <br />
        <br />
        Register today and take your investments to the next level. Discover the
        potential of the financial market with WealthFund!
      </div>
      <div className="container-2" style={{ flex: 1 }}>
        <img
          src="/3.jpg"
          alt="Asset"
          style={{
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
export default Home;
