import { instance } from "./instance";

export function resendVerification(data) {
  return instance.post(`/resend-verification`, data);
}

export function confirmBooking(data) {
  return instance.post(`/confirm-booking`, data);
}

export function createBooking(data) {
  return instance.post(`/create-booking`, data);
}
