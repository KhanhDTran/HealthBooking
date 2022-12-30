import { instance } from "./instance";

export function createClinicService(
  name,
  province,
  address,
  markdown,
  markdownHtml,
  image
) {
  return instance.post("/create-new-clinic", {
    name,
    province,
    address,
    markdown,
    markdownHtml,
    image,
  });
}

export function getClinicsHome() {
  return instance.get("/get-all-clinic");
}

export function getClinicById(id) {
  return instance.get("get-clinic-by-id", { params: { id } });
}

export function updateClinicById(clinic) {
  return instance.put("/update-clinic-by-id", {
    id: clinic.id,
    clinic,
  });
}

export function deleteClinicById(id) {
  return instance.delete("/delete-clinic-by-id", { params: { id } });
}
