import doctorImg from "../../../assets/images/doctors/admindoctor.png";
import CreateDoctor from "./Doctor/CreateDoctor";
import CreateSpecialty from "./Specialty/CreateSpecialty";
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
    <div id="admin-grid" className={openModal ? "overflow-y-hidden" : ""}>
      <div className="not-prose  grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ">
        {/* --------------------------------All doctor ----------------------------------- */}
        <div className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer">
          <figure className="px-10 pt-10">
            <img src={doctorImg} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Doctors</h2>
            <p>Spectate all doctors</p>
          </div>
        </div>
        {/* --------------------------------All doctor ----------------------------------- */}
        {/* --------------------------------create doctor ----------------------------------- */}
        <CreateDoctor setOpenModal={setOpenModal} />

        {/* --------------------------------create doctor ----------------------------------- */}
        {/* --------------------------------Edit doctors ----------------------------------- */}
        <div className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer">
          <figure className="px-10 pt-10">
            <img src={doctorImg} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Doctors</h2>
            <p>Edit doctors Profile</p>
          </div>
        </div>
        {/* --------------------------------Edit doctors ----------------------------------- */}
        {/* --------------------------------create specialty ----------------------------------- */}
        <CreateSpecialty setOpenModal={setOpenModal} />
        {/* --------------------------------create specialty ----------------------------------- */}
      </div>
    </div>
  );
}
