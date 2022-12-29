import { useTranslation } from "react-i18next";
import specitalyImg1 from "../../../assets/images/clinics/benhvien.png";
import Slider from "react-slick";
import { useEffect } from "react";
import { getClinicsHome } from "../../../services/clinicService";
import { useState } from "react";

export default function Clinic(props) {
  const { t } = useTranslation();
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    fetchClinics().catch();
  }, []);

  const fetchClinics = async () => {
    let res = await getClinicsHome();
    if (res && res.data.errCode === 0) {
      setClinics(res.data.clinics);
    }
  };

  console.log(clinics);
  return (
    <div>
      <div className="container mx-auto">
        <div className="pt-8 pb-8 flex justify-between">
          <span className="text-2xl font-medium pl-4">
            {" "}
            {t("home-page.clinic.title")}
          </span>
          <button className="btn btn-outline btn-info mr-4">
            {t("home-page.clinic.more-info")}
          </button>
        </div>
        <div className="container mx-auto  slider-container">
          <Slider {...props.slickSettings}>
            {clinics &&
              clinics.length > 0 &&
              clinics.map((item) => {
                // console.log(`data:image/pmg;base64,${item.image.data}`);
                return (
                  <div
                    key={item._id}
                    className="hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
                  >
                    <img className="rounded-box " src={item.image} />
                    <h2>{item.name} </h2>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
