import bannerImg from "../../assets/images/banner.jpg";
import { useTranslation } from "react-i18next";

export default function Banner() {
  const { t } = useTranslation();
  let placeholder =
    t("home-page.banner.search-placeholder") !== null
      ? t("home-page.banner.search-placeholder")
      : "";
  return (
    <div className="banner-container min-h-400">
      <div
        className="flex  place-items-center justify-center relative"
        data-theme="night"
      >
        <img
          className="object-cover h-full min-h-400 w-screen ..."
          src={bannerImg}
        />
        <div className="absolute flex flex-col   place-items-center justify-center w-full inset-x-0 top-40 h-1/6">
          <div className="flex flex-col text-center text-lg sm:text-3xl text-white   mb font-semibold">
            <span className="backdrop-blur-2xl">
              {t("home-page.banner.title1")}
            </span>
            <br />
            <span className="backdrop-blur-2xl">
              {t("home-page.banner.title2")}
            </span>
          </div>
          <div className="mt-20">
            <input type="text" placeholder={placeholder} className="input " />
            <button className="btn ml-2">
              {" "}
              {t("home-page.banner.search-btn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
