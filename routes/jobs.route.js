import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  getAllJobsController,
} from "../controllers/jobs.controller.js";

//route object
const router = express.Router();

//routes
//CREATE JOB || POST
router.post("/create-job", userAuth, createJobController);

//GET JOB || GET
router.get("/get-job", userAuth, getAllJobsController);

export default router;
