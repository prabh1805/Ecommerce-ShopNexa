import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// ✅ Attach token ONLY for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const isAuthEndpoint =
    config.url.includes("/api/auth/login") ||
    config.url.includes("/api/auth/register");

  if (token && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
