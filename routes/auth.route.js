import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js";
import { rateLimit } from "express-rate-limit";

//IP rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

//route object
const router = express.Router();

//auth routes
//register || Post
router.post("/register", limiter, registerController);
//login || Post
router.post("/login", limiter, loginController);

export default router;
