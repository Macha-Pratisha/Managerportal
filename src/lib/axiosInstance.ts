// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_API_URL 
//   || (import.meta.env.MODE === 'development' 
//       ? 'http://localhost:5000/api'  // local dev backend
//       : 'https://everydaynewsbackend.onrender.com/api'); // Render backend

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json", // ✅ important
//   },
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("jwt_token"); 
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

import axios from "axios";

// Determine backend URL depending on environment
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"             // Local development
    : "https://everydaynewsbackend.onrender.com/api"; // Render backend

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // manager portal does not rely on cookies
  headers: {
    "Content-Type": "application/json", // ✅ important
  },
});

// ------------------ Request interceptor (JWT) ------------------
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token"); // JWT key
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------ Response interceptor (optional) ------------------
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle 401
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user_data");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
