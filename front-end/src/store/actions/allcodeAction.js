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
