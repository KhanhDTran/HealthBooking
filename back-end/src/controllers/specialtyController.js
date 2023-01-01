import {
  createSpecialtyService,
  getSpecialtyHomeService,
  deleteSpecialtyByIdService,
  updateSpecialtyByIdService,
  getSpecialtyByIdService,
  getAllSpecialtiesService
} from "../services/specialtyService.js";
import { delay } from "../utils/commonUtils.js";

export async function getSpecialtyById(req, res) {
  try {
    let response = await getSpecialtyByIdService(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-specialty-by-id-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function deleteSpecialtyById(req, res) {
  try {
    await delay(1000);
    let response = await deleteSpecialtyByIdService(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    console.log("delete-specialty-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function updateSpecialtyById(req, res) {
  try {
    await delay(1000);
    let response = await updateSpecialtyByIdService(req.body.specialty);
    return res.status(200).json(response);
  } catch (e) {
    console.log("update-specialty-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

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

export async function getAllSpecialties(req, res) {
  try {
    let response = await getAllSpecialtiesService();
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-specialty-home-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}
