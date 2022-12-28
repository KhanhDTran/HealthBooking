import mongoose from "mongoose";
const { Schema } = mongoose;

const clinicSchema = new Schema(
  {
    name: String,
    address: String,
    markdown: String,
    province: { type: Schema.Types.ObjectId, ref: "Allcode" },
    markdownHtml: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Clinic", clinicSchema);
