import React from "react";
import Car from "../assets/images/car.png";
import { FaCaretDown } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { RiUserLocationFill } from "react-icons/ri";
import { IoMdCash } from "react-icons/io";
const WaitForDriver = (props) => {
  return (
    <div>
      <FaCaretDown
        onClick={() => props.setWaitingForDriver(false)}
        className="absolute top-2 right-7 text-xl  cursor-pointer"
      />

      <div className="flex justify-between items-center mt-4">
        <img className="h-16" src={Car} alt="" />
        <div>
          <h2 className="text-xl font-semibold">Awais</h2>
          <h4 className="text-lg font-bold -mt-1 -mb-1">MNA-1122</h4>
          <p className="text-gray-500">Suzuki</p>
        </div>
      </div>

      <div className="flex justify-between flex-col items-center ">
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

export default WaitForDriver;
