import React, { createContext, ReactNode, useState } from "react";
import User from "src/models/User";
import { verifyAuth } from "src/services/verifyAuth";
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  login: (email: string, username: string) => void;
  verify: () => void;
  user: User | null;
};
const initialState: AuthContextType = {
  isAuthenticated: true,
  isLoading: false,
  login: (email: string, username: string) => {},
  logout: () => {},
  verify: () => {},
  user: null,
};
export const AuthContext = createContext(initialState);
export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<null | User>(null);

  const verify = async () => {
    refresh()
    setIsLoading(true);
    console.log("run verify in the context --------");
    const res = await fetch("/api/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("----------");
    console.log(data.status);
    console.log("----------");
    if (data.status != 200) logout();
    else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  };
  const refresh = async () => {
    const response = await fetch("/api/refresh",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
    })
    const data = await response.json()
    if(response.status!=200)logout()
  };
  const login = (email: string, username: string) => {
    const currentUser = { email, username };
    setIsAuthenticated(true);
    setUser(currentUser);
  };
  const logout = async () => {
    console.log("logging out");
    const response = await fetch("/api/logout");
    const data  = await response.json();
    console.log(data)
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };
  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    verify,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
