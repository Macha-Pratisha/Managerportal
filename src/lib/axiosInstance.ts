
import axios from "axios";

// Determine backend URL
const BASE_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"           // local dev backend
      : "https://everydaynewsbackend.onrender.com/api"); // Render backend

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // include cookies if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------ Request interceptor (JWT) ------------------
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token"); // JWT key for manager portal
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------ Response interceptor (Auth errors) ------------------
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user_data");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
