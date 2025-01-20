import { useGSAP } from "@gsap/react"
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from "../components/RidePopUp"
import Navbar from "./Navbar"
import gsap from "gsap"
import { useRef, useState } from "react"
import ConfirmRidePopUp from "../components/ConfirmRidePopUp"
import { Link } from "react-router-dom"
import { CaptainDataContext } from "../context/CaptainContext"
import { useEffect,useContext } from "react"
import { SocketContext } from "../context/SocketContext"
import axios from "axios"
import LiveTracking from "../components/LiveTracking"
const CapDashboard = () => {
 const [ridePopUpPanel, setridePopUpPanel] = useState(false)

 const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
 const [ride,setRide] = useState(null)

 const ridePopUpPanelRef = useRef(null)
 const confirmRidePopUpPanelRef = useRef(null)

 const { captain } = useContext(CaptainDataContext);
 const { socket } = useContext(SocketContext);
 async function confirmRide() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );
    console.log(response.status)
    
    if (response.status === 200) {
      setridePopUpPanel(false);
      setConfirmRidePopUpPanel(true);
    }
  } catch (error) {
    console.error('Error confirming ride:', error);
  }
}
 useEffect(() => {
  socket.emit('join', {
    userId: captain._id,
    userType: 'captain',
  });

  socket.on('new-ride', (data)=>{
    console.log(data)
    setRide(data)
    setridePopUpPanel(true)
    // setridePopUpPanel(true)
  })
  // Function to update location
  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
     

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  // Call the location update function at intervals
  const locationInterval = setInterval(updateLocation, 30000);
  updateLocation();

  // Cleanup on component unmount
  return () => clearInterval(locationInterval);
}, [socket, captain._id]); 


 useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
       transform:'translateY(0)'
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform:'translateY(130%)'
      });
    }
  }, [ridePopUpPanel]);
 useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
       transform:'translateY(0)'
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform:'translateY(130%)'
      });
    }
  }, [confirmRidePopUpPanel]);



  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      {/* Conditionally render the RapidCap sign and logout icon */}
      {!confirmRidePopUpPanel && (
        <div className="w-screen fixed px-2 flex md:hidden justify-between items-center top-4 z-30">
          <h1 className="text-3xl font-bold z-30">RapidCap</h1>
          <Link to="/captain-login" className="z-30">
            <i className="text-3xl font-bold w-15 h-15 bg-orange-400 rounded-full p-3 ri-logout-box-r-line"></i>
          </Link>
        </div>
      )}
      <div className="flex flex-col-reverse lg:flex-row h-screen relative">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 z-20 p-6 bg-white flex flex-col items-center justify-center">
          <CaptainDetails />
  
          <div
            ref={ridePopUpPanelRef}
            className="fixed w-full translate-y-full lg:w-1/3 bottom-0 bg-white px-3 py-6 md:mb-24"
          >
            <RidePopUp
              confirmRide={confirmRide}
              ride={ride}
              setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
              setridePopUpPanel={setridePopUpPanel}
            />
          </div>
          <div
            ref={confirmRidePopUpPanelRef}
            className="fixed w-full z-30 md:h-[85%] h-screen translate-y-full lg:w-1/3 bottom-0 bg-white px-3 sm:py-8"
          >
            <ConfirmRidePopUp
              ride={ride}
              setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
              setridePopUpPanel={setridePopUpPanel}
            />
          </div>
        </div>
  
        {/* Right Section */}
        <div className="flex-1 z-0 md:mx-10 md:my-12 bg-gray-100 relative">
          <LiveTracking key="dashboardCaptain" />
        </div>
      </div>
    </>
  );
  
  
}

export default CapDashboard
