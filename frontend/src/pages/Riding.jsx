import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';
import Navbar from './Navbar';

const Riding = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();
  const ride = location.state?.ride;

  useEffect(() => {
    if (!socket) return;

    const handleRideEnded = () => {
      navigate('/dashboard');
    };

    socket.on('ride-ended', handleRideEnded);

    return () => {
      socket.off('ride-ended', handleRideEnded);
    };
  }, [socket, navigate]);

  if (!socket) {
    return <div>Connecting...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col-reverse lg:flex-row h-screen">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 p-6 bg-white flex flex-col items-center justify-center">
          <div className="w-full p-4">
            <div>
              <div className="flex items-center justify-between mb-3">
              {
              ride?.vehicleType === 'car' &&
              <img
                className="h-22 md:h-25 mt-1"
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt=""
              />
              }
              {
              ride?.vehicleType === 'bike' &&
                <img
                className="h-20 md:h-25 mt-5"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
                alt=""
              />
                }
                {
                ride?.vehicleType === 'auto' &&
                  <img
                  className="h-20 md:h-25 mt-3"
                  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                  alt=""
                />
                }
                <div className="text-right">
                  <h2 className="text-lg md:text-2xl font-medium">
                    {ride?.captain?.fullName?.firstName || 'Captain'}
                  </h2>
                  <h3 className="text-xl font-semibold md:text-3xl">
                    {ride?.captain?.vehicle?.plate || 'Vehicle Number'}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600">
                    {ride?.vehicleType || 'Maruti Suzi'}
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
       <LiveTracking ride={ride}/>
        </div>
      </div>
    </>
  );
};

export default Riding;
