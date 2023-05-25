import { useContext, useEffect } from "react"
import { UserContext } from "../src/contexts/UserContext"
import { Navigate } from "react-router-dom";

export default function HaveUser({children}){
    const {user} = useContext(UserContext);
    if(user){
        return <Navigate to={"/"} replace/>
    }
    return children;
}