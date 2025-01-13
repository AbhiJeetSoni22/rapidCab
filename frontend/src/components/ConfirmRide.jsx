
import PropTypes from 'prop-types';

const ConfirmRide = (props) => {
  return (
    <div>
     <h2 className="text-2xl font-semibold md:text-3xl mb-1 ">Confirm You Ride</h2>
            <div
              className={`absolute cursor-pointer  h-8 w-9 md:bg-[#eee] rounded-full md:top-8 md:left-10   top-5 right-3 ${
                props.confirmRidePanel ? "block" : "hidden"
              } `}
              onClick={() => {
                props.setVehiclePanel(true);
                props.setConfirmRidePanel(false);
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
              {
                props.vehicleType === 'car' &&
              <img
                className="h-24 md:h-28 mt-1"
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt=""
              />
              }
              {
                props.vehicleType === 'bike' &&
                <img
                className="h-24 md:h-28 mt-5"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
                alt=""
              />
                }
                {
                  props.vehicleType === 'auto' &&
                  <img
                  className="h-24 md:h-28 mt-3"
                  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                  alt=""
                />
                }
              <div className='w-full'>
                     <div className='flex items-center gap-5  p-3 border-t-gray-300 border-b-gray-300'>
                        <i className="text-xl md:text-3xl ri-map-pin-2-fill"></i>
                       <div>
                       <h3 className='text-lg md:text-2xl font-medium'>Pickup Location</h3>
                       <p className='text-sm md:text-lg  text-gray-600'>{props.pickupLocation}</p>
                       </div>
                     </div>
                     <div className='flex items-center gap-5 border-t-2 border-b-2  p-3 border-t-gray-300 border-b-gray-300'>
                     <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
                       <div>
                       <h3 className='text-lg md:text-2xl font-medium'>Destination</h3>
                       <p className='text-sm md:text-lg  text-gray-600'>{props.dropoffLocation}</p>
                       </div>
                     </div>
                     <div className='flex items-center gap-5   p-3 border-t-gray-300 border-b-gray-300'>
                     <i className="text-xl md:text-3xl ri-wallet-fill"></i>
                       <div>
                       <h3 className='text-lg md:text-2xl font-medium'>Cash</h3>
                       <p className='text-sm  md:text-lg text-gray-600'>₹{props.fare[props.vehicleType]}</p>
                       </div>
                     </div>
                     
              </div>
                <button onClick={()=>{
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }} className='w-full mt-2  md:w-1/2 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
              
            </div>
    </div>
  )
}
ConfirmRide.propTypes = {
   fare: PropTypes.object,
    pickupLocation: PropTypes.string,
    dropoffLocation: PropTypes.string,
    vehicleType:PropTypes.string,
  vehiclePanel: PropTypes.bool,
  confirmRidePanel: PropTypes.bool,
  panelOpen: PropTypes.bool,
  createRide:PropTypes.func,
  setPanelOpen: PropTypes.func,
  setVehiclePanel: PropTypes.func,
  setConfirmRidePanel: PropTypes.func,
  setVehicleFound: PropTypes.func
};

export default ConfirmRide
