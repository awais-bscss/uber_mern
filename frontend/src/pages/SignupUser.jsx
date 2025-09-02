import React, { useState } from "react";
import UberLogo from "../assets/images/UberLogo.png";
import { Link } from "react-router-dom";

const SignupUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      username: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    console.log(userData);
    setFirstName("");
    setLastName("");
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

          {/* Full Name with First + Last */}
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

          {/* Email */}
          <h3 className="text-lg font-semibold mb-2">What's Your Email</h3>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full mb-4 px-3 py-2 text-sm bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Password */}
          <h3 className="text-lg font-semibold mb-2">Create Password</h3>
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
            Sign Up
          </button>

          {/* Already have account */}
          <p className="text-sm text-gray-600 mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </form>
      </div>

      {/* Uber style bottom text */}
      <div className="pb-6 flex justify-center">
        <p className="text-xs text-gray-500 text-center max-w-xs">
          By continuing, you agree to Uber’s Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
};

export default SignupUser;
