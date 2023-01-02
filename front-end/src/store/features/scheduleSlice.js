import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUpsertSchedule,
  fetchDoctorSchedule,
} from "../actions/scheduleAction";

const initialState = {
  upsertScheduleSuccess: false,
  schedules: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpsertSchedule.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.upsertScheduleSuccess = !state.upsertScheduleSuccess;
      }
    });

    builder.addCase(fetchDoctorSchedule.fulfilled, (state, { payload }) => {
      if (payload) {
        state.schedules = payload;
      }
    });
  },
});

export default scheduleSlice.reducer;
