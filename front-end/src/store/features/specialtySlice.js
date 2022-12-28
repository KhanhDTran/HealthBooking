import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateSpecialty } from "../actions/specialtyAction";

const initialState = {
  createSpecialtySuccess: false,
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
  },
});
export default specialtySlice.reducer;
