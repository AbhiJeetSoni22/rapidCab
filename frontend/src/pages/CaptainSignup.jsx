import { useState } from "react"
import { Link } from "react-router-dom"

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [capData, setCapData] = useState({})
  const [firstName,setFristName]=useState('')
  const [lastName,setLastName] = useState('')


  const handleSubmit = (e)=>{
     e.preventDefault();
    setCapData({
      fullName:{
        firstName:firstName,
        lastName:lastName,
      },
      email: email,
      password: password
    })
    console.log(capData)
     setEmail('')
     setPassword('');
     setFristName('')
     setLastName('')
  }

  return (
    <div className="flex flex-col justify-between items-center px-5 py-5">
      <div className="mb-5">
        <form action="" className="mt-20" onSubmit={(e)=>{
          handleSubmit(e)
        }}>
          <h1 className="text-3xl font-bold text-center mb-6">Create Captain Account</h1>
          <h3 className="text-lg font-medium mb-2">What&apos;s your name</h3>
          <div className="flex gap-4 mb-5">
          <input
            className="bg-[#eeeeee] px-4 border w-1/2 rounded text-base placeholder:text-base py-2 "
            type="text"
            value={firstName}
            onChange={(e)=>{setFristName(e.target.value)}}
            placeholder="First Name"
            required
          /> 
          <input
            className="bg-[#eeeeee] px-4 border w-1/2  rounded text-base placeholder:text-base py-2 "
            type="text"
            value={lastName}
            onChange={(e)=>{setLastName(e.target.value)}}
            placeholder="Last Name"
          /> 
          </div>
         
         
          <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
          <input
            className="bg-[#eeeeee] px-4 border w-full rounded text-base placeholder:text-sm py-2 mb-5"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="gmail@example.com"
            required
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] px-4 border w-full rounded text-base placeholder:text-sm py-2 mb-5"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="password"
            required
          />
          <button className="w-full bg-[#111] text-gray-200 font-semibold my-2 rounded px-4 py-3 hover:bg-[#292929]">
            Create Account
          </button>
        </form>
        <p className="text-center">
          
          Already have an Account?
          <Link to="/captain-login" className="text-blue-600 text-base pl-2">
            Login here
          </Link>
        </p>
      </div>
      <div className="relative">
       <p className="text-[10px] leading-tight">This site is protected by reCAPTCHA and the Google <u>Privacy Policy</u> and <u>Terms</u>  of Service apply.
       </p>
      </div>
    </div>
  );
}

export default CaptainSignup
