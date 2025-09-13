import React from "react";
import Car from "../assets/images/car.png";
import { FaCaretDown } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { RiUserLocationFill } from "react-icons/ri";
import { IoMdCash } from "react-icons/io";
const LookingForDriver = (props) => {
  return (
    <div>
      <FaCaretDown
        onClick={() => props.setVehicleFound(false)}
        className="absolute top-5 right-5 text-xl  cursor-pointer"
      />
      <h3 className="text-2xl font-bold mb-3">Looking For a Driver</h3>

      <div className="flex justify-between flex-col items-center ">
        <img className="h-28 ml-1" src={Car} alt="Car_img" />
        <div className="w-full mt-4">
          <div className="flex items-center gap-1 my-1 border-b-2 border-gray-300   p-3">
            <MdLocationPin className="text-xl " />
            <div>
              <h3 className="text-lg font-semibold">FDA-112</h3>
              <p className="text-gray-500">Nishatabad Faisalabad</p>
            </div>
          </div>
          <div className="flex items-center gap-1 my-1 border-b-2 border-gray-300   p-3">
            <RiUserLocationFill className="text-xl " />
            <div>
              <h3 className="text-lg font-semibold">FDA-112</h3>
              <p className="text-gray-500">Nishatabad Faisalabad</p>
            </div>
          </div>
          <div className="flex items-center gap-1 my-1   p-3">
            <IoMdCash className="text-xl" />
            <div>
              <h3 className="text-lg font-semibold">Rs.400</h3>
              <p className="text-gray-500">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
