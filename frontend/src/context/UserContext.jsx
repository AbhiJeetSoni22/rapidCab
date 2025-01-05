import { createContext , useState} from "react"
export const UserDataContext = createContext();


// eslint-disable-next-line react/prop-types
const UserContext = ({children}) => {
    const [userData, setUserData] = useState({
        fullName:{
            firstName:'',
            lastName:''
        },
        email:''
    });

  return (
    <div>
        <UserDataContext.Provider value={[userData,setUserData]}>
          {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
