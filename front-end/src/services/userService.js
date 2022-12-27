import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// configure header's Content-Type as JSON
// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// instance.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

export function loginService(email, password) {
  return instance.post("/api/login", { email: email, password: password });
}
