import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUpsertDoctorProfile,
  fetchAllDoctors,
} from "../actions/doctorAction";

const initialState = {
  upsertDoctorProfile: false,
  doctors: [],
  doctorOptionsRedux: [],
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUpsertDoctorProfile.fulfilled,
      (state, { payload }) => {
        if (payload.errCode === 0) {
          state.upsertDoctorProfile = !state.upsertDoctorProfile;
        }
      }
    );
    builder.addCase(fetchAllDoctors.fulfilled, (state, { payload }) => {
      if (payload) {
        state.doctors = payload.doctors;
        state.doctorOptionsRedux = payload.doctorOptions;
      }
    });
  },
});

export default doctorSlice.reducer;
