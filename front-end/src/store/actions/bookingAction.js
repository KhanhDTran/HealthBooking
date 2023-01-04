import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBooking,
  confirmBooking,
  resendVerification,
} from "../../services/bookingService";

export const fetchResendVerification = createAsyncThunk(
  "booking/resend-verification",
  async (data) => {
    try {
      const toastId = toast.loading("Resending verification...");
      let res = await resendVerification(data);
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

export const fetchConfirmBooking = createAsyncThunk(
  "booking/confirm",
  async (data) => {
    try {
      const toastId = toast.loading("Verify booking...");
      let res = await confirmBooking(data);
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

export const fetchCreateBooking = createAsyncThunk(
  "booking/create",
  async (data) => {
    try {
      const toastId = toast.loading("Creating booking...");
      let res = await createBooking(data);
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
