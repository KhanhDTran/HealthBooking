import Doctor from "../db/schemas/Doctor.js";

export function getAllDoctorsService() {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await Doctor.find({})
        .populate("user", ["-password"])
        .populate("position", "value")
        .populate("price", "value")
        .populate("payment", "value")
        .populate("specialty", "value");
      if (doctors) {
        resolve({ errCode: 0, doctors });
      } else {
        resolve({ errCode: 1, message: "Found no doctor" });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function getDoctorByIdService(id) {
  if (!id) return { errCode: 1, message: "Missing parameter" };
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await Doctor.findOne({ _id: id })
        .populate("user", ["address", "firstName", "lastName"])
        .populate("position", "value")
        .populate("price", "value")
        .populate("payment", "value")
        .populate("province", "value");
      if (doctor) {
        resolve({ errCode: 0, doctor });
      } else {
        resolve({ errCode: 1, message: "Found no doctor" });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function getDoctorHomeService() {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await Doctor.find({}, ["image"])
        .populate("user", ["firstName", "lastName"])
        .populate("position", "value")
        .populate("specialty", "name")
        .limit(20);
      if (doctors) {
        resolve({ errCode: 0, doctors });
      } else {
        resolve({ errCode: 1, message: "Found no doctor" });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function getDoctorProfileByUserIdService(userId) {
  if (!userId) return { errCode: 1, message: "Missing paramter" };
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await Doctor.findOne({ user: userId })
        .populate("position")
        .populate("price")
        .populate("province")
        .populate("payment")
        .populate("specialty");

      if (doctor) {
        resolve({ errCode: 0, doctor });
      } else {
        resolve({ errCode: 2, message: "Found no doctor" });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function upsertDoctorProfileService(data) {
  console.log(data.specialty);
  if (
    !data.price ||
    !data.position ||
    !data.description ||
    !data.markdown ||
    !data.markdownHtml ||
    !data.user ||
    !data.province ||
    !data.payment ||
    !data.image ||
    !data.specialty
  )
    return { errCode: 1, message: "Missing parameter" };
  return new Promise(async (resolve, reject) => {
    try {
      let filter = { user: data.user };
      let update = {
        position: data.position,
        description: data.description,
        markdown: data.markdown,
        markdownHtml: data.markdownHtml,
        price: data.price,
        province: data.province,
        payment: data.payment,
        image: data.image,
        specialty: data.specialty,
        note: data.note,
      };

      let doc = await Doctor.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      });
      if (doc) {
        resolve({ errCode: 0, message: "Updated Doctor Profile successful" });
      } else {
        resolve({ errCode: 2, message: "Something was wrong!" });
      }
    } catch (e) {
      reject(e);
    }
  });
}
