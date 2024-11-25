import axios from "axios";
import config from "../config"; // Assuming you have a config file for API URLs

export default function generateHash() {
  const fetchIntentionCount = async () => {
    const response = await axios.get(
      `${config.API}/configuration/intentionCount`
    );
    console.log(response.data);

    if (response.status === 200) {
      const intentionCount = response.data;
      console.log(response.data);
      return intentionCount;
    } else {
      console.error("Failed to fetch intention count");
      return null;
    }
    // } catch (error) {
    //   console.error("Error fetching intention count:", error);
    //   return null;
    // }
  };
  fetchIntentionCount();
}
