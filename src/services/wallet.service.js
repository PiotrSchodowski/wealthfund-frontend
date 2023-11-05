import axios from "axios";

const API_URL = "http://localhost:8080/user";

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
    console.error("Błąd podczas pobierania danych portfela:", error);
    throw error; // Możesz obsłużyć błąd lub go przekazać do wyżej poziomu
  }
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

const createWallet = (userName, walletName, currency) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.post(
    `${API_URL}/${userName}/wallets/${walletName}/${currency}`,
    config
  );
};

const WalletService = {
  getWallets,
  deleteWallet,
  createWallet,
  getCurrentWallet,
};

export default WalletService;
