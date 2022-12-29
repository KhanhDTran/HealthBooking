import { createClinicService } from "../../services/clinicService";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCreateClinic = createAsyncThunk(
  "clinic/create",
  async ({ name, provinceId, address, markdown, markdownHtml, image }) => {
    try {
      const id = toast.loading("Creating clinic...");
      let res = await createClinicService(
        name,
        provinceId,
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
