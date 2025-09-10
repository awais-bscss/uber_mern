import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginUser from "./pages/LoginUser";
import SignupUser from "./pages/SignupUser";
import LoginCaptain from "./pages/LoginCaptain";
import SignupCaptain from "./pages/SignupCaptain";
import LandingPage from "./pages/LandingPage";
import UserProtectedWrap from "./pages/UserProtectedWrap";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<SignupUser />} />
        <Route path="/captain-signup" element={<SignupCaptain />} />
        <Route path="/captain-login" element={<LoginCaptain />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrap>
              <Home />
            </UserProtectedWrap>
          }
        />
        <Route
          path="/users/logout"
          element={
            <UserProtectedWrap>
              <UserLogout />
            </UserProtectedWrap>
          }
        />

        <Route path="/captain-home" element={<CaptainHome />} />
      </Routes>
    </div>
  );
};

export default App;
