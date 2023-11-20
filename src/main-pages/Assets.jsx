import React, { useState } from "react";
import AssetService from "../services/asset.service";
import Form from "react-validation/build/form";

const Assets = () => {
  const [loading, setLoading] = useState(false);
  const [assetDto, setAssetDto] = useState({
    name: "",
    symbol: "",
    exchange: "",
    assetType: "",
    currency: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setAssetDto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImportAssets = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("importing assets");

    AssetService.importAssetsGpw();
    AssetService.importAssetsUsa();
    AssetService.importAssetsCrypto();
    setLoading(false);
    alert("Assets imported");
  };

  const handleCreateAsset = (e) => {
    e.preventDefault();
    console.log("creating asset");
    alert("Asset created");
    AssetService.createAsset(assetDto);
  };

  return (
    <div
      className="container"
      style={{
        fontWeight: 500,
        fontSize: "30px",
        fontVariant: "small-caps",
        letterSpacing: "2px",
        display: "flex",
        minHeight: "60vh",
      }}
    >
      <div className="container-1" style={{ flex: 1, marginRight: "20px" }}>
        <label htmlFor="import" style={{ fontSize: "14px" }}>
          Import from API
        </label>
        <button
          className="btn btn-dark"
          onClick={handleImportAssets}
          style={{ fontVariant: "small-caps" }}
        >
          import all assets
        </button>
        <br />
        <br />
        <Form onSubmit={handleCreateAsset}>
          <div className="row" style={{ fontSize: "14px" }}>
            <div className="col-md-3">
              <label htmlFor="symbol">Symbol</label>
              <input
                type="text"
                className="form-control"
                name="symbol"
                value={assetDto.symbol}
                onChange={onChange}
              />
            </div>
            <div className="col-md-8">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={assetDto.name}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="row" style={{ fontSize: "14px" }}>
            <div className="col-md-4">
              <label htmlFor="currency">Currency</label>
              <input
                type="text"
                className="form-control"
                name="currency"
                value={assetDto.currency}
                onChange={onChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="exchange">Exchange</label>
              <input
                type="text"
                className="form-control"
                name="exchange"
                value={assetDto.exchange}
                onChange={onChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control"
                name="assetType"
                value={assetDto.assetType}
                onChange={onChange}
              />
            </div>
          </div>

          <button
            className="btn btn-dark"
            onClick={handleCreateAsset}
            style={{ marginTop: "15px", fontVariant: "small-caps" }}
          >
            Create asset
          </button>
        </Form>
      </div>
      <div className="container-2" style={{ flex: 1.5 }}>
        <img
          src="/8.jpg"
          alt="Asset"
          style={{
            width: "100%",
            height: "auto",
            padding: "2px",
            backgroundColor: "#0d0c0d",
          }}
        />
      </div>
    </div>
  );
};

export default Assets;
