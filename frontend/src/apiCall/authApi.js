import axios from "axios";
import summaryApi from "../utils/url";

export const loginApi = async (data) => {
  try {
    const res = await axios.post(summaryApi.auth.login, data)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}