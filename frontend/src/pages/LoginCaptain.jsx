import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UberLogo from "../assets/images/UberLogo.png";
import { CaptainStateContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCaptain = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainStateContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const captainData = { email: email, password: password };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(error);
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

          <p className="text-sm text-gray-600 mt-3 ml-1 text-center">
            Join a fleet?
            <Link
              to="/captain-signup"
              className="text-blue-600 hover:underline"
            >
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>

      <div className="pb-6 flex justify-center">
        <Link
          to={"/login"}
          className="w-11/12 text-center max-w-xs bg-white text-black font-semibold py-2 rounded-lg border border-black shadow hover:bg-gray-100 transition"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default LoginCaptain;
