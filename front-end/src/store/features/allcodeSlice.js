import { createSlice } from "@reduxjs/toolkit";
import { fetchProvinceOptions } from "../actions/allcodeAction";

const initialState = {
  time: [],
  provinces: [],
  role: [],
  status: [],
  position: [],
  gender: [],
  payment: [],
  price: [],
};

const allcodeSlice = createSlice({
  name: "allcode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProvinceOptions.fulfilled, (state, { payload }) => {
      if (payload) {
        state.provinces = payload;
      }
    });
  },
});
export default allcodeSlice.reducer;
