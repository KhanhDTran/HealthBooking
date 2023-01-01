import { Fragment } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import ErrorPage from "./ErrorPage";
import Login from "./authPages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Doctor from "./system/Doctor/Doctor";
import Admin from "./system/Admin/Admin";
import ManageDoctor from "./system/Admin/Doctor/ManageDoctor";
import ManageUser from "./system/Admin/User/ManageUser";
import ManageSpecialty from "./system/Admin/Specialty/ManageSpecialty";
import ManageClinic from "./system/Admin/Clinic/ManageClinic";
import DoctorPage from "./doctorPages/DoctorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function HealthBooking() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="/doctor/:id" element={<DoctorPage />} />
          <Route path="system/admin">
            <Route index={true} element={<Admin />} />
            <Route path="manage-doctors-profile" element={<ManageDoctor />} />
            <Route path="manage-users" element={<ManageUser />} />
            <Route path="manage-specialties" element={<ManageSpecialty />} />
            <Route path="manage-clinics" element={<ManageClinic />} />
          </Route>
          <Route path="system/doctor">
            <Route index={true} element={<Doctor />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Fragment>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/doctor/:id",
    element: <DoctorPage />,
  },

  // System for admin  -----------------

  {
    path: "/system/admin",
    element: <Admin />,
  },
  {
    path: "/system/admin/manage-doctors-profile",
    element: <ManageDoctor />,
  },
  {
    path: "/system/admin/manage-users",
    element: <ManageUser />,
  },
  {
    path: "/system/admin/manage-specialties",
    element: <ManageSpecialty />,
  },
  {
    path: "/system/admin/manage-clinics",
    element: <ManageClinic />,
  },

  // System for doctor  -----------------

  {
    path: "/system/doctor",
    element: <Doctor />,
  },
]);
