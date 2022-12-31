import { createClinicService, deleteClinicById, updateClinicById } from "../../services/clinicService";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDeleteClinic = createAsyncThunk(
  "clinic/delete",
  async (id) => {
    try {
      const toastId = toast.loading("Deleting clinic...");
      let res = await deleteClinicById(id);
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
export const fetchUpdateClinic = createAsyncThunk(
  "clinic/update",
  async ({ clinic }) => {
    try {
      const id = toast.loading("Updating clinic...");
      let res = await updateClinicById(clinic);
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

export const fetchCreateClinic = createAsyncThunk(
  "clinic/create",
  async ({ name, province, address, markdown, markdownHtml, image }) => {
    try {
      const id = toast.loading("Creating clinic...");
      let res = await createClinicService(
        name,
        province,
        address,
        markdown,
        markdownHtml,
        image
      );
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
