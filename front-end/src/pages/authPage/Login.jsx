import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showPass, setShowPass] = useState(false);
  const { role, logged_in } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) {
      toast.warning("Missing input");
    } else {
      dispatch(userLogin({ email, password }));
    }
  }
  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      await handleLogin();
    }
  }

  let role_local = JSON.parse(localStorage.getItem("role"));
  useEffect(() => {
    if (role_local && role_local === "R1") {
      navigate("/system/admin");
    }
    if (role_local && role_local === "R2") {
      navigate("/system/doctor");
    }
  }, []);
  useEffect(() => {
    if (role.keyMap === "R1") {
      navigate("/system/admin");
    }
    if (role.keyMap === "R2") {
      navigate("/system/doctor");
    }
  }, [logged_in]);

  return (
    <div data-theme="cupcake">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col  gap-10 lg:w-5/6">
          <div className="text-center  flex-col">
            <div className="w-24 rounded mx-auto">
              <img src={logo} className="" />
            </div>
            <span className="text-3xl ">Health Booking</span>
            <h1 className="text-5xl font-bold">Login</h1>
            <span></span>
          </div>
          <div
            className="card flex-shrink-0 w-ful max-w shadow-2xl bg-base-100"
            data-theme="light"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>{" "}
                <input
                  type={!showPass ? "password" : "text"}
                  id="password"
                  autoComplete="off"
                  placeholder="Password"
                  className="input input-bordered md:w-96"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <i
                  className={
                    !showPass
                      ? "fa-solid fa-eye text-lg absolute right-10 top-44 hover:cursor-pointer"
                      : "fa-solid fa-eye-slash text-lg absolute right-10 top-44 hover:cursor-pointer"
                  }
                  onClick={() => setShowPass(!showPass)}
                ></i>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={() => handleLogin()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
