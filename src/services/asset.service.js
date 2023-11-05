// asset.service.js
import axios from "axios";

const API_URL = "http://localhost:8080/dataManagement/assets";

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
    console.error("Błąd podczas pobierania danych:", error);
    throw error;
  }
};

const AssetService = {
  searchAssets,
};

export default AssetService;
