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

// Determine base URL depending on environment
const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5000/api" // development
  : "/api";                     // production (same domain)

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // important
  },
});

// ------------------ Request interceptor (JWT) ------------------
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token"); // your JWT key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

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
