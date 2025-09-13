import React from "react";
import Car from "../assets/images/car.png";
import Auto from "../assets/images/auto.png";
import Bike from "../assets/images/bike.png";
import { FaUser } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
const VehiclePanel = (props) => {
  return (
    <div>
      <FaCaretDown
        onClick={() => props.setVehiclePanel(false)}
        className="absolute top-5 right-5 text-xl  cursor-pointer"
      />
      <h3 className="text-2xl font-bold mb-3">Choose a vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmVehicle(true), props.setVehiclePanel(false);
        }}
        className=" w-full flex justify-between border-2 rounded-lg active:border-green-700  border-black mb-2 bg-white items-center"
      >
        <img className="h-12 ml-1" src={Car} alt="Car_img" />
        <div className="ml-3 w-[60%]">
          <h4 className="text-xl font-semibold">
            UberX
            <span className="ml-3 p-1">
              <FaUser className="inline text-sm mb-1" />4
            </span>
          </h4>
          <h3 className="text-lg font-semibold">2 min away</h3>
          <p className="text-gray-900">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl mr-1 font-semibold"> Rs.400</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmVehicle(true), props.setVehiclePanel(false);
        }}
        className=" w-full flex justify-between border-2 rounded-lg active:border-green-700 border-black mb-2 bg-white items-center"
      >
        <img className="h-12" src={Auto} alt="Auto_img" />
        <div className="ml-2 w-[60%]">
          <h4 className="text-xl font-semibold">
            UberAuto
            <span className="ml-3 p-1">
              <FaUser className="inline text-sm mb-1" />3
            </span>
          </h4>
          <h3 className="text-lg font-semibold">2 min away</h3>
          <p className="text-gray-900">Affordable, auto rides</p>
        </div>
        <h2 className="text-xl mr-1 font-semibold"> Rs.200</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmVehicle(true), props.setVehiclePanel(false);
        }}
        className=" w-full flex justify-between border-2 rounded-lg active:border-green-700  border-black mb-2 bg-white items-center"
      >
        <img className="h-12 ml-4" src={Bike} alt="Bike_img" />
        <div className="ml-7 w-[60%]">
          <h4 className="text-xl font-semibold">
            Moto
            <span className="ml-3 p-1">
              <FaUser className="inline text-sm mb-1" />1
            </span>
          </h4>
          <h3 className="text-lg font-semibold">2 min away</h3>
          <p className="text-gray-900">Affordable, motorcycle rides</p>
        </div>
        <h2 className="text-xl mr-1 font-semibold"> Rs.100</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
