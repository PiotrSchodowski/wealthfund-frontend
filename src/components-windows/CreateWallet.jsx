import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import WalletService from "../services/wallet.service";
import AuthService from "../services/auth.service";

import "../styles/Form.css";
import "../styles/Buttons.css";
import "../styles/AuthForm.css";

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

const CreateWallet = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [walletName, setWalletName] = useState("");
  const [currency, setCurrency] = useState("");
  const [message, setMessage] = useState("");

  const onChangeWalletName = (e) => {
    const name = e.target.value;
    setWalletName(name);
  };

  const onChangeCurrency = (e) => {
    const currency = e.target.value;
    setCurrency(currency);
  };

  const handleCreateWallet = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (!currency) {
        setMessage("Currency field is required!");
        return;
      }
    }

    if (checkBtn.current.context._errors.length === 0) {
      WalletService.createWallet(user.username, walletName, currency).then(
        async () => {
          navigate("/wallets");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
        }
      );
    }
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleCreateWallet} ref={form}>
          <div className="form-group">
            <label htmlFor="walletName">wallet name</label>
            <Input
              type="text"
              className="form-control"
              name="walletName"
              value={walletName}
              onChange={onChangeWalletName}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="currency">currency</label>
            <select
              className="form-control"
              name="currency"
              value={currency}
              onChange={onChangeCurrency}
              validations={[required]}
            >
              <option value="" disabled>
                choose currency
              </option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="PLN">PLN</option>
            </select>
          </div>
          <br />
          <div className="form-group text-center">
            <button className="btn btn-dark" onClick={handleCreateWallet}>
              Create
            </button>
            <button
              className="btn btn-danger cancel-button"
              onClick={() => navigate("/wallets")}
            >
              Cancel
            </button>
          </div>
          <br />
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

export default CreateWallet;
