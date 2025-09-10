import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../context/userContext";

const UserProtectedWrap = ({ children }) => {
  const { user } = useContext(UserStateContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !user) {
      navigate("/login", { replace: true });
    }
  }, [token, user, navigate]);

  return token && user ? children : null;
};

export default UserProtectedWrap;
