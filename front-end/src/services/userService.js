import { instance } from "./instance";

export function loginService(email, password) {
  return instance.post("/login", { email, password });
}

export function getAllUsers() {
  return instance.get("/get-users", {});
}

export function createUser(
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  address,
  role,
  position,
  gender,
  image
) {
  return instance.post("/create-user", {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    address,
    role,
    position,
    gender,
    image,
  });
}
