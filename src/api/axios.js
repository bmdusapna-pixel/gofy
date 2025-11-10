import axios from "axios";

// Default to local backend when VITE_BASE_URL is not set in development
const DEFAULT_BASE =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: DEFAULT_BASE,
  headers: {
    Accept: "application/json",
  },
});

// Add interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
