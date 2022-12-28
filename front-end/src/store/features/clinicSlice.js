import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateClinic } from "../actions/clinicAction";

const initialState = {
  createClinicSuccess: false,
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
  },
});
export default clinicSlice.reducer;
