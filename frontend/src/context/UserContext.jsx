import React, { createContext, useState } from "react";

export const UserStateContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
  });
  return (
    <UserStateContext.Provider value={{ user, setUser }}>
      {children}
    </UserStateContext.Provider>
  );
};

export default UserContext;
