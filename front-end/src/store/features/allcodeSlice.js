import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProvinceOptions,
  fetchCreateUserOptions,
  fetchManageDoctorsOptions,
  fetchTimeSchedule,
} from "../actions/allcodeAction";

const initialState = {
  times: [],
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
        state.genders = payload.genders;
      }
    });
    builder.addCase(
      fetchManageDoctorsOptions.fulfilled,
      (state, { payload }) => {
        if (payload) {
          state.provinces = payload.provinces;
          state.positions = payload.positions;
          state.payment = payload.payment;
          state.price = payload.price;
        }
      }
    );
    builder.addCase(fetchTimeSchedule.fulfilled, (state, { payload }) => {
      if (payload) {
        state.times = payload.times;
      }
    });
  },
});
export default allcodeSlice.reducer;
