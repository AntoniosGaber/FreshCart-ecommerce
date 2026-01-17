import React from "react";
import styles from "./ProductRoute.module.css";
import { Navigate } from "react-router-dom";


export default function ProductRoute({children}) {
 if (localStorage.getItem('userToken')) { 
  return children
} else{
 return <Navigate to={"/login"} />
}
}
