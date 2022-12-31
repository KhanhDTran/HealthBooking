import { delay } from "../utils/commonUtils.js";

import {
  upsertDoctorProfileService,
  getDoctorProfileByUserIdService,
} from "../services/doctorService.js";

export async function getDoctorProfileByUserId(req, res) {
  try {
    let response = await getDoctorProfileByUserIdService(req.query.userId);
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-doctor-profile-by-user-id-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function upsertDoctorProfile(req, res) {
  try {
    await delay(1000);
    let response = await upsertDoctorProfileService(req.body.data);
    return res.status(200).json(response);
  } catch (e) {
    console.log("upsert-doctor-profile-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}
