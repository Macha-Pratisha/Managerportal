import axios from "axios";

// Backend URL depending on environment
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"              // Local dev
    : "https://everydaynewsbackend.onrender.com/api"; // Production (Render/Vercel)

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // Manager portal does not rely on cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token automatically if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle 401 globally
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

export default axiosInstance; // ✅ default export
