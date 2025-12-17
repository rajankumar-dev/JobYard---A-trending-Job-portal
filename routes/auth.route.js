import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js";

//route object
const router = express.Router();

//auth routes
//register || Post
router.post("/register", registerController);
//login || Post
router.post("/login", loginController);

export default router;
