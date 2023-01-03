import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    user: { type: Schema.Types.String, ref: "User" },
    province: { type: Schema.Types.String, ref: "Allcode" },
    age: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patient", patientSchema);
