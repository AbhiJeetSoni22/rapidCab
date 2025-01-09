import homeImg from '../assets/Airport-rides.webp';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const Home = () => {
  const navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate('/login');
  };
  const handleSignupNavigate = () => {
    navigate('/signup');
  };
  return (
    <>
    <Navbar/>
    
    <div className="h-screen w-full">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-50 h-screen relative">
        {/* Left Section */}
        <div className="relative z-10 md:mx-20 w-full bg-gray-50 bg-opacity-50 p-8 md:p-0 rounded-lg md:rounded-none md:w-1/2 text-left md:text-left flex flex-col justify-center">
          <h1 className="md:text-2xl text-xl mb-4">
            Request a ride for now or later
          </h1>
          <h1 className="md:text-4xl text-2xl font-semibold mb-4">
            Get started with RapidCap
          </h1>
          <div className="flex space-x-4 justify-left md:justify-start">
            <button
              type="button"
              className="bg-black text-white text-xl px-6 py-3 rounded-md"
              onClick={handleLoginNavigate}
            >
              Login
            </button>
            <button
              type="button"
              className="bg-gray-200 px-6 text-xl py-3 rounded-md"
              onClick={handleSignupNavigate}
            >
              Signup
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={homeImg}
            alt="Ride illustration"
            className="rounded-lg shadow-lg bg-cover bg-center"
          />
        </div>
      </div>

      {/* Background Image for Small Screens */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: `url(${homeImg})`,
        }}
      ></div>
    </div>
    </>
  );
};

export default Home;
