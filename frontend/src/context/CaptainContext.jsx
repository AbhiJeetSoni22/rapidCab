import { createContext , useState} from "react"
export const CaptainDataContext = createContext();


// eslint-disable-next-line react/prop-types
const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState({
        fullName:{
            firstName:'',
            lastName:''
        },
        email:'',
        vehicle:{
            color:'',
            plate:'',
            capacity:'',
            vehicleType:'',
        }

    });

  return (
    <div>
        <CaptainDataContext.Provider value={{captain, setCaptain}}>
          {children}
        </CaptainDataContext.Provider>
    </div>
  )
}

export default CaptainContext
