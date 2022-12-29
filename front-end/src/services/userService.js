import { instance } from "./instance";

export function loginService(email, password) {
  return instance.post("/login", { email, password });
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
