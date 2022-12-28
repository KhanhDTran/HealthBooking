import { instance } from "./instance";

export function getAllcode(types) {
  return instance.post("/get-allcode", { types });
}
