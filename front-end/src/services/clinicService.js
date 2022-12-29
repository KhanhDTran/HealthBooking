import { instance } from "./instance";

export function createClinicService(
  name,
  provinceId,
  address,
  markdown,
  markdownHtml,
  image
) {
  return instance.post("/create-new-clinic", {
    name,
    provinceId,
    address,
    markdown,
    markdownHtml,
    image,
  });
}

export function getClinicsHome() {
  return instance.post("get-clinic-home");
}
