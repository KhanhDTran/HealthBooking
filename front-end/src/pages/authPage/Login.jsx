import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showPass, setShowPass] = useState(false);

  function handleLogin() {
    if (!email || !password) {
      toast.warning("Missing input");
    } else {
      toast.success("Login");
    }
  }

  console.log(showPass);
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
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
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
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={!showPass ? "password" : "text"}
                  id="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
