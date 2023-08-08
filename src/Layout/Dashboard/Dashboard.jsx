import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    fetch(
      `https://notes-library-server-side.vercel.app/users?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        const tem = data[0].role;
        setUserRole(tem);
      });
  }, [user?.email]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Sidebar
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {userRole == "admin" ? (
            <li>
              <Link to={"/dashboard/manageUser"}>Manage User</Link>
            </li>
          ) : (
            <></>
          )}
          {userRole == "author" || userRole == "admin" ? (
            <li>
              <Link to={"/dashboard/createNote"}>Create Note</Link>
            </li>
          ) : (
            <></>
          )}

          <li>
            <Link to={"/dashboard/allNote"}>All Note</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
