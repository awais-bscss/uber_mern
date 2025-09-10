import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainStateContext } from "../context/CaptainContext";

const UserLogout = () => {
  const { setCaptain } = useContext(CaptainStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setCaptain(null);
          navigate("/login-captain", { replace: true });
          return;
        }

        await axios.post(
          `${import.meta.env.VITE_API_URL}/captains/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem("token");
        setCaptain(null);
        navigate("/login-captain", { replace: true });
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
        localStorage.removeItem("token");
        setCaptain(null);
        navigate("/login-captain", { replace: true });
      }
    };

    logoutUser();
  }, [navigate, setCaptain]);

  return <div>Logging out...</div>;
};

export default UserLogout;
