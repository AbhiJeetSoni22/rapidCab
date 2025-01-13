import { useContext } from "react"
import { CaptainDataContext} from "../context/CaptainContext.jsx"

const CaptainDetails = () => {

 const { captain }= useContext(CaptainDataContext)
 const capname = captain.fullName.firstName + " " + captain.fullName.lastName
 if (!captain) {
    return <div>Loading captain details...</div>;
  }
 
  return (
    <div className="w-full md:mt-[-25%]">
    <div className="flex p-6 mb-6 w-full items-center gap-10 justify-between">
            <div className="flex -ml-6 items-center gap-2  justify-start">
                <img className="h-20 w-20 md:h-26 md:w-26 rounded-full object-cover" src="https://t3.ftcdn.net/jpg/08/53/07/36/360_F_853073692_dwxqJ0LYe3SZ7xkEaT8XKb5zfS2BvxUv.jpg" alt="" />
                <h4 className="text-xl md:text-2xl font-medium text-gray-700 ">{capname}</h4>
            </div>
            <div>
                <h4 className="text-xl md:text-2xl font-semibold">$295.20</h4>
                <p className="text-sm md:text-lg text-gray-600">Earned</p>
            </div>
        </div>
        <div className="flex p-6 md:p-9 bg-yellow-300 rounded-xl justify-center gap-4 items-start">
            <div className="text-center bg-gray-100 p-1 rounded-lg">
                <i className="text-3xl mb-2 font-thin text-gray-600 ri-timer-2-line"></i>
                <h5 className="text-lg font-medium">8.2</h5>
                <p className="text-sm text-gray-600">Hours Online</p>
            </div>
            <div  className="text-center  bg-gray-100 p-1 rounded-lg ">
                <i className="text-3xl mb-2 font-thin text-gray-600 ri-speed-up-line"></i>
                <h5 className="text-lg font-medium">44 </h5>
                <p className="text-sm text-gray-600">Distance (km)</p>
            </div>
            <div  className="text-center  bg-gray-100 p-1 rounded-lg ">
                <i className="text-3xl mb-2 font-thin text-gray-600 ri-booklet-line"></i>
                <h5 className="text-lg font-medium">8.2</h5>
                <p className="text-sm text-gray-600">Hours Online</p>
            </div>
        </div>
        </div> 
  )
}

export default CaptainDetails
