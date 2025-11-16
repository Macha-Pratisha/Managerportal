import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api" // local dev backend
    : "https://everydaynewsbackend.onrender.com/api"; // deployed backend

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// No token interceptor needed
// axiosInstance.interceptors.request.use(...) -> REMOVE THIS

export default axiosInstance;
