import axios from "axios";
export const productUrl = "https://fakestoreapi.com";
const axiosInstance = axios.create({
  baseURL:"https://amazon-api-deploy-rzmi.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
  timeout: 30000,
});

export { axiosInstance };

