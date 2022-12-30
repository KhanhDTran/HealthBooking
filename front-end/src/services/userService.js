import { instance } from "./instance";

export function updateUserById(user) {
  return instance.put("/update-user-by-id", { id: user.id, user });
}

export function deleteUserById(id) {
  return instance.delete("/delete-user-by-id", { params: { id } });
}

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
