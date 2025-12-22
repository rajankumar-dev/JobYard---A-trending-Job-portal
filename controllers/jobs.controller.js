import { Job } from "../models/jobsModel.js";
import mongoose from "mongoose";

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
  const { status, workType, search, sort } = req.query;

  //condition for status
  let queryObject = { createdBy: req.user.id };
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  if (!search) {
    queryObject.position = { $regex: "", $options: "i" };
  }
  let queryResult = Job.find(queryObject);

  //sort
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }
  if (!sort) {
    queryResult = queryResult.sort("-createdAt");
  }

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  queryResult = queryResult.skip(skip).limit(limit);
  //job Count
  const totalJobs = await Job.countDocuments(queryResult);
  const numOfPages = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  //   const jobs = await Job.find({ createdBy: req.user.id });
  res.status(200).send({
    totalJobs,
    success: true,
    jobs,
    numOfPages,
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

// ======= jobs stats controller =========
export const jobStatsController = async (req, res) => {
  const stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  const defaultStats = {
    pending: stats.find((item) => item._id === "pending")?.count || 0,
    interview: stats.find((item) => item._id === "interview")?.count || 0,
    declined: stats.find((item) => item._id === "declined")?.count || 0,
  };

  //monthly stats
  let monthlyApplication = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.Id),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  monthlyApplication = monthlyApplication.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    const date = new Date(year, month - 1);
    const monthYear = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
    return { month: monthYear, count };
  });

  res
    .status(200)
    .send({ totalJob: stats.length, defaultStats, monthlyApplication });
};
