import { createContext, useState, useCallback, ReactNode } from 'react';
import { AuthContextType, AuthUser } from '../@types/authentication';
import { currentUserStorageKey } from '../services/base-api-service';

const AuthContext = createContext<AuthContextType | null>(null);

function AuthStore({ children }: { children: ReactNode }) {
  const [currentUser, setUser] = useState(
    localStorage.getItem(currentUserStorageKey)
      ? JSON.parse(localStorage.getItem(currentUserStorageKey) || '{}')
      : null
  );

  const handleUserChange = useCallback((currentUser: AuthUser) => {
    if (currentUser) localStorage.setItem(currentUserStorageKey, JSON.stringify(currentUser));
    else localStorage.removeItem(currentUserStorageKey);
    setUser(currentUser);
  }, []);

  const isAuthenticated = useCallback(() => {
    return currentUser && currentUser.email;
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, onUserChange: handleUserChange }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthStore as default, AuthContext };
