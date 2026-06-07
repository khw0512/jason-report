import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));

  function login(t) {
    localStorage.setItem('admin_token', t);
    setToken(t);
  }

  function logout() {
    localStorage.removeItem('admin_token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn: Boolean(token) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
