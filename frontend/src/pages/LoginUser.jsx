import React, { useState } from "react";
import UberLogo from "../assets/images/UberLogo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserStateContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserStateContext);
  if (user && user.email) {
    return <Navigate to="/home" replace={true} />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = { email: email, password: password };

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (res.status === 200) {
        setUser(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/home", { replace: true });
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials and try again.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 items-center justify-center px-4">
        <form
          className="w-full max-w-xs bg-white text-black p-6 shadow-lg rounded-2xl"
          onSubmit={submitHandler}
        >
          <div className="flex justify-center mb-6">
            <img src={UberLogo} alt="Uber Logo" className="w-20 h-auto" />
          </div>

          <h3 className="text-lg font-semibold mb-2">What's Your Email</h3>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full mb-4 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <h3 className="text-lg font-semibold mb-2">Enter Password</h3>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="w-full mb-4 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Login
          </button>

          <p className="text-sm text-gray-600 mt-3 text-center">
            New here?
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create new Account
            </Link>
          </p>
        </form>
      </div>

      <div className="pb-6 flex justify-center">
        <Link
          to={"/captain-login"}
          className="w-11/12 text-center max-w-xs bg-white text-black font-semibold py-2 rounded-lg border border-black shadow hover:bg-gray-100 transition"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default LoginUser;
