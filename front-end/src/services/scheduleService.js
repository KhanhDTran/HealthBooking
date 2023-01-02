import { instance } from "./instance";

export function upsertDoctorSchedule(data) {
  return instance.post("/upsert-schedule", { data });
}
