import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://everydaynewsbackend.onrender.com/api",
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
