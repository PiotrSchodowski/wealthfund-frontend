import axios from "axios";

const API_URL = "http://localhost:8080/user";

const addPosition = (userName, walletName, addPositionDto) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.post(
    `${API_URL}/${userName}/wallet/${walletName}/position`,

    addPositionDto,
    config
  );
};

const decreasePosition = (userName, walletName, subtractPositionDto) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.put(
    `${API_URL}/${userName}/wallet/${walletName}/position/decrease`,
    subtractPositionDto,
    config
  );
};

const undoOperation = (userName, walletName, operationId) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.delete(
    `${API_URL}/${userName}/wallet/${walletName}/position/undo/${operationId}`,
    {},
    config
  );
};

const getPosition = (positionId) => {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios.get(`${API_URL}/position/${positionId}`, config);
};

const PositionService = {
  addPosition,
  decreasePosition,
  undoOperation,
  getPosition,
};

export default PositionService;
