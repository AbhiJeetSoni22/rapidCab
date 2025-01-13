import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useRef, useState } from "react";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        height: "0",
        transform: "translateY(1150%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-screen fixed px-2 flex md:hidden justify-between items-center top-4">
        <h1 className="text-3xl font-bold z-20">RapidCap</h1>

        <Link to="/captain-dashboard" className="z-20">
          <i className="text-3xl font-bold w-15 h-15 bg-orange-400 rounded-full p-3 ri-home-3-line"></i>
        </Link>
      </div>

      <div className="flex flex-col-reverse relative lg:flex-row h-screen overflow-hidden">
        {/* Left Section */}
        <div
          className="h-[17%] flex items-center relative justify-between md:h-[20%] md:ml-7 md:w-1/3 bg-yellow-300 p-4 md:mt-[10%]"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <h5 className="absolute w-[85%] top-0 left-[45%] md:hidden">
            <i className="text-4xl text-gray-600 ri-arrow-up-wide-line"></i>
          </h5>
          <h1 className="text-xl font-semibold">4 km away</h1>
          <button className="mt-1 px-10 py-4 text-lg md:w-1/2 md:p-3 md:text-2xl md:font-medium bg-green-500 text-white font-semibold rounded-lg">
            Complete Ride
          </button>
        </div>
          <div
            ref={finishRidePanelRef}
            className="fixed w-full lg:w-1/3 top-0 left-0 md:top-24 md:left-1 m-0 p-0 bg-white py-10 md:mb-24 translate-y-full"
          >
            <FinishRide setFinishRidePanel={setFinishRidePanel} />
          </div>

        {/* Right Section */}
        <div className="flex-1 h-[83%] md:w-2/3 md:mx-10 md:my-12 bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345082766!2d144.9556516153866!3d-37.81627997975145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5771f4573b3d6b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1634634920346!5m2!1sen!2sau"
            className="w-full h-full block"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default CaptainRiding;
