import { Fragment, useEffect, useState } from "react";
import SystemHeader from "../../../components/SystemHeader";
import { useNavigate } from "react-router-dom";
import AdminGrid from "./AdminGrid";
import { useSelector } from "react-redux";

export default function Admin() {
  let navigate = useNavigate();
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.role.keyMap !== "R1") {
        navigate("/login");
      }
    }
  }, []);
  return (
    <Fragment>
      <div>
        <SystemHeader />
        <div className="container mx-auto pt-4">
          <AdminGrid />
        </div>
      </div>
    </Fragment>
  );
}
