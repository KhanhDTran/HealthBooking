import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    status: { type: Schema.Types.String, ref: "Allcode" },
    doctor: { type: Schema.Types.String, ref: "Doctor" },
    patient: { type: Schema.Types.String, ref: "Patient" },
    date: Date,
    time: { type: Schema.Types.String, ref: "Allcode" },
    reason: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);
