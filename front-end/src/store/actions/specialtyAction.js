import {
  createSpecialtyService,
  updateSpecialtyById,
  deleteSpecialtyById,
  getAllSpecialties,
} from "../../services/specialtyService";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSpecialtyOptions = createAsyncThunk(
  "specialty/get-options",
  async () => {
    try {
      let result = [];
      let res = await getAllSpecialties();
      if (res && res.data.errCode === 0) {
        let specialties = res.data.specialties;
        specialties.map((item) => {
          result.push({ value: item._id, label: item.name });
        });
      }
      return result;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchDeleteSpecialty = createAsyncThunk(
  "specialty/delete",
  async ({ id }) => {
    try {
      const toastId = toast.loading("Updating speacilty...");
      let res = await deleteSpecialtyById(id);
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

export const fetchUpdateSpecialty = createAsyncThunk(
  "specialty/update",
  async ({ specialty }) => {
    try {
      const id = toast.loading("Updating speacilty...");
      let res = await updateSpecialtyById(specialty);
      if (res && res.data.errCode === 0) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(id, {
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

export const fetchCreateSpecialty = createAsyncThunk(
  "specialty/create",
  async ({ name, markdown, markdownHtml, img }) => {
    try {
      const id = toast.loading("Creating speacilty...");
      let res = await createSpecialtyService(name, markdown, markdownHtml, img);
      if (res && res.data.errCode === 0) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(id, {
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
