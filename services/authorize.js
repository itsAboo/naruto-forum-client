import axios from "axios";
import REACT_APP_API from "../env";

const authenticate = (response,next)=>{
    if(window !== "undefined"){
        //เก็บข้อมูลลง session storage
        sessionStorage.setItem("user",JSON.stringify(response.data));
    }
    next();
}
const getUser = () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"));
        }else{
            return false;
        }
    }
}
const deleteUser = ()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
            sessionStorage.removeItem("user");
        }
    }
}
const onLoggedOut = async(next)=>{
    if(window !== "undefined"){
        axios.post(`${REACT_APP_API}/api/logout`);
        sessionStorage.removeItem("user");
    }
    next();
}

export { getUser , authenticate , onLoggedOut , deleteUser };