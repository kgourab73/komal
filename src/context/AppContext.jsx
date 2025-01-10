// src/context/AppContext.jsx
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showSurprise, setShowSurprise] = useState(false);

  return (
    <AppContext.Provider value={{ showSurprise, setShowSurprise }}>
      {children}
    </AppContext.Provider>
  );
};