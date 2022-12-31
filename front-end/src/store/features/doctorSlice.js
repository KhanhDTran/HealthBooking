import { createSlice } from "@reduxjs/toolkit";
import { fetchUpsertDoctorProfile } from "../actions/doctorAction";

const initialState = {
  upsertDoctorProfile: false,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpsertDoctorProfile.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.upsertDoctorProfile = !state.upsertDoctorProfile;
      }
    });
  },
});

export default doctorSlice.reducer;
