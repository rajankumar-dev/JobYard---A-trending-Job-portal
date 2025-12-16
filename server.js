import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";

import testRouter from "./routes/test.route.js";
import authRouter from "./routes/auth.route.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
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

// Global error handling middleware
import errorMiddleware from "./middlewares/errorMiddleware.js";
app.use(errorMiddleware);
