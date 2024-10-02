import React, { createContext, useState } from 'react';
import { useContext } from 'react';

const initialValue = false;


export const DoneContext = createContext(initialValue);

export const DoneProvider = ({ children }) => {
  const [LoginDone, setLoginDone] = useState(initialValue);
    
  return (
    <DoneContext.Provider value ={{ LoginDone, setLoginDone }}>
      {children}
    </DoneContext.Provider>
  );
};

export const useLoginDoneProperty = () => useContext(DoneContext);