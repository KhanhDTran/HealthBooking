import { getAllcode } from "../../services/allcodeService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProvinceOptions = createAsyncThunk(
  "allcode/province",
  async () => {
    try {
      let result = [];
      let res = await getAllcode(["PROVINCE"]);
      if (res && res.data.errCode === 0) {
        let provinces = res.data.allcodes;
        provinces.map((item) => {
          if (item.type) result.push({ value: item._id, label: item.value });
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
      let positions = [];
      let res = await getAllcode(["GENDER", "ROLE", "POSITION"]);
      console.log(res);
      if (res && res.data.errCode === 0) {
        let provinces = res.data.allcodes;
        provinces.map((item) => {
          if (item.type === "ROLE")
            roles.push({ value: item._id, label: item.value });
          if (item.type === "POSITION")
            positions.push({ value: item._id, label: item.value });
          if (item.type === "GENDER")
            genders.push({ value: item._id, label: item.value });
        });
      }
      return { genders, roles, positions };
    } catch (e) {
      console.log(e);
    }
  }
);
