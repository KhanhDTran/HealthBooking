import expess from "express";
import {
  createUser,
  login,
  getUsers,
  deleteUserById,
  updateUserById,
} from "../controllers/userController.js";
import {
  createSpecialty,
  getSpecialtyHome,
  deleteSpecialtyById,
  updateSpecialtyById,
  getSpecialtyById,
} from "../controllers/specialtyController.js";

import {
  createClinic,
  getClinicHome,
  deleteClinicById,
  updateClinicById,
  getclinicById,
} from "../controllers/clinicController.js";
import { getAllcode } from "../controllers/allcodeController.js";

let router = expess.Router();

export function webRoute(app) {
  router.get("/users", (req, res) => {
    res.send("users page");
  });

  router.post("/api/login", login);

  // User

  router.get("/api/get-users", getUsers);
  router.post("/api/create-user", createUser);
  router.delete("/api/delete-user-by-id", deleteUserById);
  router.put("/api/update-user-by-id", updateUserById);

  //Specialty

  router.get("/api/get-specialty-by-id", getSpecialtyById);
  router.get("/api/get-all-specialty", getSpecialtyHome);
  router.post("/api/create-specialty", createSpecialty);
  router.delete("/api/delete-specialty-by-id", deleteSpecialtyById);
  router.put("/api/update-specialty-by-id", updateSpecialtyById);

  //Clinic

  router.get("/api/get-clinic-by-id", getclinicById);
  router.get("/api/get-all-clinic", getClinicHome);
  router.post("/api/create-new-clinic", createClinic);
  router.delete("/api/delete-Clinic-by-id", deleteClinicById);
  router.put("/api/update-Clinic-by-id", updateClinicById);

  //AllCode

  router.get("/api/get-allcode", getAllcode);

  return app.use("", router);
}
