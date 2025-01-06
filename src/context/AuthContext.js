import React, { createContext, useContext, useState } from "react";
import { users } from "../data/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ phone, password }) => {
    const foundUser = users.find(
      (u) => u.numer_tel === phone && u.haslo === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("isLoggedIn", JSON.stringify(foundUser));
      return foundUser;
    } else {
      throw new Error("Niepoprawny numer telefonu lub hasło.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
