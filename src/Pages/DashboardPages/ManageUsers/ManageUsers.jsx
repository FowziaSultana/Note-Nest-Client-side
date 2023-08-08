import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState([]);
  const [allUser, setAllUser] = useState([]);

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

  useEffect(() => {
    fetch("https://notes-library-server-side.vercel.app/users")
      .then((res) => res.json())
      .then((data1) => setAllUser(data1));
  }, []);

  const handleMakeAuthor = (singleUser) => {
    fetch(
      `https://notes-library-server-side.vercel.app/users/${singleUser._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          fetch("https://notes-library-server-side.vercel.app/users")
            .then((res) => res.json())
            .then((data1) => setAllUser(data1));

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${singleUser.name} is an Author Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="max-w-[800px]  mt-10 ">
      {userRole == "admin" ? (
        <div className="bg-[#F4F3F0]">
          <h1 className="text-center text-info text-3xl lg:text-5xl mb-5  ">
            Manage Users
          </h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-right">Role</th>
                </tr>
              </thead>
              <tbody>
                {allUser.map((aUser, index) => (
                  <tr key={aUser._id}>
                    <th>{index + 1}</th>
                    <td>{aUser.name}</td>
                    <td>{aUser.email}</td>

                    <td className="uppercase">
                      {aUser.role === "author" || aUser.role === "admin" ? (
                        aUser.role
                      ) : (
                        <button
                          onClick={() => handleMakeAuthor(aUser)}
                          className="btn btn-info btn-xs"
                          disabled={aUser.role === "admin"}
                        >
                          Make Author
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <h1>You are not Authorized</h1>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
