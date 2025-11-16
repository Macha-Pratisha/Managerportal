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

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api" // local development
    : "https://everydaynewsbackend.onrender.com/api"; // Render backend

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // ✅ important
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
