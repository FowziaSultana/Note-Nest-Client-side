import React from "react";
import img1 from "../../assets/headerImg.jpg";

const Header = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  bg-black text-white place-items-center px-9 py-5">
      <div className="">
        <h1 className="text-[#c8c5be] font-bold text-3xl md:text-5xl lg:leading-tight">
          Unlock Your Productivity!
        </h1>
        <p className="text-sm md:text-lg my-5">
          Welcome to Note Nest, your ultimate destination for efficient
          note-taking and organization. Elevate your workflow and streamline
          your ideas as you effortlessly capture, categorize, and access your
          notes anytime, anywhere. Experience a new level of productivity as you
          embark on a journey of organized creativity. Start saving smarter
          today!
        </p>
        <button className="btn text-white btn-info">Explore</button>
      </div>
      <div>
        <img
          src={img1}
          className="object-cover max-h-[400px] max-w-lg rounded-md my-10"
        ></img>
      </div>
    </div>
  );
};

export default Header;
