import React, { createContext, useState } from 'react';
import { useContext } from 'react';

const initialValue = false;


export const LoginShowContext = createContext(initialValue);

export const LoginShowProvider = ({ children }) => {
  const [LoginShow, setLoginShow] = useState(initialValue);
    
  return (
    <LoginShowContext.Provider value ={{ LoginShow, setLoginShow }}>
      {children}
    </LoginShowContext.Provider>
  );
};

export const useLoginShow = () => useContext(LoginShowContext);