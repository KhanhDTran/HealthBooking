import {
  createClinicService,
  getClinicHomeService,
  deleteClinicByIdService,
  updateClinicByIdService,
  getclinicByIdService,
} from "../services/clinicService.js";
import { delay } from "../utils/commonUtils.js";

export async function getclinicById(req, res) {
  try {
    let response = await getclinicByIdService(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-clinic-by-id-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function deleteClinicById(req, res) {
  try {
    await delay(1000);
    let response = await deleteClinicByIdService(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    console.log("delete-specialty-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function updateClinicById(req, res) {
  try {
    await delay(1000);
    let response = await updateClinicByIdService(req.body.clinic);
    return res.status(200).json(response);
  } catch (e) {
    console.log("update-specialty-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

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
