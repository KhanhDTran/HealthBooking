import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { upsertDoctorProfile } from "../../services/doctorService";

export const fetchUpsertDoctorProfile = createAsyncThunk(
  "doctor/upsert",
  async (data) => {
    try {
      const toastId = toast.loading("Upserting Doctor Profile...");
      let res = await upsertDoctorProfile(data);
      console.log(res);
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
