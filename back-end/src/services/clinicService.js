import Clinic from "../db/schemas/Clinic.js";

export function getclinicByIdService(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) resolve({ errCode: 1, message: "Missing parameter" });
    try {
      let clinic = await Clinic.findOne({ _id: id }).populate("province");
      if (clinic) resolve({ errCode: 0, clinic });
      resolve({ errCode: 2, message: "Something was wrong" });
    } catch (e) {
      reject(e);
    }
  });
}

export function updateClinicByIdService(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await Clinic.findByIdAndUpdate(
        { _id: data.id },
        {
          name: data.name,
          address: data.address,
          markdown: data.markdown,
          province: data.province,
          markdownHtml: data.markdownHtml,
          image: data.image,
        }
      );
      if (user) {
        resolve({
          errCode: 0,
          message: "Updated Clinic Successful",
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

export function deleteClinicByIdService(id) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) resolve({ errCode: 1, message: "Missing parameter" });
      await Clinic.findByIdAndDelete({ _id: id });
      resolve({ errCode: 0, message: "Deleted Clinic Successful" });
    } catch (e) {
      reject(e);
    }
  });
}

export function createClinicService(data) {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.province ||
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
            province: data.province,
            address: data.address,
            markdown: data.markdown,
            markdownHtml: data.markdownHtml,
            image: data.image,
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

export function getClinicHomeService() {
  return new Promise(async (resolve, reject) => {
    try {
      let clinics = await Clinic.find();
      resolve({ errCode: 0, clinics });
    } catch (e) {
      reject(e);
    }
  });
}
