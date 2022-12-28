import Allcode from "../db/schemas/Allcode.js";

export function getAllcodeService(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let allcodes = await Allcode.find({ type: data.types });
      if (allcodes) {
        resolve({ errCode: 0, allcodes });
      }
    } catch (e) {
      reject(e);
    }
  });
}
