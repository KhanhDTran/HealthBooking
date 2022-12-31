import Specialty from "../db/schemas/Specialty.js";

export function getSpecialtyByIdService(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) resolve({ errCode: 1, message: "Missing parameter" });
    try {
      let specialty = await Specialty.findOne({ _id: id });
      if (specialty) resolve({ errCode: 0, specialty });
      resolve({ errCode: 2, message: "Something was wrong" });
    } catch (e) {
      reject(e);
    }
  });
}

export function updateSpecialtyByIdService(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) resolve({ errCode: 1, message: "missing parameter" });
      let user = await Specialty.findByIdAndUpdate(
        { _id: data.id },
        {
          name: data.name,
          markdown: data.markdown,
          markdownHtml: data.markdownHtml,
          image: data.image,
        }
      );
      if (user) {
        resolve({
          errCode: 0,
          message: "Updated Specialty Successful",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Something was wrong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function deleteSpecialtyByIdService(id) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) resolve({ errCode: 1, message: "Missing parameter" });
      await Specialty.findByIdAndDelete({ _id: id });
      resolve({ errCode: 0, message: "Deleted Specialty Successful" });
    } catch (e) {
      reject(e);
    }
  });
}

export function createSpecialtyService(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.markdown || !data.markdownHtml || !data.img) {
        resolve({ errCode: 1, message: "Missing parameter" });
      } else {
        let checkSpecialty = await Specialty.findOne({
          name: data.name.trim(),
        });
        if (checkSpecialty) {
          resolve({ errCode: 2, message: "Specialty already exist" });
        } else {
          let specialty = await Specialty.create({
            name: data.name.trim(),
            markdown: data.markdown,
            markdownHtml: data.markdownHtml,
            image: data.img,
          });
          await specialty.save().then(() => {
            console.log("Create specialty success");
            resolve({ errCode: 0, message: "Created specialty successful" });
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function getSpecialtyHomeService() {
  return new Promise(async (resolve, reject) => {
    try {
      let specialties = await Specialty.find({});
      if (specialties) {
        resolve({ errCode: 0, specialties });
      }
    } catch (e) {
      reject(e);
    }
  });
}
