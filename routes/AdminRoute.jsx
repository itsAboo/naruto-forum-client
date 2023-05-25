import { useContext } from "react";
import { UserContext } from "../src/contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({children}){
    const {user} = useContext(UserContext);
    if(user.role !== "admin"){
        return <Navigate to={"/"} replace />;
    }
    return children;
}