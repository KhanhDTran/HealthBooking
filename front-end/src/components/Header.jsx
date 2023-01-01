import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();
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
                <a>Chuyên khoa</a>
              </li>
              <li>
                <a>Cơ sở Y tế</a>
              </li>
              <li>
                <a>Bác sĩ</a>
              </li>
              <li>
                <a>Gói khám</a>
              </li>
            </ul>
          </div>
          <a
            className="btn btn-ghost normal-case text-xl"
            onClick={() => {
              navigate("/");
            }}
          >
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
              <a>Chuyên khoa</a>
            </li>
            <li>
              <a>Cơ sở Y tế</a>
            </li>
            <li>
              <a>Bác sĩ</a>
            </li>
            <li>
              <a>Gói khám</a>
            </li>
          </ul>
        </div>
        {/* nav - right */}
        <div className="navbar-end"></div>
      </div>
    </>
  );
}
