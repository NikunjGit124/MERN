import React, { lazy } from 'react';
import { Navigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";
let tokenGet = secureLocalStorage.getItem("user");
let AllRoutes = [
  { path: "/",exact:true, element : () => <Navigate replace to={tokenGet ? "/home" : "/login"} />},
  { path: "*",exact:true, element : () => <Navigate replace to={tokenGet ? "/home" : "/login"} />},
  { path: "/signup",exact:false,element : lazy(() => import("../Pages/Signup/Signup"))},
  { path: "/login",exact:true,element : lazy(() => import("../Pages/Login/Login"))},
  { path: "/home",exact:true,element :  lazy(() => import("../Pages/Home/Home"))},
]

export {AllRoutes}


