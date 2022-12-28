import mongoose from "mongoose";
const { Schema } = mongoose;

const allcodeSchema = new Schema(
  {
    type: String,
    keyMap: String,
    value: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Allcode", allcodeSchema);
