import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate('/login');
  };
  const handleSignupNavigate = () => {
    navigate('/signup');
  };

    return (
      <nav className="bg-black  text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-semibold">RapidCap</div>
  
          {/* Buttons */}
          <div className="flex space-x-4">
            <button onClick={handleLoginNavigate} className="text-white px-4 py-2 hover:text-black hover:bg-gray-200">Log in</button>
            <button onClick={handleSignupNavigate} className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300">
              Sign up
            </button>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  