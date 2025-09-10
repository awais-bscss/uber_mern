import React, { useContext, useState } from "react";
import UberLogo from "../assets/images/UberLogo.png";
import { Link } from "react-router-dom";
import { CaptainStateContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupCaptain = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(1);
  const [vehicleType, setVehicleType] = useState("");

  const { setCaptain } = useContext(CaptainStateContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const CaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        licensePlate: vehiclePlate,
        vehicleType: vehicleType,
        capacity: vehicleCapacity,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      CaptainData
    );
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity(1);
    setVehicleType("");
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
          <h3 className="text-lg font-semibold mb-2">What's Your Full Name</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-1/2 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-1/2 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
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
          <h3 className="text-lg font-semibold mb-2">Create Password</h3>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="w-full mb-4 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Vehicle details */}
          <h3 className="text-lg font-semibold mb-2">Vehicle details</h3>

          <input
            type="text"
            name="vehicleColor"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            placeholder="Vehicle color (e.g. Blue)"
            className="w-full mb-3 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            name="vehiclePlate"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            placeholder="License plate"
            className="w-full mb-3 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <div className="flex gap-2 mb-3">
            <select
              name="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-1/2 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select vehicle type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>

            <input
              type="number"
              name="vehicleCapacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(Number(e.target.value))}
              min={1}
              max={8}
              placeholder="Capacity"
              className="w-1/2 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
          <p className="text-sm text-gray-600 mt-3 text-center">
            Already have an account?
            <Link to="/captain-login" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </form>
      </div>

      <div className="pb-6 flex justify-center">
        <p className="text-xs text-gray-500 text-center max-w-xs">
          By continuing, you agree to Uber’s Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
};

export default SignupCaptain;
