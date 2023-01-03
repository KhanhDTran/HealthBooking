import Schedule from "../db/schemas/Schedule.js";

export function getDoctorScheduleService(data) {
  if (!data.doctor || !data.date)
    return { errCode: 1, message: "Missing paramter" };
  return new Promise(async (resolve, reject) => {
    try {
      let schedules = await Schedule.find({
        doctor: data.doctor,
        date: data.date,
      }).populate("time");
      if (schedules) {
        resolve({ errCode: 0, schedules });
      } else {
        resolve({ errCode: 2, message: "No Schedule found" });
      }
    } catch (e) {
      reject(e);
    }
  });
}

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
      resolve({ errCode: 0, message: "Saved doctor's schedule success" });
    } catch (e) {
      reject(e);
    }
  });
}
