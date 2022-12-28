import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateSpecialty } from "../actions/specialtyAction";

const initialState = {
  createSuccess: false,
};

const specialtySlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateSpecialty.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.createSuccess = !state.createSuccess;
      }
    });
  },
});
export default specialtySlice.reducer;