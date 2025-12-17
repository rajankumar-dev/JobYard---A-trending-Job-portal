import { Job } from "../models/jobsModel.js";

// =========create job controller=========
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  // Validate
  if (!company || !position) {
    next("Please provide all required fields");
  }
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(201).send({
    success: true,
    message: "Job created successfully",
    job,
  });
};

// =========get job controller===========
export const getAllJobsController = async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user.id });
  res.status(200).send({
    totalJobs: jobs.length,
    success: true,
    jobs,
  });
};
