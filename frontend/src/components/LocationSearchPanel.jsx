import React from "react";
import { MdLocationPin } from "react-icons/md";

const LocationSearchPanel = (props) => {
  const locations = [
    "Nishatabad Faisalabad",
    "Mansurabad Faisalabad",
    "Khanewal Faisalabad",
    "Lahore Faisalabad",
  ];

  return (
    <div>
      {locations.map(function (elem) {
        return (
          <div
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            key={elem}
            className="flex items-center gap-3 my-3 border-2 border-gray-100 rounded-2xl active:border-gray-900 p-3"
          >
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#eee] rounded-full">
              <MdLocationPin className="text-xl " />
            </div>

            <h2 className="text-lg font-semibold">{elem}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
