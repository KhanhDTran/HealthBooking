import i18next from "i18next";
import { useTranslation } from "react-i18next";
import logo from "../assets/images/logo.png";

async function changeLanguage(language) {
  i18next.changeLanguage(language).then(() => {});
}

export default function Header() {
  const { t } = useTranslation();
  return (
    <>
      <div className="navbar  sticky  top-0 z-30 " data-theme="">
        {/* nav - left */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>{t("header.specialty")}</a>
              </li>
              <li tabIndex={0}>
                <a>{t("header.medical-facilities")}</a>
              </li>
              <li>
                <a>{t("header.doctor")}</a>
              </li>
              <li>
                <a>{t("header.examination-packs")}</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">
            <div className="w-10 rounded">
              <img src={logo} />
            </div>
            <span>Health Booking</span>
          </a>
        </div>
        {/* nav - center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>{t("header.specialty")}</a>
            </li>
            <li tabIndex={0}>
              <a>{t("header.medical-facilities")}</a>
            </li>
            <li>
              <a>{t("header.doctor")}</a>
            </li>
            <li>
              <a>{t("header.examination-packs")}</a>
            </li>
          </ul>
        </div>
        {/* nav - right */}
        <div className="navbar-end">
          <select
            className="select-sm select select-bordered "
            data-theme=""
            value={i18next.language}
            onChange={(e) => {
              changeLanguage(e.target.value);
            }}
          >
            <option value="vi">VN</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    </>
  );
}
