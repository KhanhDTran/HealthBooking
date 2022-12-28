import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import specialtyReducer from "./features/specialtySlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    specialty: specialtyReducer,
  },
});

export default store;
