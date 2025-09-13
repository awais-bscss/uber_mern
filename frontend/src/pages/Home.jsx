import React, { useRef, useState } from "react";
import Uberlogowhite from "../assets/images/Uberlogowhite.png";
import MapImg from "../assets/images/Ubermap.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaCaretDown } from "react-icons/fa";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmVehicle from "../components/ConfirmVehicle";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [DropOff, setDropOff] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [confirmVehicle, setConfirmVehicle] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const VehiclePanelRef = useRef(null);
  const ConfirmVehicleRef = useRef(null);
  const VehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

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

  useGSAP(
    function () {
      if (confirmVehicle) {
        gsap.to(ConfirmVehicleRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmVehicleRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmVehicle]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(VehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(VehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
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
        <VehiclePanel
          setConfirmVehicle={setConfirmVehicle}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={ConfirmVehicleRef}
        className="fixed  z-10 bottom-0 p-5 translate-y-full bg-white w-full"
      >
        <ConfirmVehicle
          setConfirmVehicle={setConfirmVehicle}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={VehicleFoundRef}
        className="fixed  z-10 bottom-0 p-5 translate-y-full bg-white w-full"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          setConfirmVehicle={setConfirmVehicle}
        />
      </div>
      <div
        ref={WaitingForDriverRef}
        className="fixed  z-10 bottom-0 p-5  bg-white w-full"
      >
        <WaitForDriver
          setWaitingForDriver={setWaitingForDriver}
          setConfirmVehicle={setConfirmVehicle}
        />
      </div>
    </div>
  );
};

export default Home;
