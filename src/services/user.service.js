import axios from "axios";

const API_URL = "http://localhost:8080/users";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const UserService = {
  getPublicContent,
};

export default UserService;
