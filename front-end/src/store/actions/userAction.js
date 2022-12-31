import {
  loginService,
  createUser,
  deleteUserById,
  updateUserById,
} from "../../services/userService";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUpdateUser = createAsyncThunk(
  "user/update",
  async ({ user }) => {
    try {
      const toastId = toast.loading("Updating User...");
      let res = await updateUserById(user);
      if (res && res.data.errCode === 0) {
        toast.update(toastId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: res.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchDeleteUser = createAsyncThunk(
  "user/delete",
  async ({ id }) => {
    try {
      const toastId = toast.loading("Deleting User...");
      let res = await deleteUserById(id);
      if (res && res.data.errCode === 0) {
        toast.update(toastId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: res.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchCreateUser = createAsyncThunk(
  "user/create",
  async ({
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
  }) => {
    try {
      const id = toast.loading("Create User...");
      let res = await createUser(
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
      );
      if (res && res.data.errCode === 0) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(id, {
          render: res.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const id = toast.loading("Loging in...");
      let res = await loginService(email, password);
      if (res && res.data.errCode === 0) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("role", JSON.stringify(res.data.user.role.keyMap));
        localStorage.setItem("logged_in", true);
        toast.update(id, {
          render:
            "Welcome " +
            res.data.user.role.value +
            " " +
            res.data.user.lastName,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(id, {
          render: res.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }

      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const userLogout = createAsyncThunk("user/logout", async () => {
  localStorage.clear();

  return {};
});
