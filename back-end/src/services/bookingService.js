import Booking from "../db/schemas/Booking.js";
import Patient from "../db/schemas/Patient.js";
import User from "../db/schemas/User.js";
import { createUserService } from "./userService.js";
import { genOtp, verifyOtp } from "./otpService.js";
import { sendVerifyCodeEmail, sendEmailBookingDetail } from "./emailService.js";

export function resendVerificationService(data) {
  if (!data.email || !data.firstName || !data.lastName)
    return { errCode: 1, message: "Missing parameter" };
  return new Promise(async (resolve, reject) => {
    try {
      let token = genOtp(data.email);
      await sendVerifyCodeEmail({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        token,
      });
      resolve({ errCode: 0, message: "Resent verification code " });
    } catch (e) {
      reject(e);
    }
  });
}
export function confirmBookingService(data) {
  console.log(data);
  if (
    !data.email ||
    !data.firstName ||
    !data.lastName ||
    !data.status ||
    !data.date ||
    !data.time ||
    !data.doctor ||
    !data.token ||
    !data.patient
  )
    return { errCode: 1, message: "Missing parameter" };
  return new Promise(async (resolve, reject) => {
    try {
      let verify = verifyOtp(data.token, data.email);
      if (verify) {
        await Booking.findOneAndUpdate(
          {
            doctor: data.doctor._id,
            patient: data.patient,
            time: data.time.time._id,
            date: data.date,
          },
          { status: data.status }
        );
        await sendEmailBookingDetail(data);
        resolve({
          errCode: 0,
          message: "Booking had been verified. Thank You!!!",
        });
      } else {
        resolve({ errCode: 2, message: "Wrong verification code" });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function createBookingService(data) {
  // console.log(data);
  if (
    !data.email ||
    !data.firstName ||
    !data.lastName ||
    !data.gender ||
    !data.address ||
    !data.phoneNumber ||
    !data.role ||
    !data.province ||
    !data.doctor ||
    !data.age ||
    !data.status ||
    !data.date ||
    !data.time ||
    !data.doctor
  )
    return { errCode: 1, message: "Missing parameter" };
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ email: data.email }, "_id");
      let patient;
      if (!user) {
        let res = await createUserService({
          email: data.email,
          password: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          address: data.address,
          phoneNumber: data.phoneNumber,
          role: data.role,
        });
        let newPatient = await Patient.create({
          user: res.user,
          province: data.province,
          age: data.age,
        });
        patient = newPatient._id;
      } else {
        let checkPatient = await Patient.findOneAndUpdate(
          { user: user._id },
          { province: data.province, age: data.age },
          { new: true, upsert: true }
        );
        patient = checkPatient._id;
      }
      let checkBooking = await Booking.findOne({
        doctor: data.doctor,
        patient: patient,
        time: data.time,
        date: data.date,
        status: data.status,
      });
      if (checkBooking) {
        resolve({
          errCode: 0,
          message: "Booking already been created, waiting for verify",
        });
      } else {
        let booking = await Booking.create({
          doctor: data.doctor,
          patient: patient,
          time: data.time,
          date: data.date,
          status: data.status,
          reason: data.reason,
        });
        if (booking) {
          let token = genOtp(data.email);
          await sendVerifyCodeEmail({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            token,
          });
          resolve({ errCode: 0, message: "Booking created", patient });
        } else {
          resolve({ errCode: 3, message: "Something was wrong" });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
}
