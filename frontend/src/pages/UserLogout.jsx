import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../context/userContext";

const UserLogout = () => {
  const { setUser } = useContext(UserStateContext); // context state access
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem("token");

        // Agar token nahi hai, turant login page par bhej do
        if (!token) {
          setUser(null); // context reset
          navigate("/login", { replace: true });
          return;
        }

        // Backend logout request (POST safe)
        await axios.post(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Logout successful: localStorage clear + context reset
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login", { replace: true });
      }
    };

    logoutUser();
  }, [navigate, setUser]);

  return <div>Logging out...</div>;
};

export default UserLogout;
