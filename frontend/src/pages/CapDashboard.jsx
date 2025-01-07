import axios from "axios";
import {  useNavigate } from "react-router-dom"


const CapDashboard = () => {
const navigate = useNavigate();
const token = localStorage.getItem('token');
const handleLogout =async ()=>{
    try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    if(response.status === 200){
        localStorage.removeItem('token');
        navigate('/captain-login');
    }
        
    } catch (error) {
        console.log('error during logout',error)
    }
}
  return (
    <div className="mt-4 ml-4 ">
        captain dashborad
    <button className="py-3 px-4 bg-red-400 hover:bg-red-500 text-white" onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default CapDashboard
