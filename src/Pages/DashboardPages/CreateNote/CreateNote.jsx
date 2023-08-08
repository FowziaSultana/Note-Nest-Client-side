import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

// bg-[#0b4027]
const CreateNote = () => {
  const navigate = useNavigate();
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

  const handleAdd = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const author = form.author.value;
    const email = form.email.value;
    const notes = form.notes.value;
    const photo = form.photo?.value || "";
    var selectBox = document.getElementById("mySelect");
    var subCategory = selectBox.value;

    const aNote = {
      title,
      subCategory,
      author,
      email,
      notes,
      photo,
    };

    //console.log(aNote);
    fetch("https://notes-library-server-side.vercel.app/notes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(aNote),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log("this is from client side add Note", data);
          toast.success("Successfully Added a Note");
          form.reset();
          navigate("/dashboard/allNote");
        }
      });
  };
  return (
    <div className=" container mx-auto w-3/4 bg-[#F4F3F0] px-3 md:px-24 py-5 md:py-14 mt-11 rounded-lg">
      <h1 className="text-center text-info text-3xl lg:text-5xl">
        Create Notes
      </h1>
      {userRole == "new_user" ? (
        <h1 className="text-center  text-base lg:text-xl my-5  ">
          Your account still haven't authorized by admin, You can't create
          notes.
        </h1>
      ) : (
        <>
          <form onSubmit={handleAdd} className="">
            {/* ---------------------NAME category------------------------------------ */}
            <div
              className="grid md:grid-cols-2  gap-5 my-3
        "
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-info font-semibold text-xl">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="input input-bordered "
                  name="title"
                  required
                />
              </div>

              <div className="form-control">
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
                  >
                    <option value={""}>Pick category</option>
                    <option value={"Personal"}>Personal</option>
                    <option value={"Official"}>Official</option>
                    <option value={"Daily"}>Daily</option>
                    <option value={"Reminders"}>Reminders</option>
                  </select>
                </div>
              </div>
            </div>

            {/* --------------------------Writers name and email------------------------------- */}
            <div
              className="grid md:grid-cols-2  gap-5 my-3
        "
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-info font-semibold text-xl">
                    Author
                  </span>
                </label>
                <input
                  readOnly
                  className="input input-bordered "
                  name="author"
                  defaultValue={user?.displayName}
                />
              </div>{" "}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-info font-semibold text-xl">
                    Email
                  </span>
                </label>
                <input
                  readOnly
                  placeholder="Enter Email"
                  className="input input-bordered "
                  name="email"
                  defaultValue={user?.email}
                />
              </div>
            </div>
            {/* -------------------------Photo-------------------------------- */}
            <div
              className="grid grid-cols-1 my-3
        "
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-info font-semibold text-xl">
                    Photo
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="Enter URL"
                  className="input input-bordered "
                  name="photo"
                />
              </div>
            </div>
            {/* -------------------------description-------------------------------- */}
            <div
              className="grid grid-cols-1 my-3
        "
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-info font-semibold text-xl">
                    Description
                  </span>
                </label>
                <textarea
                  name="notes"
                  className="textarea textarea-bordered "
                  placeholder="Enter description"
                  required
                ></textarea>
              </div>
            </div>
            {/* -----------------------------button---------------------------- */}
            <button className="btn btn-block  btn-info mt-5">Add Note</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateNote;
