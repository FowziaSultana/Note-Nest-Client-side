import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Link as Link1, animateScroll as scroll } from "react-scroll";
import { AuthContext } from "../../Providers/AuthProvider";
import Loader from "../Loader/Loader";
const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  const handlelogOut = () => {
    logOut();
  };

  if (loading) {
    return <Loader></Loader>;
  }

  const logedNavItems = (
    <>
      <li>
        <Link to={"/dashboard/allNote"}>Dashboard</Link>
      </li>
      <li className=" md:hidden block ">
        <span className="flex justify-center items-center gap-2">
          {" "}
          <div>
            <p>{user?.displayName}</p>
          </div>
          <button onClick={handlelogOut} className="btn text-white btn-info">
            Logout
          </button>
        </span>
      </li>
    </>
  );
  const navItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link1
          to="aboutUs"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          About Us
        </Link1>
      </li>
    </>
  );
  return (
    <div className=" bg-blue-300  ">
      <div className="container mx-auto navbar font-semibold">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100  rounded-box w-52 "
            >
              {navItems}
              {user ? logedNavItems : <></>}
            </ul>
          </div>
          <p className="text-lg text-white italic">NoteNest</p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1  text-white ">
            {navItems}
            {user ? logedNavItems : <></>}
          </ul>
        </div>
        <div className="navbar-end ">
          {user ? (
            <div className="hidden md:block">
              <span className="flex justify-center items-center gap-2">
                {" "}
                <div>
                  <p className="text-white">{user?.displayName}</p>
                </div>
                <button
                  onClick={handlelogOut}
                  className="btn text-white btn-info"
                >
                  Logout
                </button>
              </span>
            </div>
          ) : (
            <Link to={"/login"} className="btn text-white btn-info ">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
