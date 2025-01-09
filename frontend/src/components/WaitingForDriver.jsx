import PropTypes from 'prop-types';

const WaitingForDriver = (props) => {
  return (
    <div>
        <h1 className='text-2xl md:text-3xl font-semibold'>Waiting for Driver</h1>
      <div>
         <div className='flex items-center justify-between mb-3 '>
        <img
            className="h-12 md:h-28"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
         <div className='text-right'>
            <h2 className='text-lg md:text-2xl font-medium'>abhijeet</h2>
            <h3 className='text-xl font-semibold md:text-3xl '>MP15CB933</h3>
            <p className='text-sm md:text-lg text-gray-600'>Maruti Suzuki Alto</p>
         </div>
        </div>
        <div
          className={`absolute cursor-pointer  h-8 w-9 md:bg-[#eee] rounded-full md:top-8 md:left-10   top-5 right-3 ${
            props.waitForDriver ? "block" : "hidden"
          } `}
          onClick={() => {
            props.setVehicleFound(true);
          }}
        >
          <svg
            className="relative md:top-1 top-1 md:left-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="gray"
          >
            <path d="M8.3685 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.3685 12Z"></path>
          </svg>
        </div>
        <div className="flex gap-2 justify-between items-center flex-col ">
       
          <div className="w-full">
            <div className="flex items-center gap-5  border-t-2 border-b-2 p-3 border-t-gray-300 border-b-gray-300">
              <i className="text-xl md:text-3xl ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg md:text-2xl font-medium">562/11-A</h3>
                <p className="text-sm md:text-lg  text-gray-600">
                  kankariya Tanlab, Sagar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5   p-3 border-t-gray-300 border-b-gray-300">
              <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg md:text-2xl font-medium">562/11-A</h3>
                <p className="text-sm md:text-lg  text-gray-600">
                  kankariya Tanlab, Sagar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5  border-t-2 border-b-2 p-3 border-t-gray-300 border-b-gray-300">
              <i className="text-xl md:text-3xl ri-wallet-fill"></i>
              <div>
                <h3 className="text-lg md:text-2xl font-medium">Cash</h3>
                <p className="text-sm  md:text-lg text-gray-600">₹190</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WaitingForDriver.propTypes = {
  vehicleFound: PropTypes.bool.isRequired,
  waitForDriver: PropTypes.bool,
  setVehicleFound: PropTypes.func.isRequired,
  setConfirmRidePanel: PropTypes.func.isRequired
};

export default WaitingForDriver;
