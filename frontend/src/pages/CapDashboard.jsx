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

const CapDashboard = () => {
 const [ridePopUpPanel, setridePopUpPanel] = useState(true)

 const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

 const ridePopUpPanelRef = useRef(null)
 const confirmRidePopUpPanelRef = useRef(null)

 const { captain } = useContext(CaptainDataContext);
 const { socket } = useContext(SocketContext);

 useEffect(() => {
    socket.emit('join',{
      userId: captain._id,
      userType: 'captain'
    })
    const updateLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>

          socket.emit('update-location-captain',{
         
            userId: captain._id,
            location:{
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        
        )
      }
    }
    const locationInterval = setInterval(updateLocation, 1000)
    updateLocation()
    // return ()=> clearInterval(locationInterval)
 },[captain])

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
    <div className="hidden md:block ">
    <Navbar/>
    </div>
    <div className="w-screen fixed px-2 flex md:hidden  justify-between items-center top-4 ">
        <h1 className="text-3xl font-bold  z-20">RapidCap</h1>

        <Link to="/captain-login" className="z-20">
          <i className="text-3xl font-bold w-15 h-15 bg-orange-400 rounded-full p-3 ri-logout-box-r-line"></i>
        </Link>
      </div>
    <div className="flex flex-col-reverse lg:flex-row h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/3 p-6 bg-white flex flex-col items-center  justify-center">
     
      <CaptainDetails />
   
       <div ref={ridePopUpPanelRef} className="fixed w-full translate-y-full lg:w-1/3 bottom-0  bg-white px-3 py-10 md:mb-24 ">
         <RidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setridePopUpPanel={setridePopUpPanel}/>
       </div>
       <div ref={confirmRidePopUpPanelRef} className="fixed w-full z-30 md:h-[85%] h-screen translate-y-full lg:w-1/3 bottom-0  bg-white px-3 py-10  ">
         <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setridePopUpPanel={setridePopUpPanel}/>
       </div>
      </div>


      {/* Right Section */}
      <div className="flex-1 md:mx-10 md:my-12 bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345082766!2d144.9556516153866!3d-37.81627997975145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5771f4573b3d6b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1634634920346!5m2!1sen!2sau"
          className="w-full h-full"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      
    </div>
  </>
  )
}

export default CapDashboard
