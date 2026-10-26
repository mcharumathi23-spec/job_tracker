import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [token, setToken] = useState(() => authService.getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists and validate with /api/auth/me
    const initAuth = async () => {
      const storedToken = authService.getToken();
      if (storedToken) {
        try {
          const profile = await authService.getMe();
          setUser(profile);
          setToken(storedToken);
        } catch {
          // Token expired or invalid
          authService.logout();
          setUser(null);
          setToken(null);
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    };

    initAuth();

    // Listen for logout events dispatched by Axios 401 interceptor
    const handleLogoutEvent = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener('auth:logout', handleLogoutEvent);
    return () => {
      window.removeEventListener('auth:logout', handleLogoutEvent);
    };
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setToken(data.token);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
    });
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    setToken(data.token);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
    });
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
