import { instance } from "./instance";

export function createSpecialtyService(name, markdown, markdownHtml, img) {
  return instance.post("/create-specialty", {
    name,
    markdown,
    markdownHtml,
    img,
  });
}
