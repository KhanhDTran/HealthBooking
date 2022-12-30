import {
  createUserService,
  loginService,
  getUserservice,
  deleteUserService,
  updateUserService,
} from "../services/userService.js";
import { delay } from "../utils/commonUtils.js";

export async function deleteUserById(req, res) {
  try {
    await delay(1000);
    let response = await deleteUserService(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    console.log("delete-user-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}
export async function updateUserById(req, res) {
  try {
    await delay(1000);
    let response = await updateUserService(req.body.user);
    return res.status(200).json(response);
  } catch (e) {
    console.log("update-user-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function getUsers(req, res) {
  try {
    let response = await getUserservice(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-user-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function createUser(req, res) {
  try {
    await delay(1000);
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
