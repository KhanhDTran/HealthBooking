import { instance } from "./instance";

export function getDoctorSchedule(data) {
  return instance.get("/get-doctor-schedule", { params: data });
}

export function upsertDoctorSchedule(data) {
  return instance.post("/upsert-schedule", { data });
}
