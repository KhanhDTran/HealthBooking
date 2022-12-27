import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export function loginService(email, password) {
  return instance.post("/login", { email: email, password: password });
}
