import { Fragment } from "react";
import Header from "../../components/Header";
import SpecialtySection from "./sections/SpecialtySection";
import Banner from "./Banner";
import ClinicSection from "./sections/ClinicSection";
import DoctorSection from "./sections/DoctorSection";
import Footer from "../../components/Footer";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let slickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: true,
  initialSlide: 0,
  arrows: false,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        initialSlide: 2,
        arrows: false,
      },
    },
  ],
};

export default function HomePage() {
  return (
    <Fragment>
      <div className="HomePage ">
        <Header />
        <Banner />
        <SpecialtySection slickSettings={slickSettings} />
        <div className="divider h-20"></div>
        <ClinicSection slickSettings={slickSettings} />
        <div className="divider h-20"></div>
        <DoctorSection slickSettings={slickSettings} />
        <Footer />
      </div>
    </Fragment>
  );
}
