import mongoose from "mongoose";
const { Schema } = mongoose;

const scheduleSchema = new Schema(
  {
    doctor: { type: Schema.Types.String, ref: "Doctor" },
    currentNumber: Number,
    maxNumber: Number,
    date: Date,
    time: { type: Schema.Types.String, ref: "Allcode" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Schedule", scheduleSchema);
