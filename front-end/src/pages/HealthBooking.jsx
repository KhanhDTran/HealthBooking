import { Fragment } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import ErrorPage from "./ErrorPage";
import Login from "./authPage/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Doctor from "./system/Doctor/Doctor";
import Admin from "./system/Admin/Admin";
import ManageDoctor from "./system/Admin/Doctor/ManageDoctor";
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
    path: "/system/admin",
    element: <Admin />,
  },
  {
    path: "/system/admin/manage-doctors-profile",
    element: <ManageDoctor />,
  },
  {
    path: "/system/doctor",
    element: <Doctor />,
  },
]);

export default function HealthBooking() {
  return (
    <Fragment>
      <RouterProvider router={router} />
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
