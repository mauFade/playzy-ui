"use client";

import { User } from "@/@types/user";
import { getCookie, setCookie } from "cookies-next";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserData = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
};

type AuthContextType = {
  setUserData: (data: UserData) => void;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = getCookie("user");

    if (userCookie) {
      const userObject = JSON.parse(userCookie.toString());

      setUser({
        id: userObject.id,
        name: userObject.name,
        avatar: userObject.avatar,
        email: userObject.email,
      });
    }
  }, []);

  const setUserData = (data: UserData) => {
    setCookie(
      "user",
      JSON.stringify({
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        email: data.email,
      })
    );

    setCookie("jwtToken", data.token);
  };

  return (
    <AuthContext.Provider value={{ setUserData, user }}>
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
