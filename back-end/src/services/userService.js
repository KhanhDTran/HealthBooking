import bcrypt from "bcrypt";
import User from "../db/schemas/User.js";
import doten from "dotenv";
// import jwt from "jsonwebtoken";
doten.config();
let saltRounds = 10;

export function getAllDoctorUserService() {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = [];
      await User.find({}, "-password")
        .populate("role", "keyMap")
        .exec()
        .then((docs) => {
          docs.map((item) => {
            if (item.role.keyMap === "R2") {
              doctors.push(item);
            }
          });
        });
      if (doctors) {
        resolve({ errCode: 0, doctors });
      } else {
        resolve({ errCode: 2, message: "No Doctor Found" });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function updateUserService(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findByIdAndUpdate(
        { _id: data.id },
        {
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          address: data.address,
          phoneNumber: data.phoneNumber,
          role: data.role,
        }
      );
      if (user) {
        resolve({
          errCode: 0,
          message: "Updated User Successful",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Something was wrong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function deleteUserService(id) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) resolve({ errCode: 1, message: "Missing parameter" });
      await User.findByIdAndDelete({ _id: id });
      resolve({ errCode: 0, message: "Deleted User Successful" });
    } catch (e) {
      reject(e);
    }
  });
}

export function getUserservice(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await User.find().populate([
        { path: "role" },
        { path: "position" },
        { path: "gender" },
      ]);
      resolve({ errCode: 0, users });
    } catch (e) {
      reject(e);
    }
  });
}

export function createUserService(data) {
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
  return new Promise(async (resolve, reject) => {
    if (!data.email || !data.password) {
      resolve({ errCode: 1, message: "Missing Parameter" });
    }
    try {
      let user = await User.findOne({ email: data.email }, [
        "id",
        "password",
        "email",
        "role",
        "lastName",
      ]).populate([{ path: "role" }]);
      if (!user) {
        resolve({ errCode: 2, message: "User not exist" });
      } else {
        if (bcrypt.compareSync(data.password, user.password)) {
          delete user._doc.password;
          resolve({
            errCode: 0,
            message: "Login Success",
            user: user,
          });
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
