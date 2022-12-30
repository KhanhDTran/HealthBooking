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
