import {
  createClinicService,
  getClinicHomeService,
} from "../services/clinicService.js";
import { delay } from "../utils/commonUtils.js";

export async function createClinic(req, res) {
  try {
    await delay(1000);
    let response = await createClinicService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("create-clinic-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function getClinicHome(req, res) {
  try {
    let response = await getClinicHomeService();
    return res.status(200).json(response);
  } catch (e) {
    console.log("create-clinic-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}
