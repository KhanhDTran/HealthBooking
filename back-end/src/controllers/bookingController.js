import { delay } from "../utils/commonUtils.js";
import {
  createBookingService,
  confirmBookingService,
  resendVerificationService,
} from "../services/bookingService.js";

export async function resendVerification(req, res) {
  try {
    let response = await resendVerificationService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("resend verification booking error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function confirmBooking(req, res) {
  try {
    let response = await confirmBookingService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("confirm booking error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

export async function createBooking(req, res) {
  try {
    let response = await createBookingService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("create booking error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}
