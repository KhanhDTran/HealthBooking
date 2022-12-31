import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    user: { type: Schema.Types.String, ref: "User" },
    position: { type: Schema.Types.String, ref: "Allcode" },
    description: String,
    markdown: String,
    markdownHtml: String,
    price: { type: Schema.Types.String, ref: "Allcode" },
    province: { type: Schema.Types.String, ref: "Allcode" },
    payment: { type: Schema.Types.String, ref: "Allcode" },
    image: String,
    note: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Doctor", doctorSchema);
