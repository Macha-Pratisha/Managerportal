// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api",
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

// Backend URL on Render
const BASE_URL = "https://everydaynewsbackend.onrender.com/api";

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
    const token = localStorage.getItem("jwt_token"); // your JWT key
    if (token) {
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
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user_data");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
