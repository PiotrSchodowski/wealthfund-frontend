import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import PositionService from "../services/position.service";
import AuthService from "../services/auth.service";
import WalletService from "../services/wallet.service";
import AssetService from "../services/asset.service";

import "../styles/Form.css";

const user = AuthService.getCurrentUser();

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const DecreasePosition = () => {
  const { walletName, positionId } = useParams();
  const [currencyWallet, setCurrencyWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [symbolOptions, setSymbolOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [positionData, setPositionData] = useState({
    symbol: "",
    currency: "",
    quantity: 0,
    price: 0,
    endingCurrencyRate: 1,
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setPositionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (positionId) {
      PositionService.getPosition(positionId)
        .then((response) => {
          setPositionData((prevData) => ({
            ...prevData,
            symbol: response.data.body.symbol,
            exchange: response.data.body.exchange,
            currency: response.data.body.userCurrency,
          }));
        })
        .catch((error) => {
          console.error("Error retrieving position details:", error);
        });
    }
  }, [positionId]);

  // pobranie danych portfela
  useEffect(() => {
    WalletService.getCurrentWallet(user.username, walletName)
      .then((response) => {
        setCurrencyWallet(response.currency);
      })
      .catch((error) => {
        console.error("Error retrieving wallet details:", error);
      });
  }, [user.username, walletName]);

  // zmiejszanie pozycji
  const handleDecreasePosition = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const symbolToSend = positionData.symbol.split(" ")[0].toUpperCase();

      PositionService.decreasePosition(user.username, walletName, {
        ...positionData,
        symbol: symbolToSend,
      }).then(
        () => {
          navigate(`/positions/${walletName}`);
          setLoading(false);
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setLoading(false);
        }
      );
    }
  };
  const displayOpeningCurrencyRate = positionData.currency !== currencyWallet;

  return (
    <div className="col-md-12">
      <div className="card card-container edit-form">
        <Form onSubmit={handleDecreasePosition} ref={form}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="quantity">Quantity</label>
              <Input
                type="number"
                className="form-control"
                name="quantity"
                value={positionData.quantity}
                onChange={onChange}
                validations={[required]}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="price">Price</label>
              <Input
                type="number"
                step="0.01"
                className="form-control"
                name="price"
                value={positionData.price}
                onChange={onChange}
                validations={[required]}
              />
            </div>
            {displayOpeningCurrencyRate && (
              <div className="col-md-6">
                <label htmlFor="endingCurrencyRate">Ending Currency Rate</label>
                <Input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="endingCurrencyRate"
                  value={positionData.endingCurrencyRate}
                  onChange={onChange}
                />
              </div>
            )}
          </div>

          <br />
          <div className="form-group text-center">
            <button
              className="btn btn-dark create-button"
              disabled={loading}
              onClick={handleDecreasePosition}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Decrease</span>
            </button>
            <button
              className="btn btn-danger cancel-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default DecreasePosition;
