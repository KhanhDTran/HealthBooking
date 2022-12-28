import { createSpecialtyService } from "../services/specialtyService.js";

export async function createSpecialty(req, res) {
  try {
    await delay(1000);
    let response = await createSpecialtyService(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("create-specialty-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};
