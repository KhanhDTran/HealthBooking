import { useTranslation } from "react-i18next";
import Slider from "react-slick";

export default function OutstandingDoctor(props) {
  const { t } = useTranslation();

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
          <div className=" bg-base-100 shadow-xl">
            <div className="items-center justify-items-center flex">
              <img
                className="image-doctor"
                src="https://placeimg.com/192/192/people"
              />
            </div>
            <div className="">
              <h2 className="doctor-title text-2xl ">Doctor 1</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
          <div className=" bg-base-100 shadow-xl">
            <div className="items-center justify-items-center flex">
              <img
                className="image-doctor"
                src="https://placeimg.com/192/192/people"
              />
            </div>
            <div className="">
              <h2 className="doctor-title text-2xl  ">Doctor 2</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
          <div className=" bg-base-100 shadow-xl">
            <div className="items-center justify-items-center flex">
              <img
                className="image-doctor"
                src="https://placeimg.com/192/192/people"
              />
            </div>
            <div className="">
              <h2 className="doctor-title text-2xl ">Doctor 3</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
          <div className=" bg-base-100 shadow-xl">
            <div className="items-center justify-items-center flex">
              <img
                className="image-doctor"
                src="https://placeimg.com/192/192/people"
              />
            </div>
            <div className="">
              <h2 className="doctor-title text-2xl ">Doctor 4</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
          <div className=" bg-base-100 shadow-xl">
            <div className="items-center justify-items-center flex">
              <img
                className="image-doctor"
                src="https://placeimg.com/192/192/people"
              />
            </div>
            <div className="">
              <h2 className="doctor-title text-2xl ">Doctor 5</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
          <div className=" bg-base-100 shadow-xl">
            <div className="items-center justify-items-center flex">
              <img
                className="image-doctor"
                src="https://placeimg.com/192/192/people"
              />
            </div>
            <div className="">
              <h2 className="doctor-title text-2xl ">Doctor 6</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
          <div className=" bg-base-100 shadow-xl">
            <div className="items-center justify-items-center flex">
              <img
                className="image-doctor"
                src="https://placeimg.com/192/192/people"
              />
            </div>
            <div className="">
              <h2 className="doctor-title text-2xl ">Doctor 7</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
          <div className=" bg-base-100 shadow-xl">
            <div className="items-center justify-items-center flex">
              <img
                className="image-doctor"
                src="https://placeimg.com/192/192/people"
              />
            </div>
            <div className="">
              <h2 className="doctor-title text-2xl ">Doctor 8</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
