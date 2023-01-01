import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import doctorImg from "../../../assets/images/doctors/doctor1.png";
import { useState, useEffect } from "react";
import { getDoctorsHome } from "../../../services/doctorService";

export default function DoctorSection(props) {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      let res = await getDoctorsHome();
      if (res && res.data.errCode === 0) {
        setDoctors(res.data.doctors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(doctors);

  return (
    <div data-theme="cupcake" className="">
      <div className="container mx-auto">
        <div className="pt-8 pb-8 flex justify-between">
          <span className="text-2xl font-medium pl-4">
            {" "}
            {t("home-page.doctor.title")}
          </span>
          <button className="btn btn-outline btn-info mr-4">
            {t("home-page.doctor.more-info")}
          </button>
        </div>
      </div>
      <div className="container mx-auto  slider-container">
        <Slider {...props.slickSettings}>
          {doctors &&
            doctors.length > 0 &&
            doctors.map((item, index) => {
              return (
                <div
                  key={index}
                  className="hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
                >
                  <div className=" bg-base-100 shadow-xl p-4">
                    <div className="items-center justify-items-center flex flex-col">
                      <img className="image-doctor" src={item.image} />
                      <h2 className="doctor-title text-md ">
                        {item.position.value} {item.user.firstName}{" "}
                        {item.user.lastName}
                      </h2>
                      <span>{item.description}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
}
