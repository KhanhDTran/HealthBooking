import Schedule from "../db/schemas/Schedule.js";

export function upsertScheduleService(data) {
  console.log(data);
  if (!data.doctor) return { errCode: 1, message: "Missing paramter" };
  return new Promise(async (resolve, reject) => {
    try {
      if (data.list && data.list.length > 0) {
        await Schedule.deleteMany({
          doctor: data.list[0].doctor,
          date: data.list[0].date,
        });
        await Schedule.insertMany(data.list);
      } else {
        await Schedule.deleteMany({ doctor: data.doctor, date: data.date });
      }
      resolve({ errCode: 0, message: "Save doctor's schedule success" });
    } catch (e) {
      reject(e);
    }
  });
}
