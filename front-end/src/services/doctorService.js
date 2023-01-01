import { instance } from "./instance";

export function getAllDoctors() {
  return instance.get("/get-all-doctors");
}

export function getDoctorById(id) {
  return instance.get("/get-doctor-by-id", { params: { id } });
}

export function upsertDoctorProfile(data) {
  return instance.put("/upsert-doctor-profile", { data });
}

export function getDoctorProfileByUserId(userId) {
  return instance.get("/get-doctor-profile-by-user-id", { params: { userId } });
}

export function getDoctorsHome() {
  return instance.get("/get-doctors-home");
}
