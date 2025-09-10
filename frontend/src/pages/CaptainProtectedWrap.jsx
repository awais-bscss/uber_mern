import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainStateContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectedWrap = ({ children }) => {
  const { captain, setCaptain } = useContext(CaptainStateContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login", { replace: true });
      return;
    }

    if (!captain) {
      const fetchCaptain = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/captains/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            setCaptain(response.data.captain);
          } else {
            localStorage.removeItem("token");
            navigate("/captain-login", { replace: true });
          }
        } catch (error) {
          console.error(error);
          localStorage.removeItem("token");
          navigate("/captain-login", { replace: true });
        } finally {
          setIsLoading(false);
        }
      };

      fetchCaptain();
    } else {
      setIsLoading(false);
    }
  }, [token, captain, setCaptain, navigate]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return token && captain ? children : null;
};

export default CaptainProtectedWrap;
