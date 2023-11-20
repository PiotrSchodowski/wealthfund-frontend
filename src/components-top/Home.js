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
        }}
      >
        <div className="jumbotron" style={{ flex: 1, marginRight: "20px" }}>
          <h1 className="display-4">Welcome, Investor!</h1>
          <p className="lead">
            Welcome to Wealth Fund - an innovative investment platform designed
            just for you. We believe that effective financial management is the
            key to achieving financial stability and success. Therefore, Wealth
            Fund has been created to provide you with tools for making informed
            investment decisions.
          </p>
          <hr className="my-4" />

          <p>
            Our mission is to give you full control over your investment
            portfolio. Wealth Fund offers intuitive tracking features, market
            analysis, and tools to optimize investment strategies. Whether
            you're an experienced investor or just starting your financial
            journey, Wealth Fund adapts to your needs, helping you achieve your
            financial goals.
            <br />
            With our application, you can monitor every aspect of your
            portfolio, analyze market trends, and make decisions with complete
            confidence. Wealth Fund is not just a tool; it's a partner that
            supports you at every stage of your investment journey.
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
          minHeight: "50vh",
        }}
      >
        The financial market is a dynamic environment that requires constant
        attention and access to up-to-date information. In Wealth Fund, we
        provide you not only with data but also with analytical tools to help
        you understand changing trends, forecast market movements, and make
        accurate investment decisions.
        <br />
        Whether you're interested in the stock market, cryptocurrencies, or
        other financial instruments, Wealth Fund offers comprehensive support.
        Our application provides analyses, reports, and educational content to
        help you expand your knowledge and grow as an investor.
        <br />
        <br />
        Wealth Fund is more than just an investment platform. It's a place where
        enthusiasts of financial markets come together, exchange experiences,
        and learn from each other. With Wealth Fund, you gain a competitive edge
        in the financial market, the ability to make informed decisions, and
        achieve investment success. Discover the potential of the financial
        market with Wealth Fund today!
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
