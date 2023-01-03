import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateBooking } from "../actions/bookingAction";

const initialState = {
  createBookingSuccess: false,
};

const specialtySlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateBooking.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.createBookingSuccess = !state.createBookingSuccess;
      }
    });
  },
});
export default specialtySlice.reducer;
