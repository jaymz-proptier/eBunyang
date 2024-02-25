import axios from "axios";

export default axios.create({
  baseURL: "https://test-api.ebunyang.co.kr/v2",
  headers: {
    "Content-type": "application/json",
  },
});
