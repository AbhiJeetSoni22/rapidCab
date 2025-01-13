import Navbar from "./Navbar";

const Riding = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col-reverse lg:flex-row h-screen">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 p-6 bg-white flex flex-col items-center  justify-center">
          <div className="w-full p-4">
            <div>
              <div className="flex items-center justify-between mb-3 ">
                <img
                  className="h-12 md:h-28"
                  src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                  alt=""
                />
                <div className="text-right">
                  <h2 className="text-lg md:text-2xl font-medium">Abhijeet</h2>
                  <h3 className="text-xl font-semibold md:text-3xl ">
                    MP15CB933
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600">
                    Maruti Suzuki Alto
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-between items-center mb-3 flex-col ">
                <div className="w-full">
                 
                  <div className="flex items-center gap-5   p-3 border-t-gray-300 border-b-gray-300">
                    <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
                    <div>
                      <h3 className="text-lg md:text-2xl font-medium">
                        562/11-A
                      </h3>
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
              <button className='w-full mt-2  md:w-1/2 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1  bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345082766!2d144.9556516153866!3d-37.81627997975145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5771f4573b3d6b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1634634920346!5m2!1sen!2sau"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        
      </div>
    </>
  );
};

export default Riding;
