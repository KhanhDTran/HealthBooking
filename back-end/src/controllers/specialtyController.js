import {
  createSpecialtyService,
  getSpecialtyHomeService,
} from "../services/specialtyService.js";
import { delay } from "../utils/commonUtils.js";

export async function createSpecialty(req, res) {
  try {
    await delay(1000);
    let response = await createSpecialtyService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("create-specialty-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function getSpecialtyHome(req, res) {
  try {
    let response = await getSpecialtyHomeService();
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-specialty-home-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}
