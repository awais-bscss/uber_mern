import React, { createContext, useState } from "react";

export const CaptainStateContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
  });
  return (
    <CaptainStateContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainStateContext.Provider>
  );
};

export default CaptainContext;
