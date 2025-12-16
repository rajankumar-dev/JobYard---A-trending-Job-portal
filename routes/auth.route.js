import express from "express";
import { registerController } from "../controllers/auth.controller.js";

//route object
const router = express.Router();

//auth routes
router.post("/register", registerController);
// router.post("/login");

export default router;
