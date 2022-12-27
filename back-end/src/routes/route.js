import expess from "express";
import { createUser, login } from "../controllers/useController.js";

let router = expess.Router();

export function webRoute(app) {
  router.get("/users", (req, res) => {
    res.send("users page");
  });

  router.post("/api/login", login);

  router.post("/api/create-user", createUser);

  return app.use("", router);
}
