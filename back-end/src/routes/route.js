import expess from "express";
import {
  createUser,
  login,
  getUsers,
  deleteUserById,
  updateUserById,
  getAllDoctorUser,
} from "../controllers/userController.js";
import {
  createSpecialty,
  getSpecialtyHome,
  deleteSpecialtyById,
  updateSpecialtyById,
  getSpecialtyById,
  getAllSpecialties,
} from "../controllers/specialtyController.js";

import {
  createClinic,
  getClinicHome,
  deleteClinicById,
  updateClinicById,
  getclinicById,
} from "../controllers/clinicController.js";
import { getAllcode } from "../controllers/allcodeController.js";

import {
  upsertDoctorProfile,
  getDoctorProfileByUserId,
  getDoctorHome,
  getDoctorById,
  getAllDoctors,
} from "../controllers/doctorController.js";

import {
  upsertSchedule,
  getDoctorSchedule,
} from "../controllers/scheduleController.js";

import {
  createBooking,
  confirmBooking,
  resendVerification
} from "../controllers/bookingController.js";

let router = expess.Router();

export function webRoute(app) {
  router.get("/users", (req, res) => {
    res.send("users page");
  });

  // Booking
  router.post("/api/create-booking", createBooking);
  router.post("/api/confirm-booking", confirmBooking);
  router.post("/api/resend-verification", resendVerification)

  // Schedule
  router.post("/api/upsert-schedule", upsertSchedule);
  router.get("/api/get-doctor-schedule", getDoctorSchedule);

  // User

  router.get("/api/get-users", getUsers);
  router.post("/api/create-user", createUser);
  router.post("/api/login", login);
  router.delete("/api/delete-user-by-id", deleteUserById);
  router.put("/api/update-user-by-id", updateUserById);
  router.get("/api/get-all-doctor-users", getAllDoctorUser);

  //Doctor
  router.get("/api/get-doctor-by-id", getDoctorById);
  router.get("/api/get-all-doctors", getAllDoctors);
  router.get("/api/get-doctors-home", getDoctorHome);
  router.get("/api/get-doctor-profile-by-user-id", getDoctorProfileByUserId);
  router.put("/api/upsert-doctor-profile", upsertDoctorProfile);

  //Specialty

  router.get("/api/get-all-specialties", getAllSpecialties);
  router.get("/api/get-specialty-by-id", getSpecialtyById);
  router.get("/api/get-specialties-home", getSpecialtyHome);
  router.post("/api/create-specialty", createSpecialty);
  router.delete("/api/delete-specialty-by-id", deleteSpecialtyById);
  router.put("/api/update-specialty-by-id", updateSpecialtyById);

  //Clinic

  router.get("/api/get-clinic-by-id", getclinicById);
  router.get("/api/get-all-clinic", getClinicHome);
  router.post("/api/create-new-clinic", createClinic);
  router.delete("/api/delete-clinic-by-id", deleteClinicById);
  router.put("/api/update-clinic-by-id", updateClinicById);

  //AllCode

  router.get("/api/get-allcode", getAllcode);

  return app.use("", router);
}
