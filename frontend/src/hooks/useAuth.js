import { useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return { user, login, logout, isAuthenticated: !!user };
}