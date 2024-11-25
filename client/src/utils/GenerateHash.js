import axios from "axios";
import config from "../config"; // Assuming you have a config file for API URLs

export default async function generateHash() {
  try {
    const response = await axios.get(
      `${config.API}/configuration/intentionCount`
    );
    if (response.status == 200) {
      return response.data.intentionCount; // Return the intention count
    } else {
      console.error("Failed to fetch intention count");
      return null;
    }
  } catch (error) {
    console.error("Error fetching intention count:", error);
    return null;
  }
}
