import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateBooking,
  fetchConfirmBooking,
  fetchResendVerification,
} from "../actions/bookingAction";

const initialState = {
  createBookingSuccess: false,
  confirmBookingSuccess: false,
  resendVerificationSuccess: false,
  patient: {},
};

const specialtySlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResendVerification.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.resendVerificationSuccess = !state.resendVerificationSuccess;
      }
    });

    builder.addCase(fetchConfirmBooking.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.confirmBookingSuccess = !state.confirmBookingSuccess;
      }
    });

    builder.addCase(fetchCreateBooking.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.createBookingSuccess = !state.createBookingSuccess;
        state.patient = payload.patient;
      }
    });
  },
});
export default specialtySlice.reducer;
