import express from "express";
import { testController } from "../controllers/test.controller.js";
import userAuth from "../middlewares/authMiddleware.js";

//route object
const router = express.Router();

//test route
router.post("/test", testController);

export default router;
