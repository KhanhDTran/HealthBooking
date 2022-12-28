import mongoose from "mongoose";
const { Schema } = mongoose;

const specialtySchema = new Schema(
  {
    name: String,
    markdown: String,
    markdownHtml: String,
    image: Buffer,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Specialty", specialtySchema);
