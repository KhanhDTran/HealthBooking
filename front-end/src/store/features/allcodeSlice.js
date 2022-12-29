import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProvinceOptions,
  fetchCreateUserOptions,
} from "../actions/allcodeAction";

const initialState = {
  time: [],
  provinces: [],
  roles: [],
  status: [],
  positions: [],
  genders: [],
  payment: [],
  price: [],
};

const allcodeSlice = createSlice({
  name: "allcode",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchProvinceOptions.fulfilled, (state, { payload }) => {
      if (payload) {
        state.provinces = payload;
      }
    });
    builder.addCase(fetchCreateUserOptions.fulfilled, (state, { payload }) => {
      if (payload) {
        state.roles = payload.roles;
        state.positions = payload.positions;
        state.genders = payload.genders;
      }
    });
  },
});
export default allcodeSlice.reducer;
