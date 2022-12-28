import expess from "express";
import { createUser, login } from "../controllers/useController.js";
import { createSpecialty } from "../controllers/specialtyController.js";

let router = expess.Router();

export function webRoute(app) {
  router.get("/users", (req, res) => {
    res.send("users page");
  });

  router.post("/api/login", login);

  // User
  router.post("/api/create-user", createUser);

  //Specialty
  router.post("/api/create-specialty", createSpecialty);
  return app.use("", router);
}
