//package imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
//file imports
import connectDB from "./config/db.js";
// security packages
import helmet from "helmet";
import xssClean from "./middlewares/xssMiddleware.js";
//route imports
import testRouter from "./routes/test.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import jobRouter from "./routes/jobs.route.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(helmet());
app.use(xssClean);
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/test", testRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);

// Global error handling middleware
import errorMiddleware from "./middlewares/errorMiddleware.js";
app.use(errorMiddleware);
