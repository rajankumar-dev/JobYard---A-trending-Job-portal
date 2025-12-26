import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  getUserController,
  updateUserController,
} from "../controllers/user.controller.js";

//route object
const router = express.Router();

//routes
//GET USER DATA || POST
router.post("/getUser", userAuth, getUserController);
//UPDATE USERS || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;
