import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../services/authorize";
import { UserContext } from "../src/contexts/UserContext";
import axios from "axios";
import REACT_APP_API from "../env";
import { LoadingIcon, LoadingContext } from "../src/contexts/LoadingContext";

export default function UserRoute({ children }) { 
  const navigate = useNavigate();
  const deleteToken = async()=>{
    await axios.post(`${REACT_APP_API}/api/logout`);
  }
  useEffect(()=>{
    if (!getUser()) {
      // return <Navigate to={"/login"} />;
      deleteToken();
      navigate("/login");
      navigate(0);
    }
  })
  return (
    <>
      <LoadingIcon/>
      {children}
    </>
  )
}
