import doctorImg from "../../../assets/images/doctors/admindoctor.png";
import specialtyImg from "../../../assets/images/specialties/timmach.jpg";
import clinicImg from "../../../assets/images/clinics/laokhoa.jpg";
import userImg from "../../../assets/images/user.jpg";
import CreateUser from "./User/CreateUser";
import CreateSpecialty from "./Specialty/CreateSpecialty";
import CreateClinic from "./Clinic/CreateClinic";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminGrid() {
  let [openModal, setOpenModal] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (openModal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style = "";
    }
  }, [openModal]);
  return (
    <div id="admin-grid" className={openModal ? "overflow-y-hidden" : "pb-10"}>
      <div className="not-prose  grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ">
        <CreateUser setOpenModal={setOpenModal} />
        <CreateSpecialty setOpenModal={setOpenModal} />
        <CreateClinic setOpenModal={setOpenModal} />

        {/* --------------------------------All doctor ----------------------------------- */}
        <div
          onClick={() => navigate("/system/admin/manage-users")}
          className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
        >
          <figure className="px-10 pt-10">
            <img src={userImg} alt="" className="rounded-box" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Users</h2>
            <p>Manage Users Infomation</p>
          </div>
        </div>
        {/* --------------------------------All doctor ----------------------------------- */}

        {/* --------------------------------Edit doctors ----------------------------------- */}
        <div
          className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
          onClick={() => {
            navigate("/system/admin/manage-doctors-profile");
          }}
        >
          <figure className="px-10 pt-10">
            <img src={doctorImg} alt="" className="rounded-box" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Doctors</h2>
            <p>Edit Doctors Profile</p>
          </div>
        </div>
        {/* --------------------------------Edit specialties ----------------------------------- */}
        <div
          className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
          onClick={() => {
            navigate("/system/admin/manage-specialties");
          }}
        >
          <figure className="px-10 pt-10">
            <img src={specialtyImg} alt="" className="rounded-box" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Specialties</h2>
            <p>Manage Specialties Information</p>
          </div>
        </div>
        {/* --------------------------------Edit clinics ----------------------------------- */}
        <div
          className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
          onClick={() => {
            navigate("/system/admin/manage-clinics");
          }}
        >
          <figure className="px-10 pt-10">
            <img src={clinicImg} alt="" className="rounded-box" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Clinics</h2>
            <p>Manage Clinics Information</p>
          </div>
        </div>
      </div>
    </div>
  );
}
