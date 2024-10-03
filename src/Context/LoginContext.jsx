import React, { createContext, useContext, useState, useEffect } from "react";

const LoggedinContext = createContext();

export const useLoggedinProperty = () => useContext(LoggedinContext);

export const LoggedinProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize as false

  // On component mount, check for the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Set the user as logged in if token exists
    }
  }, []);

  return (
    <LoggedinContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedinContext.Provider>
  );
};
