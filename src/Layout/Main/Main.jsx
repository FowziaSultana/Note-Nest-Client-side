import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Main = () => {
  return (
    // <div className="flex flex-col min-h-screen">
    //   <div className="flex-1">
    //     <Navbar></Navbar>
    //     <Outlet></Outlet>{" "}
    //   </div>
    //   <div className="mt-auto">
    //     <Footer></Footer>
    //   </div>
    // </div>
    <Outlet></Outlet>
  );
};

export default Main;
