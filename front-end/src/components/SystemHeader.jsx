import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/actions/userAction";
export default function SystemHeader(props) {
  let navigate = useNavigate();
  let { user } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  return (
    <>
      <div className="navbar bg-base-100 sticky  top-0 z-30" data-theme="night">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost ">
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
                <a
                  onClick={() => {
                    navigate("/system/admin");
                  }}
                >
                  Dash Board
                </a>
              </li>
              <li>
                <a>Doctor</a>
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
          <span className="text-2xl">
            {user.role.keyMap === "R1" ? "Admin" : "Doctor"} Page
          </span>
        </div>
        <div className="navbar-end">
          <span> {user.lastName && user.lastName}</span>
          <a
            className="btn btn-ghost normal-case text-md lg:text-xl"
            onClick={() => {
              dispatch(userLogout()).then(() => {
                navigate("/login");
              });
            }}
          >
            <div className="w-10 rounded">
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
