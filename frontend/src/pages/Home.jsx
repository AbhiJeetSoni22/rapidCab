import { Link } from 'react-router-dom';
import homeImg from '../assets/Airport-rides.webp';
import Navbar from './Navbar';
import { useEffect } from 'react';
const Home = () => {
  
useEffect(()=>{
  const token = localStorage.getItem('token');
  if(token){
    localStorage.removeItem('token')
  }

})
  return (

    <>
   <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-screen fixed z-20 px-2 flex md:hidden justify-between items-center ">
        <h1 className="text-4xl absolute top-4 right-3 font-bold z-20">RapidCap</h1>
      </div>
    
    <div className="h-full md:ml-10 w-full flex justify-center items-center overflow-hidden">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full items-center justify-center p-8 h-full  relative">
        {/* Left Section */}
        <div className="fixed md:relative bottom-0 bg-white z-10 w-full  p-8 md:p-0   md:w-1/2 text-left md:text-left flex flex-col justify-center">
          <h1 className="md:text-2xl text-xl mb-4">
            Request a ride for now or later
          </h1>
          <h1 className="md:text-4xl text-3xl font-semibold mb-4">
            Get started with RapidCap
          </h1>
          <div className="flex items-center  space-x-4 justify-left md:justify-start">
            <Link
              to="/login"
              type="button"
              className="bg-black w-full text-center  mt-2 md:w-4/5 text-white text-xl px-12 py-3 rounded-md"
            >
              Continue
            </Link>
           
          </div>
        </div>

        {/* Right Section */}
        <div className="md:ml-10 hidden md:block w-[70%]  relative  "> 
          <img
            src={homeImg}
            alt="Ride illustration"
            className="rounded-lg w-4/5 shadow-lg bg-cover bg-center"
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
