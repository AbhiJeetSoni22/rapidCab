import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const FinishRide = (props) => {

  return (
    <div className=" md:ml-8 p-6 relative h-screen w-full bg-white ">
      <h5
        className="fixed top-0 left-0 text-center w-full  bg-gray-800 md:hidden"
        onClick={() => {
          props.setFinishRidePanel(false);
         
        }}
      >
        <i className="text-4xl h-10 w-10 text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-2xl font-semibold md:text-3xl mb-3 mt-5 ">
      Fisnish this ride
      </h2>
      <div className="flex  items-center w-full p-4 justify-between border border-yellow-400 bg-yellow-200 rounded-lg ">
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
                kankariya Tanlab, Sagar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-t-2 border-b-2  p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg md:text-2xl font-medium">562/11-A</h3>
              <p className="text-sm md:text-lg  text-gray-600">
                kankariya Tanlab, Sagar
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
         <Link to="/captain-dashboard" className="w-2/3 ml-[15%] md:ml-[13%]  mt-1 flex justify-center   md:p-3 md:text-xl md:font-medium  bg-green-500 text-white font-semibold p-3 rounded-lg">
          Finish Ride
        </Link>
       </div>

       <p className='text-xs md:lg text-gray-700 mt-6'>Click on finish ride button if you have completed the ride</p>
      </div>
    </div>
  )
}
FinishRide.propTypes = {
  setFinishRidePanel: PropTypes.func
};
export default FinishRide
