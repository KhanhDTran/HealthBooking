import { loginService } from "../../services/userService";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const id = toast.loading("Loging in...");
      let res = await loginService(email, password);
      if (res && res.data.errCode === 0) {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("role", JSON.stringify(res.data.user.role));
        localStorage.setItem("logged_in", true);
        toast.update(id, {
          render:
            "Welcome " + res.data.user.role + " " + res.data.user.lastName,
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
      // store user's token in local storage
      //   localStorage.setItem("token", r.userToken);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);
