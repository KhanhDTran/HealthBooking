import { instance } from "./instance";

export function createClinicService(
  name,
  address,
  markdown,
  markdownHtml,
  image
) {
  return instance.post("/create-new-clinic", {
    name,
    address,
    markdown,
    markdownHtml,
    image,
  });
}

export function getClinicsHome() {
  return instance.get("get-clinic-home");
}
