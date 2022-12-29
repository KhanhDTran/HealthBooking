import { createSlice } from "@reduxjs/toolkit";
import { userLogin, fetchCreateUser } from "../actions/userAction";

let logged_in = localStorage.getItem("logged_in")
  ? JSON.parse(localStorage.getItem("logged_in"))
  : false;

let role = localStorage.getItem("role")
  ? JSON.parse(localStorage.getItem("role"))
  : "";

let user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  logged_in,
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
        state.logged_in = true;
        state.role = payload.user.role;
      }
    });
    builder.addCase(fetchCreateUser.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.createUserSuccess = !state.createUserSuccess;
      }
    });
  },
});
export default userSlice.reducer;
