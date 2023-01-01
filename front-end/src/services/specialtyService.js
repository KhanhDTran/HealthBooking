import { instance } from "./instance";

export function createSpecialtyService(name, markdown, markdownHtml, img) {
  return instance.post("/create-specialty", {
    name,
    markdown,
    markdownHtml,
    img,
  });
}

export function getAllSpecialties() {
  return instance.get("get-all-specialties");
}

export function getSpecialtiesHome() {
  return instance.get("get-specialties-home");
}

export function getSpecialtyById(id) {
  return instance.get("get-specialty-by-id", { params: { id } });
}

export function updateSpecialtyById(specialty) {
  return instance.put("/update-specialty-by-id", { specialty });
}

export function deleteSpecialtyById(id) {
  return instance.delete("/delete-specialty-by-id", { params: { id } });
}
