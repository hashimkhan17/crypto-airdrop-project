import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => { // Changed 'Children' to 'children' for consistency
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false); // Initialized to false instead of null
  const storeData = JSON.parse(localStorage.getItem('user_data'));

  useEffect(() => {
    if (storeData) {
      const { userToken, user } = storeData; // Changed 'userTOken' to 'userToken' for consistency
      setToken(userToken);
      setUserData(user);
      setAuthenticated(true);
    }
  }, []);

  const login = (newToken, newData) => {
    localStorage.setItem('user_data', JSON.stringify({ userToken: newToken, user: newData }));
    setToken(newToken);
    setUserData(newData);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    setToken(null);
    setUserData(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData }}> {/* Wrapped values in an object */}
      {children} {/* Changed 'Children' to 'children' */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
