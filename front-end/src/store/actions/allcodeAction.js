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
      let res = await getAllcode(["GENDER", "ROLE"]);
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
