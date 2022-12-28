import i18next from "i18next";
import { useTranslation } from "react-i18next";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
async function changeLanguage(language) {
  i18next.changeLanguage(language).then(() => {});
}

export default function SystemHeader(props) {
  let navigate = useNavigate();
  return (
    <>
      <div className="navbar bg-base-100 sticky  top-0 z-30" data-theme="night">
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
              <li tabIndex={0}>
                <a></a>
              </li>
              <li>
                <a>doctor</a>
              </li>
              <li>
                <a></a>
              </li>
              <li>
                <a></a>
              </li>
            </ul>
          </div>
          <a
            className="btn btn-ghost normal-case text-md lg:text-xl"
            onClick={() => {
              navigate("/system/admin");
            }}
          >
            <div className="w-10 rounded">
              <img src={logo} />
            </div>
            <span>Health Booking</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <span className="text-2xl">{props.role && props.role} Page</span>
        </div>
        <div className="navbar-end">
          <span> {props.lastName && props.lastName}</span>
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