import { instance } from "./instance";

export function upsertDoctorProfile(data) {
  return instance.put("/upsert-doctor-profile", { data });
}

export function getDoctorProfileByUserId(userId) {
  return instance.get("/get-doctor-profile-by-user-id", { params: { userId } });
}
