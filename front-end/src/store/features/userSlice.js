import { createSlice } from "@reduxjs/toolkit";
import { userLogin, fetchCreateUser, userLogout } from "../actions/userAction";

let role = localStorage.getItem("role")
  ? JSON.parse(localStorage.getItem("role"))
  : "";

let user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  logged_in: false,
  role,
  user,
  createUserSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      if (payload.user) {
        state.logged_in = !state.logged_in;
        state.role = payload.user.role;
        state.user = payload.user;
      }
    });
    builder.addCase(fetchCreateUser.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.createUserSuccess = !state.createUserSuccess;
      }
    });
    builder.addCase(userLogout.fulfilled, (state, { payload }) => {
      state.logged_in = !state.logged_in;
      state.user = null;
    });
  },
});
export default userSlice.reducer;
