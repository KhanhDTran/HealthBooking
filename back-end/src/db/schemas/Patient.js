import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    user: { type: Schema.Types.String, ref: "User" },
    province: { type: Schema.Types.String, ref: "Allcode" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", patientSchema);
