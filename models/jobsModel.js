import mongoose from "mongoose";
const jobsSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    company: {
      type: String,
      required: [true, "Please provide company"],
      maxlength: 100,
    },
    workLocation: {
      type: String,
      default: "Saharanpur",
      maxlength: 100,
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobsSchema);
