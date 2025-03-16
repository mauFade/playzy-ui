"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { setCookie, deleteCookie } from "cookies-next";

const COOKIE_KEY = "jwtToken";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  saveUserToken(t: string): void;
  logout: () => void;
  isLoading: boolean;
};

// Crie o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

// Provedor do contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se o usuário já está logado ao carregar a página
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // Verificar se há um token no localStorage
        const token = localStorage.getItem("authToken");

        if (token) {
          // Buscar dados do usuário da API
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token inválido, remover do localStorage
            localStorage.removeItem("authToken");
          }
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const saveUserToken = (t: string): void => {
    setCookie(COOKIE_KEY, t);
  };

  const logout = () => {
    deleteCookie(COOKIE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveUserToken, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
