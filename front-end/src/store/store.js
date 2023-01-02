import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import specialtyReducer from "./features/specialtySlice";
import clinicReducer from "./features/clinicSlice";
import allcodeReducer from "./features/allcodeSlice";
import doctorReducer from "./features/doctorSlice";
import scheduleReducer from "./features/scheduleSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    clinic: clinicReducer,
    allcode: allcodeReducer,
    specialty: specialtyReducer,
    doctor: doctorReducer,
    schedule: scheduleReducer,
  },
});

export default store;
