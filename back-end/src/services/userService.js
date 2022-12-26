import bcrypt from "bcrypt";
import User from "../db/schemas/User.js";
import { now } from "mongoose";
let saltRounds = 10;

export function createUserService(data) {
  console.log("crreate user req.body.data: ", data);
  return new Promise(async (resolve, reject) => {
    if (
      !data.email ||
      !data.password ||
      !data.firstName ||
      !data.lastName ||
      !data.address ||
      !data.role
    ) {
      resolve({ errCode: 1, message: "Missing Parameter" });
    }
    try {
      let checkUser = await User.findOne({ email: data.email });
      if (!checkUser) {
        let password = hashPassword(data.password);
        let user = await User.create({
          email: data.email,
          password: password,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          address: data.address,
          phoneNumber: data.phoneNumber,
          role: data.role,
          position: data.position,
          createdAt: Date.now(),
          updateAt: Date.now(),
        });
        user.save().then(() => console.log("created a user, ", user));
        resolve({ errCode: 0, message: "Created user successful" });
      } else {
        resolve({ errCode: 2, message: "User already exist" });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function loginService(data) {
  console.log("login req.body.data: ", data);
  return new Promise(async (resolve, reject) => {
    if (!data.email || !data.password) {
      resolve({ errCode: 1, message: "Missing Parameter" });
    }
    try {
      let user = await User.findOne({ email: data.email });
      if (!user) {
        resolve({ errCode: 2, message: "User not exist" });
      } else {
        if (bcrypt.compareSync(data.password, user.password)) {
          delete user._doc.password;
          user._doc.token = "token";
          resolve({ errCode: 0, message: "Login Success", data: user });
        } else {
          resolve({ errCode: 3, message: "Wrong password" });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
}

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
