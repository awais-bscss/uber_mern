import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginUser from "./pages/LoginUser";
import SignupUser from "./pages/SignupUser";
import LoginCaptain from "./pages/LoginCaptain";
import SignupCaptain from "./pages/SignupCaptain";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<SignupUser />} />
        <Route path="/captain-signup" element={<SignupCaptain />} />
        <Route path="/captain-login" element={<LoginCaptain />} />
      </Routes>
    </div>
  );
};

export default App;
