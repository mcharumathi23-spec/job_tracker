import apiClient from './api';

/**
 * Authentication service handling registration, login, profile, and logout.
 */
export const authService = {
  /**
   * Register a new user account.
   */
  async register(name, email, password, confirmPassword) {
    const response = await apiClient.post('/auth/register', {
      name,
      email,
      password,
      confirmPassword: confirmPassword || password,
    });
    if (response.data && (response.data.token || response.data.accessToken)) {
      const token = response.data.token || response.data.accessToken;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
      }));
    }
    return response.data;
  },

  /**
   * Authenticate user with credentials.
   */
  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data && (response.data.token || response.data.accessToken)) {
      const token = response.data.token || response.data.accessToken;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
      }));
    }
    return response.data;
  },

  /**
   * Fetch current authenticated user's profile from backend.
   */
  async getMe() {
    const response = await apiClient.get('/auth/me');
    if (response.data) {
      const user = { ...this.getCurrentUser(), ...response.data };
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  /**
   * Log out the user and clear client-side state.
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network failures on logout
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth:logout'));
    }
  },

  /**
   * Retrieve JWT from localStorage.
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Retrieve user object from localStorage.
   */
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check if user is currently authenticated.
   */
  isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
  }
};

export default authService;
