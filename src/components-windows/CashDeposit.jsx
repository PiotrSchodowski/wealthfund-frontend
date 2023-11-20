import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import CashService from "../services/cash.service";
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

const CashDeposit = () => {
  const { walletName } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const handleCashDeposit = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      CashService.cashDeposit(user.username, walletName, amount).then(
        () => {
          navigate(-1);
          setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setLoading(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container edit-form">
        <Form onSubmit={handleCashDeposit} ref={form}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="amount">Amount</label>
              <Input
                type="number"
                className="form-control"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                validations={[required]}
              />
            </div>
          </div>

          <br />
          <div className="form-group text-center">
            <button
              className="btn btn-dark create-button"
              disabled={loading}
              onClick={handleCashDeposit}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Deposit</span>
            </button>
            <button
              className="btn btn-danger cancel-button"
              onClick={() => navigate(-1)}
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

export default CashDeposit;
