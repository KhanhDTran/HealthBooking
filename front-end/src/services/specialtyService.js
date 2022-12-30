import { instance } from "./instance";

export function createSpecialtyService(name, markdown, markdownHtml, img) {
  return instance.post("/create-specialty", {
    name,
    markdown,
    markdownHtml,
    img,
  });
}

export function getSpecialtiesHome() {
  return instance.get("get-all-specialty");
}

export function getSpecialtyById(id) {
  return instance.get("get-specialty-by-id", { params: { id } });
}
