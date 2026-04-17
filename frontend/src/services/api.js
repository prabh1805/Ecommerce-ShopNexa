import axios from "axios";

const api = axios.create({
  baseURL: "",
});

// ✅ Attach token ONLY for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const isAuthEndpoint =
    config.url.includes("/api/auth/login") ||
    config.url.includes("/api/auth/register");

  const isPublicEndpoint =
    isAuthEndpoint ||
    (config.method === "get" && config.url.match(/^\/api\/product(\?|$)/));

  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
