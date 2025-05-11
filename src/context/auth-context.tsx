"use client";

import { User } from "@/@types/user";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  setUserData: (data: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        const userObject = JSON.parse(userCookie.toString());
        setUser(userObject);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        deleteCookie("user");
        deleteCookie("jwtToken");
      }
    }
  }, []);

  const setUserData = (data: User, token: string) => {
    setCookie("user", JSON.stringify(data));
    setCookie("jwtToken", token);
    setUser(data);
  };

  const logout = () => {
    deleteCookie("user");
    deleteCookie("jwtToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
