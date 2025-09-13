import React from "react";
import MapImg from "../assets/images/Ubermap.jpg";
import Car from "../assets/images/car.png";
import { MdLocationPin } from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const CaptainRiding = () => {
  return (
    <div className="h-screen flex flex-col relative">
      <Link
        to="/home"
        className="absolute top-4 right-4 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
      >
        <FaHome className="text-xl text-green-600" />
      </Link>

      <div className="h-1/2">
        <img className="h-full w-full object-cover" src={MapImg} alt="Map" />
      </div>

      <div className="h-1/2 bg-white px-4 py-5 flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <img className="h-16" src={Car} alt="Car" />
          <div>
            <h2 className="text-xl font-semibold">Awais</h2>
            <h4 className="text-lg font-bold -mt-1">MNA-1122</h4>
            <p className="text-gray-500">Suzuki</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 border-b pb-3">
            <MdLocationPin className="text-2xl text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">FDA-112</h3>
              <p className="text-gray-500">Nishatabad Faisalabad</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <IoMdCash className="text-2xl text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">Rs.400</h3>
              <p className="text-gray-500">Cash</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition mt-6">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default CaptainRiding;
