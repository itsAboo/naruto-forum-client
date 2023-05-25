import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../../services/authorize";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(getUser());
    useEffect(()=>{
        if(!user){
            const userData = getUser();
            setUser(userData);
        }
    },[])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}