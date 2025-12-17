import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/user.controller.js";

//route object
const router = express.Router();

//routes
//GET USERS || GET

//UPDATE USERS || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;
