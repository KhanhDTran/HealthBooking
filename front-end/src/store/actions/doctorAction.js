import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  upsertDoctorProfile,
  getAllDoctors,
} from "../../services/doctorService";

export const fetchAllDoctors = createAsyncThunk(
  "doctor/get-doctors",
  async () => {
    try {
      let doctors = [];
      let doctorOptions = [];
      let res = await getAllDoctors();
      if (res && res.data.errCode === 0) {
        doctors = res.data.doctors;
        doctors.map((item) => {
          doctorOptions.push({
            value: item._id,
            label:
              item.position.value +
              " " +
              item.user.firstName +
              " " +
              item.user.lastName,
          });
        });
      }
      return { doctors, doctorOptions };
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchUpsertDoctorProfile = createAsyncThunk(
  "doctor/upsert",
  async (data) => {
    try {
      const toastId = toast.loading("Upserting Doctor Profile...");
      let res = await upsertDoctorProfile(data);
      if (res && res.data.errCode === 0) {
        toast.update(toastId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: res.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);
