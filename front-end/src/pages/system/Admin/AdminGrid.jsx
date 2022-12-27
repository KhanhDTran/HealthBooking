import doctorImg from "../../../assets/images/doctors/admindoctor.png";
import ModalCreateDoctor from "./Doctor/ModalCreateDoctor";

export default function AdminGrid(props) {
  return (
    <>
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
        <ModalCreateDoctor />

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
      </div>
    </>
  );
}
