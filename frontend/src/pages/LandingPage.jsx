import React from "react";
import UberLogo from "../assets/images/UberLogo.png";
import LandingPageImage from "../assets/images/landingpage.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <div
        className="h-screen w-full flex justify-between flex-col pt-6 sm:pt-8"
        style={{
          backgroundImage: `url(${LandingPageImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          className="w-20 sm:w-24 ml-5 sm:ml-7"
          src={UberLogo}
          alt="Uber Logo"
        />

        <div className="bg-slate-200 px-4 sm:px-6 py-6 sm:py-8 pb-10 sm:pb-12 rounded-t-2xl sm:rounded-t-3xl">
          <h2 className="text-2xl sm:text-[28px] font-[700]">
            Get Started With Uber
          </h2>

          <Link
            to={"/login"}
            className=" inline-block font-semibold w-full bg-black py-3 text-center sm:py-4 text-xl sm:text-2xl mt-4 sm:mt-5 rounded-lg text-white"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
