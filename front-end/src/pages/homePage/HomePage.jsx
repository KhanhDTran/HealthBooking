import { Fragment } from "react";
import Header from "../../components/Header";
import Specialty from "./sections/Specialty";
import Banner from "./Banner";
import Facility from "./sections/Facility";
import OutstandingDoctor from "./sections/OutstandingDoctor";
import Footer from "../../components/Footer";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let slickSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
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
        <Specialty slickSettings={slickSettings} />
        <div className="divider h-20"></div>
        <Facility slickSettings={slickSettings} />
        <div className="divider h-20"></div>
        <OutstandingDoctor slickSettings={slickSettings} />
        <Footer />
      </div>
    </Fragment>
  );
}
