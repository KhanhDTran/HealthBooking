import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getSpecialtiesHome } from "../../../services/specialtyService";

export default function Specialty(props) {
  const { t } = useTranslation();
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    fetchData().catch();
  }, []);

  const fetchData = async () => {
    let res = await getSpecialtiesHome();
    if (res && res.data.errCode === 0) {
      setSpecialties(res.data.specialties);
    }
  };

  return (
    <div data-theme="cupcake">
      <div className="container mx-auto">
        <div className="pt-8 pb-8 flex justify-between">
          <span className="text-2xl font-medium pl-4">
            {" "}
            {t("home-page.specialty.title")}
          </span>
          <button className="btn btn-outline btn-info mr-4">
            {t("home-page.specialty.more-info")}
          </button>
        </div>
      </div>
      <div className="container mx-auto  slider-container">
        <Slider {...props.slickSettings}>
          {specialties &&
            specialties.length > 0 &&
            specialties.map((item) => {
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
  );
}
