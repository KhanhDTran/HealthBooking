import { instance } from "./instance";

export function loginService(email, password) {
  return instance.post("/login", { email: email, password: password });
}
