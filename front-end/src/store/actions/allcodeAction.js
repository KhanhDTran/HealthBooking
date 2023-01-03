import { getAllcode } from "../../services/allcodeService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBookingOptions = createAsyncThunk(
  "allcode/genders",
  async () => {
    try {
      let genders = [];
      let provinces = [];
      let res = await getAllcode(["PROVINCE", "GENDER"]);
      console.log(res);
      if (res && res.data.errCode === 0) {
        let allcode = res.data.allcodes;
        allcode.map((item) => {
          if (item.type === "GENDER")
            genders.push({ value: item._id, label: item.value });
          if (item.type === "PROVINCE")
            provinces.push({ value: item._id, label: item.value });
        });
      }
      return { genders, provinces };
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchTimeSchedule = createAsyncThunk(
  "allcode/doctor-schedule",
  async () => {
    try {
      let times = [];
      let res = await getAllcode(["TIME"]);
      if (res && res.data.errCode === 0) {
        times = res.data.allcodes;
      }
      return { times };
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchManageDoctorsOptions = createAsyncThunk(
  "allcode/manage-doctors",
  async () => {
    try {
      let provinces = [];
      let positions = [];
      let payment = [];
      let price = [];
      let res = await getAllcode(["PROVINCE", "POSITION", "PRICE", "PAYMENT"]);
      if (res && res.data.errCode === 0) {
        let allcode = res.data.allcodes;
        allcode.map((item) => {
          if (item.type === "PROVINCE")
            provinces.push({ value: item._id, label: item.value });
          if (item.type === "POSITION")
            positions.push({ value: item._id, label: item.value });
          if (item.type === "PRICE")
            price.push({ value: item._id, label: item.value });
          if (item.type === "PAYMENT")
            payment.push({ value: item._id, label: item.value });
        });
      }
      return { provinces, positions, payment, price };
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchProvinceOptions = createAsyncThunk(
  "allcode/province",
  async () => {
    try {
      let result = [];
      let res = await getAllcode(["PROVINCE"]);
      if (res && res.data.errCode === 0) {
        let provinces = res.data.allcodes;
        provinces.map((item) => {
          result.push({ value: item._id, label: item.value });
        });
      }
      return result;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchCreateUserOptions = createAsyncThunk(
  "allcode/create-doctor",
  async () => {
    try {
      let genders = [];
      let roles = [];
      let res = await getAllcode(["GENDER", "ROLE", "POSITION"]);
      if (res && res.data.errCode === 0) {
        let result = res.data.allcodes;
        result.map((item) => {
          if (item.type === "ROLE")
            roles.push({ value: item._id, label: item.value });
          if (item.type === "GENDER")
            genders.push({ value: item._id, label: item.value });
        });
      }
      return { genders, roles };
    } catch (e) {
      console.log(e);
    }
  }
);
