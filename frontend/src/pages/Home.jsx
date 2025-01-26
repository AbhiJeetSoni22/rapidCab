import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      localStorage.removeItem('token')
    }
  }, [token])

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="md:text-5xl text-4xl  font-bold mb-4 animate-[slideDown_1s_ease-out] opacity-0 [animation-fill-mode:forwards]">
            Your Ride, Your Way
          </h1>
          <p className="text-xl mb-8 animate-[slideUp_1s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
            Book rides instantly with RapidCab - The smart way to travel
          </p>
          <Link to="/login" className="bg-yellow-400   border-yellow-400 border-4 hover:border-yellow-500 text-black px-8 py-3 rounded-lg font-bold  hover:bg-gray-900 hover:text-white transition-all duration-300">
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RapidCab?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} 
                className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl
                animate-[fadeIn_1s_ease-out_${index * 0.2}s] [animation-fill-mode:forwards]`}>
                <h3 className="text-xl font-bold mb-4">Real-Time Tracking</h3>
                <p>Track your ride in real-time and share your journey with loved ones</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="text-center group">
                <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 
                  animate-pulse group-hover:animate-bounce transition-all duration-300">
                  {num}
                </div>
                <h3 className="font-bold mb-2">Book Your Ride</h3>
                <p>Enter pickup & drop location</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 animate-[fadeIn_1s_ease-out]">Ready to Get Started?</h2>
          <div className="md:space-x-4 space-x-2">
            <Link to="/login" 
              className="bg-yellow-400 text-black mb-3 px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 
              transform hover:scale-110 transition-all duration-300 inline-block animate-pulse">
              Book a Ride
            </Link>
            <Link to="/captain-login" 
              className="bg-transparent border-2 border-yellow-400 text-yellow-400  px-6 md:px-8 py-3 rounded-lg font-bold 
              hover:bg-yellow-400 hover:text-black transform hover:scale-110 transition-all duration-300 inline-block">
              Become a Driver
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <p className="text-center">&copy; 2025 RapidCab. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);

export default Home;