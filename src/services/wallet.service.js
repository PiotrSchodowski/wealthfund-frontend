import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

const createWallet = (userName, walletName, currency) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.post(
    `${API_URL}/${userName}/wallets/${walletName}/${currency}`,
    {}, // IMPORTANT
    config
  );
};

const deleteWallet = (userName, walletName) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.delete(`${API_URL}/${userName}/wallets/${walletName}`, config);
};

const getWallets = (userName) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.get(`${API_URL}/${userName}/wallets`, config);
};

const getCurrentWallet = async (userName, walletName) => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(
      `${API_URL}/${userName}/wallets/${walletName}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error during load data:", error);
    throw error;
  }
};

const getActualPricesToWallet = async (userName, walletName) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.get(
    `${API_URL}/${userName}/wallets/${walletName}/updatePrices`,
    config
  );
};

const WalletService = {
  getWallets,
  deleteWallet,
  createWallet,
  getCurrentWallet,
  getActualPricesToWallet,
};

export default WalletService;
