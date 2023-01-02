import { createSlice } from "@reduxjs/toolkit";
import { fetchUpsertSchedule } from "../actions/scheduleAction";

const initialState = {
  upsertScheduleSuccess: false,
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
  },
});

export default scheduleSlice.reducer;
