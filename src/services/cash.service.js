import axios from "axios";

const API_URL = "http://localhost:8080/user";

const cashDeposit = (userName, walletName, amount) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.post(
    `${API_URL}/${userName}/wallet/${walletName}/cashDeposit/${amount}`,
    config
  );
};

const cashWithdraw = (userName, walletName, amount) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.post(
    `${API_URL}/${userName}/wallet/${walletName}/cashWithdraw/${amount}`,
    config
  );
};

const cashService = {
  cashDeposit,
  cashWithdraw,
};

export default cashService;
