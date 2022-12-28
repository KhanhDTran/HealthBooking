import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateClinic } from "../actions/clinicAction";

const initialState = {
  createSuccess: 0,
};

const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateClinic.fulfilled, (state, { payload }) => {
      if (payload.errCode === 0) {
        state.createSuccess += 1;
      }
    });
  },
});
export default clinicSlice.reducer;
