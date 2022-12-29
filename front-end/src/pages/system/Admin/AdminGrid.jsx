import doctorImg from "../../../assets/images/doctors/admindoctor.png";
import CreateUser from "./User/CreateUser";
import CreateSpecialty from "./Specialty/CreateSpecialty";
import CreateClinic from "./Clinic/CreateClinic";
import { useEffect, useState } from "react";

export default function AdminGrid() {
  let [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (openModal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [openModal]);
  return (
    <div id="admin-grid" className={openModal ? "overflow-y-hidden" : "pb-10"}>
      <div className="not-prose  grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ">
        {/* --------------------------------create doctor ----------------------------------- */}
        <CreateUser setOpenModal={setOpenModal} />

        {/* --------------------------------create doctor ----------------------------------- */}
        {/* --------------------------------create specialty ----------------------------------- */}
        <CreateSpecialty setOpenModal={setOpenModal} />
        {/* --------------------------------create specialty ----------------------------------- */}
        {/* --------------------------------create specialty ----------------------------------- */}
        <CreateClinic setOpenModal={setOpenModal} />
        {/* --------------------------------create specialty ----------------------------------- */}
        {/* --------------------------------All doctor ----------------------------------- */}
        <div className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer">
          <figure className="px-10 pt-10">
            <img src={doctorImg} alt="Shoes" className="rounded-box" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Doctors</h2>
            <p>Spectate all doctors</p>
          </div>
        </div>
        {/* --------------------------------All doctor ----------------------------------- */}

        {/* --------------------------------Edit doctors ----------------------------------- */}
        <div className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer">
          <figure className="px-10 pt-10">
            <img src={doctorImg} alt="Shoes" className="rounded-box" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Doctors</h2>
            <p>Edit doctors Profile</p>
          </div>
        </div>
        {/* --------------------------------Edit doctors ----------------------------------- */}
      </div>
    </div>
  );
}
