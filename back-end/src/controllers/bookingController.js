import { delay } from "../utils/commonUtils.js";
import { createBookingService } from "../services/bookingService.js";

export async function createBooking(req, res) {
  try {
    await delay(1000);
    let response = await createBookingService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-clinic-by-id-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}
