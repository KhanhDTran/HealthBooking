import { useTranslation } from "react-i18next";
import specitalyImg1 from "../../../assets/images/xuongkhop.png";
import Slider from "react-slick";

export default function Facility(props) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="container mx-auto">
        <div className="pt-8 pb-8 flex justify-between">
          <span className="text-2xl font-medium pl-4">
            {" "}
            {t("home-page.facility.title")}
          </span>
          <button className="btn btn-outline btn-info mr-4">
            {t("home-page.facility.more-info")}
          </button>
        </div>
        <div className="container mx-auto  slider-container">
          <Slider {...props.slickSettings}>
            <div>
              <img src={specitalyImg1} className="rounded-box" alt="" />
              <h2>Xuong khop 1</h2>
            </div>
            <div>
              <img src={specitalyImg1} className="rounded-box" alt="" />
              <h2>Xuong khop 2</h2>
            </div>
            <div>
              <img src={specitalyImg1} className="rounded-box" alt="" />
              <h2>Xuong khop 3</h2>
            </div>
            <div>
              <img src={specitalyImg1} className="rounded-box" alt="" />
              <h2>Xuong khop 4</h2>
            </div>
            <div>
              <img src={specitalyImg1} className="rounded-box" alt="" />
              <h2>Xuong khop 5</h2>
            </div>
            <div>
              <img src={specitalyImg1} className="rounded-box" alt="" />
              <h2>Xuong khop 6</h2>
            </div>
            <div>
              <img src={specitalyImg1} className="rounded-box" alt="" />
              <h2>Xuong khop 7</h2>
            </div>
            <div>
              <img src={specitalyImg1} className="rounded-box" alt="" />
              <h2>Xuong khop 8</h2>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
