import { getAllcodeService } from "../services/allcodeService.js";

export async function getAllcode(req, res) {
  try {
    let response = await getAllcodeService(req.query);
    return res.status(200).json(response);
  } catch (e) {
    console.log("get-allcode-error", e);
    return res.status(200).json({ errCode: -1, message: "Error from server" });
  }
}
