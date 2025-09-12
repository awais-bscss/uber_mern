import React, { useRef, useState } from "react";
import Uberlogowhite from "../assets/images/Uberlogowhite.png";
import MapImg from "../assets/images/Ubermap.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaCaretDown } from "react-icons/fa";
import LocationSearchPanel from "../components/LocationSearchPanel";
import Car from "../assets/images/car.png";
import Auto from "../assets/images/auto.png";
import Bike from "../assets/images/bike.png";
import { FaUser } from "react-icons/fa6";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [DropOff, setDropOff] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const VehiclePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: "20px",
        });

        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: "0px",
        });

        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(VehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(VehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="w-20 h-auto absolute left-6 top-6"
        src={Uberlogowhite}
        alt="Logo_Img"
      />

      <div
        onClick={() => {
          setPanelOpen(false);
          setVehiclePanel(false);
        }}
        className="h-screen w-screen"
      >
        <img
          className="h-full w-full object-cover object-center"
          src={MapImg}
          alt="mapimg"
        />
      </div>
      <div className=" w-full flex flex-col  justify-end absolute h-screen top-0 ">
        <div className="h-[30%] p-5 bg-white relative">
          <FaCaretDown
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute top-5 right-5 text-xl opacity-0 cursor-pointer"
          />
          <h4 className="text-3xl font-semibold mb-3">Find a trip</h4>

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line h-16 w-1 absolute top-[45%] left-9 rounded-full  bg-gray-800"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-10 py-2 text-lg  rounded-lg w-full mb-4"
              type="text"
              placeholder="Add a Pick-up Location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={DropOff}
              onChange={(e) => setDropOff(e.target.value)}
              className="bg-[#eee] px-10 py-2 text-lg  rounded-lg w-full"
              type="text"
              placeholder="Add a Drop-off Location"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 overflow-y-auto bg-white">
          <LocationSearchPanel
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      <div
        ref={VehiclePanelRef}
        className="fixed  z-10 bottom-0 p-5 translate-y-full bg-white w-full"
      >
        <h3 className="text-2xl font-semibold mb-3">Choose a vehicle</h3>
        <div className=" w-full flex justify-between border-2 rounded-lg active:border-green-700  border-black mb-2 bg-white items-center">
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
        <div className=" w-full flex justify-between border-2 rounded-lg active:border-green-700 border-black mb-2 bg-white items-center">
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
        <div className=" w-full flex justify-between border-2 rounded-lg active:border-green-700  border-black mb-2 bg-white items-center">
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
    </div>
  );
};

export default Home;
