import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateClinic,
  fetchDeleteClinic,
  fetchUpdateClinic,
} from "../actions/clinicAction";

const initialState = {
  createClinicSuccess: false,
  updateClinicSuccess: false,
  deleteClinicSuccess: false,
};

const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateClinic.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.createClinicSuccess = !state.createClinicSuccess;
      }
    });
    builder.addCase(fetchDeleteClinic.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.deleteClinicSuccess = !state.deleteClinicSuccess;
      }
    });
    builder.addCase(fetchUpdateClinic.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.deleteClinicSuccess = !state.deleteClinicSuccess;
      }
    });
  },
});

export default clinicSlice.reducer;
