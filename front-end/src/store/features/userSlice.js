import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../actions/userAction";

const initialState = {
  logged_in: false,
  role: "",
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
  },
});
export default userSlice.reducer;
