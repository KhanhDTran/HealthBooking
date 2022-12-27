import { Fragment, useEffect } from "react";
import SystemHeader from "../../../components/SystemHeader";
import { useNavigate } from "react-router-dom";

export default function Doctor() {
  let navigate = useNavigate();
  let role = JSON.parse(localStorage.getItem("role"));
  useEffect(() => {
    if (!role) {
      navigate("/login");
    }
  }, []);

  return (
    <Fragment>
      {role === "doctor" ? (
        <div>
          <SystemHeader role="Doctor" />
          <div className="doctor">
            <div>doctor</div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl">Your're not athorized here!</h1>
          <h2
            className="text-center text-xl underline hover:cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Turn Back Here
          </h2>
        </div>
      )}
    </Fragment>
  );
}
