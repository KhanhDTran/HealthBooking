import { createUserService, loginService } from "../services/userService.js";

export async function createUser(req, res) {
  try {
    let response = await createUserService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("create-user-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function login(req, res) {
  try {
    await delay(1000);
    let response = await loginService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("login-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};