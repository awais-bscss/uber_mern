import React, { useRef, useState } from "react";
import Uberlogowhite from "../assets/images/Uberlogowhite.png";
import MapImg from "../assets/images/Ubermap.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaCaretDown } from "react-icons/fa";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [DropOff, setDropOff] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: "40px",
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

  return (
    <div className="relative h-screen ">
      <img
        className="w-20 h-auto absolute left-6 top-6"
        src={Uberlogowhite}
        alt="Logo_Img"
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover object-center"
          src={MapImg}
          alt="mapimg"
        />
      </div>
      <div className=" w-full flex flex-col justify-end absolute h-screen top-0 ">
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
        <div ref={panelRef} className="h-0 overflow-hidden bg-white">
          <LocationSearchPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
