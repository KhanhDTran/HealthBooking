import { useState } from "react";
import doctorImg from "../../../../assets/images/doctors/admindoctor.png";

export default function CreateDoctor(props) {
  function createDoctor() {}

  return (
    <>
      <div
        htmlFor="create-doctor-modal"
        className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
        onClick={() => {
          document.getElementById("create-doctor-modal").checked = true;
          props.setOpenModal(true);
        }}
      >
        <figure className="px-10 pt-10">
          <img src={doctorImg} alt="Shoes" className="rounded-box" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Doctors</h2>
          <p>Create a new doctor</p>
        </div>
      </div>
      {/* <------------------------ Modal here -------------------> */}
      <input
        type="checkbox"
        id="create-doctor-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Create A New Doctor.</h3>
          <label
            htmlFor="create-doctor-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => props.setOpenModal(false)}
          >
            ✕
          </label>
          <div className="divider"></div>
          {/* <--------------------- Modal content here --------------------> */}
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          {/* <--------------------- Modal content here --------------------> */}
          <div className="modal-action">
            <label
              htmlFor="create-doctor-modal"
              className="btn"
              onClick={() => props.setOpenModal(false)}
            >
              Cancel
            </label>
            <button className="btn btn-primary ml-4" onClick={createDoctor}>
              Create
            </button>
          </div>
        </div>
      </div>
      {/* <------------------------ Modal here -------------------> */}
    </>
  );
}
