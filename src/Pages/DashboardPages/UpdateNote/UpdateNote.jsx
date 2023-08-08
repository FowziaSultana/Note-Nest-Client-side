import React from "react";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const UpdateNote = () => {
  const navigate = useNavigate();
  const note = useLoaderData();
  const { _id, author, title, email, notes, subCategory, photo } = note;

  const handleUpdate = (id) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const notes = form.notes.value;
    const photo = form.photo?.value || "";
    var selectBox = document.getElementById("updateCat");
    var subCategory = selectBox.value;

    const aNote = {
      _id,
      title,
      author,
      email,
      notes,
      subCategory,
      photo,
    };

    fetch(`https://notes-library-server-side.vercel.app/notes/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(aNote),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          console.log("this is fron client side UPDATE", data);
          toast.success("Successfully Updated a Note");
          navigate("/dashboard/allNote");
        }
      });
  };
  return (
    <div className=" container mx-auto w-3/4 bg-[#F4F3F0] px-3 md:px-24 py-5 md:py-14 mt-11 rounded-lg">
      <h1 className="text-center text-info text-3xl lg:text-5xl">UPDATE TOY</h1>
      <form onSubmit={() => handleUpdate(_id)} className="">
        {/* ---------------------title------------------------------------ */}
        <div
          className="grid grid-cols-1  gap-5 my-3
        "
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-info font-semibold text-xl">
                Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="input input-bordered "
              name="title"
              defaultValue={title}
              required
            />
          </div>
        </div>
        {/* ------------------------ category photo--------------------------------- */}
        <div
          className="grid grid-col-1  gap-5 my-3
        "
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-info font-semibold text-xl">
                Sub-Category
              </span>
            </label>
            <div className="input-group">
              <select id="updateCat" className="select select-bordered w-full">
                <option disabled>Pick category</option>
                {subCategory == "Personal" ? (
                  <option selected value={"Personal"}>
                    Personal
                  </option>
                ) : (
                  <option value={"Personal"}>Personal</option>
                )}
                {subCategory == "Official" ? (
                  <option selected value={"Official"}>
                    Official
                  </option>
                ) : (
                  <option value={"Official"}>Official</option>
                )}
                {subCategory == "Daily" ? (
                  <option selected value={"Daily"}>
                    Daily
                  </option>
                ) : (
                  <option value={"Daily"}>Daily</option>
                )}
                {subCategory == "Reminders" ? (
                  <option selected value={"Reminders"}>
                    Reminders
                  </option>
                ) : (
                  <option value={"Reminders"}>Reminders</option>
                )}
              </select>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-info font-semibold text-xl">
                Photo
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter URL"
              className="input input-bordered "
              name="photo"
              defaultValue={photo}
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
                Note
              </span>
            </label>
            <textarea
              name="notes"
              className="textarea textarea-bordered "
              placeholder="Enter description"
              defaultValue={notes}
              required
            ></textarea>
          </div>
        </div>
        {/* -----------------------------button---------------------------- */}
        <button className="btn btn-block  btn-info mt-5">Update Note</button>
      </form>
    </div>
  );
};

export default UpdateNote;
