import { Link } from "react-router-dom";
import { useState } from "react";
const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const handleSubmit = (e)=>{
     e.preventDefault();
    setUserData({
      email: email,
      password: password
    })
    console.log(userData)
     setEmail('')
     setPassword('');
  }
  return (
    <div className="flex flex-col justify-center items-center p-7">
      <div className="mb-5">
        <form action="" className="mt-20" onSubmit={(e)=>{
          handleSubmit(e)
        }}>
          <h1 className="text-3xl font-bold text-center mb-6">User Login</h1>
          <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
          <input
            className="bg-[#eeeeee] px-4 border w-full rounded text-lg placeholder:text-base py-2 mb-5"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="gmail@example.com"
            required
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] px-4 border w-full rounded text-lg placeholder:text-base py-2 mb-5"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="password"
            required
          />
          <button className="w-full bg-[#111] text-gray-200 font-semibold my-2 rounded px-4 py-3 hover:bg-[#292929]">
            Login
          </button>
        </form>
        <p className="text-center">
          Don&apos;t have an Account?
          <Link to="/signup" className="text-blue-600 text-base pl-2">
            Sign Up
          </Link>
        </p>
      </div>
      <div className="relative">
        <Link to="/captain-login" className="w-full bg-[#10b461] flex justify-center items-center text-gray-200 font-semibold my-2 rounded px-4 py-3 hover:bg-[#17cd72]">
          Sign in as a Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
