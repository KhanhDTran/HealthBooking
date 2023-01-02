import { delay } from "../utils/commonUtils.js";
import { upsertScheduleService, getDoctorScheduleService } from "../services/scheduleService.js";

export async function getDoctorSchedule(req, res) {
  try {
    let response = await getDoctorScheduleService(req.query);
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-clinic-by-id-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function upsertSchedule(req, res) {
  try {
    await delay(1000);
    let response = await upsertScheduleService(req.body.data);
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-clinic-by-id-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}
