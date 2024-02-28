import React from "react";
import { useDispatch} from "react-redux";
import { logout } from "../store/authSlice";
import auth from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
function LogoutBt() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const logoutHandler = () => {
    auth
      .logout()
      .then(() => {
        console.log("Logged out");
        dispatch(logout()); 
        navigate("/login")
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return <button onClick={logoutHandler}  className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Logout</button>;
}

export default LogoutBt;
