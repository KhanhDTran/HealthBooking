import Clinic from "../db/schemas/Clinic.js";

export function createClinicService(data) {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.markdown ||
        !data.markdownHtml ||
        !data.image
      ) {
        resolve({ errCode: 1, message: "Missing parameter" });
      } else {
        let checkClinic = await Clinic.findOne({
          name: data.name.trim(),
        });
        if (checkClinic) {
          resolve({ errCode: 2, message: "Clinic already exist" });
        } else {
          let clinic = await Clinic.create({
            name: data.name.trim(),
            address: data.address,
            markdown: data.markdown,
            markdownHtml: data.markdownHtml,
            image: data.img,
          });
          await clinic.save().then(() => {
            console.log("Create clinic success");
            resolve({ errCode: 0, message: "Created clinic successful" });
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
}
