import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [OTP,setOTP]= useState("");
  const SubmitHandler=(e)=>{
    e.preventDefault();
  }
  return (
    <div className=" md:ml-8 relative h-screen ">
      <h5
        className="absolute left-[50%]  top-[-30px] z-20 md:hidden"
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="text-4xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-2xl font-semibold md:text-3xl mb-3 ">
      Confirm this ride to Start
      </h2>
      <div className="flex  items-center justify-between bg-yellow-300 rounded-lg ">
        <div className="flex my-2  items-center gap-4">
          <img
            className="h-12 md:h-16 ml-2 md:w-16 w-12 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt=""
          />
          <h2 className="text-lg md:text-2xl font-medium">Laira Patel</h2>
        </div>
        <h4 className="text-gray-600 text-lg font-medium md:text-xl mr-2">
          2.2 Km
        </h4>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col ">
        <div className="w-full">
          <div className="flex items-center gap-5  p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg md:text-2xl font-medium">562/11-A</h3>
              <p className="text-sm md:text-lg  text-gray-600">
               {props.pickupLocation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-t-2 border-b-2  p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg md:text-2xl font-medium">562/11-A</h3>
              <p className="text-sm md:text-lg  text-gray-600">
                {props.dropoffLocation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5   p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-wallet-fill"></i>
            <div>
              <h3 className="text-lg md:text-2xl font-medium">Cash</h3>
              <p className="text-sm  md:text-lg text-gray-600">₹190</p>
            </div>
          </div>
        </div>

       <div className="mt-6 w-full items-center">
       <form onSubmit={(e)=>{
           SubmitHandler(e)
       }}>
        <input type="text"className="w-full md:w-full mb-4 text-lg font-mono  px-6 py-4 border bg-[#e7e7e7] rounded-lg focus:ring focus:ring-gray-700 focus:outline-none "
        value={OTP}
        required
        onChange={(e)=>{ setOTP(e.target.value);}}
         placeholder="Enter OTP" />
         <Link to="/captain-riding" className="w-2/3 ml-[15%] md:ml-[13%]  mt-1 flex justify-center   md:p-3 md:text-xl md:font-medium  bg-green-500 text-white font-semibold p-3 rounded-lg">
          Confirm
        </Link>
        <button
          className="w-2/3 ml-[15%] mt-1 md:ml-[13%] mb-2  md:p-3  md:text-xl md:font-medium  bg-red-600 text-white font-semibold p-3 rounded-lg"
          onClick={() => {
            props.setConfirmRidePopUpPanel(false);
            props.setridePopUpPanel(false);
          }}
        >
          Cancle
        </button>
       </form>
        
       </div>
      </div>
    </div>
  );
};
ConfirmRidePopUp.propTypes = {
  pickupLocation: PropTypes.string,
  dropoffLocation: PropTypes.string,
  setConfirmRidePopUpPanel: PropTypes.func.isRequired,
  setridePopUpPanel: PropTypes.func.isRequired,
};

export default ConfirmRidePopUp;
