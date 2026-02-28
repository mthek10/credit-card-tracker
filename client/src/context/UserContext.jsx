import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const STORAGE_KEY = 'cardtracker_user';

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for stored user
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        setUser(userData);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const requestMagicLink = async (email, name = null) => {
    try {
      setError(null);
      const res = await fetch('/api/users/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.isNewUser) {
          return { needsName: true };
        }
        throw new Error(data.error || 'Failed to send magic link');
      }

      return { 
        success: true, 
        message: data.message,
        devToken: data.devToken // For development testing
      };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    }
  };

  const verifyToken = async (token) => {
    try {
      setError(null);
      const res = await fetch('/api/users/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Invalid or expired link');
      }

      const userData = await res.json();
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    requestMagicLink,
    verifyToken,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
