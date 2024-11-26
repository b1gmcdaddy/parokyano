import axios from "axios";
import config from "../config";

const generateHash = async () => {
  try {
    const response = await axios.get(
      `${config.API}/configuration/intentionCount`
    );
    return response.data.count;
  } catch (error) {
    console.error("Error fetching intention count:", error);
    throw new Error("Failed to generate hash");
  }
};

export default generateHash;
