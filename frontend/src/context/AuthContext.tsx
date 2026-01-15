import { createContext, type ReactNode, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

interface User {
  id: number;
  role: 'CLIENTE' | 'TECNICO';
}

interface AuthContextType {
  user: User | null;
  signIn: (token: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Ao carregar a página, verifica se já tem token salvo
    const token = localStorage.getItem('bbg_token');
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        signOut(); // Se o token for inválido, desloga
      }
    }
  }, []);

  function signIn(token: string) {
    localStorage.setItem('bbg_token', token);
    const decoded = jwtDecode<User>(token);
    setUser(decoded);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  function signOut() {
    localStorage.removeItem('bbg_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}