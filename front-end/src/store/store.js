import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import specialtyReducer from "./features/specialtySlice";
import clinicReducer from "./features/clinicSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    clinic: clinicReducer,
    specialty: specialtyReducer,
  },
});

export default store;
