import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { upsertDoctorSchedule } from "../../services/scheduleService";

export const fetchUpsertSchedule = createAsyncThunk(
  "schedule/upsert",
  async (data) => {
    try {
      const toastId = toast.loading("Saving Schedule...");
      let res = await upsertDoctorSchedule(data);
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
