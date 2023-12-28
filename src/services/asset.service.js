// asset.service.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/dataManagement/assets";

const searchAssets = async (searchDto) => {
  try {
    const response = await axios.get(`${API_URL}/getAll`);
    const assets = response.data;

    const filteredAssets = searchDto
      ? assets.filter((asset) =>
          asset.symbol.toLowerCase().includes(searchDto.toLowerCase())
        )
      : assets;

    const options = filteredAssets.map((asset) => ({
      value: asset.symbol,
      label: `${asset.symbol} (${asset.name})`,
    }));

    return options;
  } catch (error) {
    console.error("Error during downloading data:", error);
    throw error;
  }
};

const importAssetsGpw = async () => {
  try {
    const response = await axios.get(`${API_URL}/import/gpwAssets`);
    const assets = response.data;
    return assets;
  } catch (error) {
    console.error("Error during downloading data:", error);
    throw error;
  }
};

const importAssetsUsa = async () => {
  try {
    const response = await axios.get(`${API_URL}/import/usaAssets`);
    const assets = response.data;
    return assets;
  } catch (error) {
    console.error("Error during downloading data:", error);
    throw error;
  }
};

const importAssetsCrypto = async () => {
  try {
    const response = await axios.get(`${API_URL}/import/cryptocurrencies`);
    const assets = response.data;
    return assets;
  } catch (error) {
    console.error("Error during downloading data:", error);
    throw error;
  }
};

const createAsset = async (AssetDto) => {
  try {
    const response = await axios.post(`${API_URL}/insert`, AssetDto);
    const asset = response.data;
    return asset;
  } catch (error) {
    console.error("Error during downloading data:", error);
    throw error;
  }
};

const AssetService = {
  searchAssets,
  importAssetsGpw,
  importAssetsUsa,
  importAssetsCrypto,
  createAsset,
};

export default AssetService;
