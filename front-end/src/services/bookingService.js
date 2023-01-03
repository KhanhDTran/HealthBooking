import { instance } from "./instance";

export function createBooking(data) {
  return instance.post(`/create-booking`, data);
}
