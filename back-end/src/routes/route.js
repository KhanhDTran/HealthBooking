import expess from "express";
import { createUser, login, getUsers } from "../controllers/useController.js";
import {
  createSpecialty,
  getSpecialtyHome,
} from "../controllers/specialtyController.js";

import {
  createClinic,
  getClinicHome,
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

  //Specialty
  router.post("/api/create-specialty", createSpecialty);
  router.get("/api/get-specialty-home", getSpecialtyHome);

  //Clinic
  router.post("/api/create-new-clinic", createClinic);
  router.get("/api/get-clinic-home", getClinicHome);

  //AllCode
  router.get("/api/get-allcode", getAllcode);

  return app.use("", router);
}
