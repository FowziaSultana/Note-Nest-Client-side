import React from "react";
import Header from "./Header";
import AboutUs from "./AboutUs";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <AboutUs></AboutUs>

      <div className="mt-auto">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
