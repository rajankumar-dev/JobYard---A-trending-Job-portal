import { Job } from "../models/jobsModel.js";

// ========= create job controller =========
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

// ========= get job controller ===========
export const getAllJobsController = async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user.id });
  res.status(200).send({
    totalJobs: jobs.length,
    success: true,
    jobs,
  });
};

// ======= update job controller=========
export const updateJobController = async (req, res, next) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  // Validation
  if (!company || !position) {
    next("Please provide all required fields");
  }

  //find job
  const job = await Job.findOne({ _id: jobId, createdBy: req.user.id });
  if (!job) {
    next(`No job found with id ${jobId}`);
  }
  //update job
  if (!req.user.id === job.createdBy.toString()) {
    next("You are not authorized to update this job");
    return;
  }
  const updatedJob = await Job.findByIdAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).send({
    success: true,
    message: "Job updated successfully",
    updatedJob,
  });
};

// ======= Delete job controller =========
export const deleteJobController = async (req, res, next) => {
  const { id: jobId } = req.params;

  //find job
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    next(`No job found with id ${jobId}`);
  }
  //delete job
  if (!req.user.id === job.createdBy.toString()) {
    next("You are not authorized to delete this job");
    return;
  }
  await Job.deleteOne();
  res.status(200).json({ message: "Job deleted successfully" });
};
