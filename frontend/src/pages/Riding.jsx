import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking'
const Riding = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();
  const ride = location.state?.ride;
  socket.on('ride-ended',()=>{
    navigate('/dashboard')
  })
  return (
    <>
      <Navbar />
      <div className="flex flex-col-reverse lg:flex-row h-screen">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 p-6 bg-white flex flex-col items-center justify-center">
          <div className="w-full p-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <img
                  className="h-12 md:h-28"
                  src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                  alt=""
                />
                <div className="text-right">
                  <h2 className="text-lg md:text-2xl font-medium">
                    {ride?.captain?.fullName?.firstName || 'Captain'}
                  </h2>
                  <h3 className="text-xl font-semibold md:text-3xl">
                    {ride?.captain?.vehicle?.plate || 'Vehicle Number'}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600">
                    {ride?.captain?.vehicle?.model || 'Maruti Suzuki Alto'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-between items-center mb-3 flex-col">
                <div className="w-full">
                  <div className="flex items-center gap-5 p-3 border-t-gray-300 border-b-gray-300">
                    <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
                    <div>
                      <h3 className="text-lg md:text-xl font-medium">
                      Destination 
                      <p className='text-sm text-gray-700'> {ride?.destination || 'Destination'}</p>
                      </h3>
                      
                    </div>
                  </div>
                  <div className="flex items-center gap-5 border-t-2 border-b-2 p-3 border-t-gray-300 border-b-gray-300">
                    <i className="text-xl md:text-3xl ri-wallet-fill"></i>
                    <div>
                      <h3 className="text-lg md:text-2xl font-medium">Cash</h3>
                      <p className="text-sm md:text-lg text-gray-600">
                        ₹{ride?.fare || '0'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button className='w-full mt-2 md:w-1/2 bg-green-600 text-white font-semibold p-2 rounded-lg'>
                Make a Payment
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Map */}
        <div className="flex-1 bg-gray-100">
       <LiveTracking/>
        </div>
      </div>
    </>
  );
};

export default Riding;
