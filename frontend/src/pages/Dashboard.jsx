import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout =async ()=>{
    try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    if(response.status === 200){
        localStorage.removeItem('token');
        navigate('/login');
    }
        
    } catch (error) {
        console.log('error during logout',error)
    }
}
  return (
    <div className="mt-4 ml-4 ">
    user dashborad <br/>
<button className="py-3 px-4 bg-red-400 hover:bg-red-500 text-white" onClick={handleLogout}>Logout</button>

</div>
  )
}

export default Dashboard
