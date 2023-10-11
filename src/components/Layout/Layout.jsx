import  { useEffect } from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {


  return (
    <>
      <Navbar />
      <div className="container">
      <Outlet />
      </div>

      <div>
    
    <Offline> <div  className="network"> <i className="fas fa-wifi"></i> Yor Are offline</div></Offline>
  </div>
    
      {/* <Footer /> */}
    </>
  );
}
