import axios from "axios";

const fetchPincodeDetails = async (pincode) => {
  try {
    const response = await axios.get(`https://indianpincodes.co.in/api/pincode/${pincode}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      }
    );
    console.log("Pincode Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pincode details:", error.message);
    return null;
  }
};

export default fetchPincodeDetails;
