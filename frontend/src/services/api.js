import axios from 'axios';

/**
 * Reusable Axios instance configured with base URL from environment variables.
 * Falls back to http://localhost:8080/api for local backend development.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor placeholder (ready for JWT authentication token injection in later phases)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor placeholder for standardized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Phase 1 error handling placeholder
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };
