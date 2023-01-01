import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateSpecialty,
  fetchDeleteSpecialty,
  fetchUpdateSpecialty,
  fetchSpecialtyOptions,
} from "../actions/specialtyAction";

const initialState = {
  createSpecialtySuccess: false,
  updateSpecialtySuccess: false,
  deleteSpecialtySuccess: false,
  specialtyOptionsRedux: null,
};

const specialtySlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateSpecialty.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.createSpecialtySuccess = !state.createSpecialtySuccess;
      }
    });
    builder.addCase(fetchUpdateSpecialty.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.updateSpecialtySuccess = !state.updateSpecialtySuccess;
      }
    });
    builder.addCase(fetchDeleteSpecialty.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.deleteSpecialtySuccess = !state.deleteSpecialtySuccess;
      }
    });
    builder.addCase(fetchSpecialtyOptions.fulfilled, (state, { payload }) => {
      if (payload) {
        state.specialtyOptionsRedux = payload;
      }
    });
  },
});
export default specialtySlice.reducer;
