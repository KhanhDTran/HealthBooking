import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  gender: String,
  address: String,
  phoneNumber: String,
  role: String,
  position: String,
  createdAt: Date,
  updateAt: Date,
});

export default mongoose.model("User", userSchema);
