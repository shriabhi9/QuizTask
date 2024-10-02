import React, { createContext, useState } from 'react';
import { useContext } from 'react';

const initialValue = false;


export const LoginContext = createContext(initialValue);

export const LoginProvider = ({ children }) => {
  const [LoginProperty, setLoginProperty] = useState(initialValue);
    
  return (
    <LoginContext.Provider value ={{ LoginProperty, setLoginProperty }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginProperty = () => useContext(LoginContext);