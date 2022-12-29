import { instance } from "./instance";

export function getAllcode(types) {
  return instance.get(`/get-allcode`, {
    params: {
      types,
    },
  });
}
