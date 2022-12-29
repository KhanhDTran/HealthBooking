import { Fragment, useEffect, useState } from "react";
import SystemHeader from "../../../components/SystemHeader";
import { useNavigate } from "react-router-dom";
import AdminGrid from "./AdminGrid";

export default function Admin() {
  let navigate = useNavigate();
  let role = JSON.parse(localStorage.getItem("role"));
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!role) {
      navigate("/login");
    }
  }, []);
  return (
    <Fragment>
      {role === "R1" ? (
        <div>
          <SystemHeader role="Admin" lastName={user.lastName} />
          <div className="container mx-auto pt-4">
            <AdminGrid />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center">Your're not athorized here!</h1>
        </div>
      )}
    </Fragment>
  );
}
