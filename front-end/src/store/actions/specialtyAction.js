import { createSpecialtyService } from "../../services/specialtyService";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
