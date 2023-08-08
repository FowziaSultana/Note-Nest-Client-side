import React, { useContext, useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import img1 from "../../../assets/headerImg.jpg";
import { data } from "autoprefixer";

const AllNotes = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();
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

  const url = `https://notes-library-server-side.vercel.app/notes?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [url]);

  const handleNoteUpdate = (id) => {
    Swal.fire({
      title: "Are you sure You want to Update the Note?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        navigate(`/dashboard/updateNotes/${id}`);
        // <Navigate to={`/updatenotes/${id}`}></Navigate>;
      }
    });
  };
  const handleNoteDelete = (id) => {
    Swal.fire({
      title: "Are you sure You want to Delete the Note?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://notes-library-server-side.vercel.app/note/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your Note has been deleted.", "success");
              const remaining = notes.filter((note) => note._id !== id);
              setNotes(remaining);
            } else {
              toast.error("Something went wrong");
            }
          });
      }
    });
  };
  const handleNoteCategory = (cat) => {
    fetch(
      `https://notes-library-server-side.vercel.app/notesByCategory?email=${user?.email}&&cat=${cat}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        toast.success(` ${cat ? cat : "All"} categories notes are shown `);
      });
  };
  const handleSearch = () => {
    const searchText = document.getElementById("mysearch").value;
    fetch(
      `https://notes-library-server-side.vercel.app/searchNotes?search=${searchText}&&email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        document.getElementById("mysearch").value = "";
      });
  };

  return (
    <div className="max-w-[800px]  mt-10  ">
      <h1 className="text-center text-info text-3xl lg:text-5xl mb-5  ">
        MY Notes
      </h1>

      {userRole == "new_user" ? (
        <h1 className="text-center  text-base lg:text-xl mb-5  ">
          Your account still haven't authorized by admin
        </h1>
      ) : (
        <>
          <div className="py-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-info font-semibold text-xl">
                  Category
                </span>
              </label>
              <div className="input-group">
                <select
                  id="mySelect"
                  className="select select-bordered w-full"
                  required
                  onChange={(event) => {
                    const selectedValue = event.target.value;
                    handleNoteCategory(selectedValue);
                  }}
                >
                  <option value={""}>All category</option>
                  <option value={"Personal"}>Personal</option>
                  <option value={"Official"}>Official</option>
                  <option value={"Daily"}>Daily</option>
                  <option value={"Reminders"}>Reminders</option>
                </select>
              </div>
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text text-info font-semibold text-xl">
                  Search by Title
                </span>
              </label>
              <div className="input-group ">
                <input
                  id="mysearch"
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered w-full"
                />
                <button onClick={handleSearch} className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-5">
            {notes.map((aNote) => (
              <div className="card md:card-side bg-base-100 shadow-xl ">
                <figure>
                  <img
                    className="h-[250px] object-cover"
                    src={aNote?.photo || img1}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{aNote.title}</h2>
                  <p>{aNote.notes}</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => handleNoteUpdate(aNote._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaPencilAlt className="text-info"></FaPencilAlt>
                    </button>
                    <button
                      onClick={() => handleNoteDelete(aNote._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrash className="text-info"></FaTrash>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllNotes;
