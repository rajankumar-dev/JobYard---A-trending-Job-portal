import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "Saharanpur",
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
