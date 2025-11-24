import React from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return <>
  <Navbar/> 
  <div className="container py-12  mt-6">

<Outlet></Outlet>

  </div>
  
  <Footer/>

  </>
}
